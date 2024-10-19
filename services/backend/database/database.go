package database

import (
	"database/sql"

	_ "github.com/lib/pq"
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
	connStr := "user=postgres dbname=postgres password=postgres sslmode=disable"
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return &PostgresDB{
		db: db,
	}, nil
}
