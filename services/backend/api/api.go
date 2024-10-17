package api

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"main.go/database"
	"main.go/handlers"
)

type APIServer struct {
	addr string
	db   *database.PostgresDB
}

func NewAPIServer(addr string, db *database.PostgresDB) *APIServer {
	return &APIServer{
		addr: addr,
		db:   db,
	}
}

func (a *APIServer) Run() error {
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api").Subrouter()

	handler := handlers.NewHandler()
	handler.RegisterRoutes(subrouter)

	log.Println("Server is running on", a.addr)

	return http.ListenAndServe(a.addr, router)
}
