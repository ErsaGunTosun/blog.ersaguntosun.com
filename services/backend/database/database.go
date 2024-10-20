package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"main.go/config"
)

type PostgresDB struct {
	db *sql.DB
}

func (p *PostgresDB) Init() error {

	if err := p.createUsersTable(); err != nil {
		return err
	}
	if err := p.createPostsTable(); err != nil {
		return err
	}
	if err := p.createCategoriesTable(); err != nil {
		return err
	}

	if err := p.createPostCategoryTable(); err != nil {
		return err
	}

	if err := p.createCommentsTable(); err != nil {
		return err
	}

	return nil
}

func NewPostgresDB() (*PostgresDB, error) {
	connStr := fmt.Sprintf("user=postgres dbname=postgres password=%s sslmode=disable", config.Configs.DBPass)
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	log.Println("successfully connected to database")

	return &PostgresDB{
		db: db,
	}, nil
}
