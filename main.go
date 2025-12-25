package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

//go:embed static/*
var staticFiles embed.FS

type Email struct {
	ID       string `json:"id"`
	Subject  string `json:"subject"`
	Sender   string `json:"sender"`
	Snippet  string `json:"snippet"`
	Date     string `json:"date"`
	Category string `json:"category"`
	Priority int    `json:"priority"`
	Summary  string `json:"summary"`
}

type APIResponse struct {
	Emails []Email `json:"emails"`
	Count  int     `json:"count"`
	Error  string  `json:"error,omitempty"`
}

var pythonCmd *exec.Cmd

func main() {
	// Python API server'ı başlat
	go startPythonServer()
	time.Sleep(2 * time.Second)

	// HTTP routes
	http.HandleFunc("/", serveIndex)
	http.HandleFunc("/api/emails", proxyEmails)
	http.HandleFunc("/api/emails/refresh", proxyRefresh)
	http.HandleFunc("/api/emails/refresh-stream", proxyRefreshStream)
	http.HandleFunc("/api/emails/cached", proxyCached)
	http.HandleFunc("/api/settings", proxySettings)
	http.HandleFunc("/api/providers", proxyProviders)
	http.HandleFunc("/api/account", proxyAccount)
	http.HandleFunc("/api/account/logout", proxyAccountAction)
	http.HandleFunc("/api/account/clear-data", proxyAccountAction)
	http.HandleFunc("/api/account/setup-oauth", proxyAccountAction)
	http.Handle("/static/", http.FileServer(http.FS(staticFiles)))

	port := "8080"
	url := fmt.Sprintf("http://localhost:%s", port)
	
	fmt.Println("🚀 Gmail Sınıflandırıcı başlatıldı!")
	fmt.Printf("📬 Tarayıcıda aç: %s\n", url)

	// Tarayıcıyı otomatik aç
	go openBrowser(url)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func startPythonServer() {
	dir, _ := os.Getwd()
	pythonScript := filepath.Join(dir, "api_server.py")
	pythonCmd = exec.Command("python", pythonScript)
	pythonCmd.Dir = dir
	pythonCmd.Stdout = os.Stdout
	pythonCmd.Stderr = os.Stderr
	err := pythonCmd.Start()
	if err != nil {
		fmt.Println("❌ Python başlatılamadı:", err)
	} else {
		fmt.Println("✓ Python server başlatıldı")
	}
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
	data, _ := staticFiles.ReadFile("static/index.html")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write(data)
}

func proxyEmails(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:8765/emails")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func proxyRefresh(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:8765/emails/refresh")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	defer resp.Body.Close()
	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func proxyRefreshStream(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:8765/emails/refresh-stream")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	buf := make([]byte, 1024)
	for {
		n, err := resp.Body.Read(buf)
		if n > 0 {
			w.Write(buf[:n])
			flusher.Flush()
		}
		if err != nil {
			break
		}
	}
}

func proxyCached(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:8765/emails/cached")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	defer resp.Body.Close()
	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func proxySettings(w http.ResponseWriter, r *http.Request) {
	var resp *http.Response
	var err error

	if r.Method == "POST" {
		body, _ := io.ReadAll(r.Body)
		resp, err = http.Post("http://localhost:8765/settings", "application/json", strings.NewReader(string(body)))
	} else {
		resp, err = http.Get("http://localhost:8765/settings")
	}

	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	defer resp.Body.Close()
	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func proxyProviders(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:8765/providers")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	defer resp.Body.Close()
	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func proxyAccount(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:8765/account")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	defer resp.Body.Close()
	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func proxyAccountAction(w http.ResponseWriter, r *http.Request) {
	// /api/account/xxx -> /account/xxx
	path := strings.TrimPrefix(r.URL.Path, "/api")
	url := "http://localhost:8765" + path

	var resp *http.Response
	var err error

	if r.Method == "POST" {
		body, _ := io.ReadAll(r.Body)
		resp, err = http.Post(url, "application/json", strings.NewReader(string(body)))
	} else {
		resp, err = http.Get(url)
	}

	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	defer resp.Body.Close()
	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	cmd.Start()
}
