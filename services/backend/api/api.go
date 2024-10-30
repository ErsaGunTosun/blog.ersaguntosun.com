package api

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"main.go/database"
	"main.go/handlers/comment"
	"main.go/handlers/post"
	"main.go/handlers/user"
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

	userStore := user.NewStore(a.db)
	userHandler := user.NewHandler(userStore)
	userHandler.RegisterRoutes(subrouter)

	postStore := post.NewStore(a.db)
	postHandler := post.NewHandler(postStore)
	postHandler.RegisterRoutes(subrouter)

	commentHandler := comment.NewHandler()
	commentHandler.RegisterRoutes(subrouter)

	log.Println("Server is running on", a.addr)

	c := cors.New(cors.Options{
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})
	handler := c.Handler(router)
	return http.ListenAndServe(a.addr, handler)
}
