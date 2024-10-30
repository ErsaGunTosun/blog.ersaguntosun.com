package database

import (
	"database/sql"

	"main.go/types"
)

func (p *PostgresDB) CreatePostDB(i *types.Post) error {
	query := "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3)"
	_, err := p.db.Exec(query, i.Title, i.Content, i.AuthorID)
	if err != nil {
		return err
	}
	return nil
}

func (p *PostgresDB) GetPostsDB() ([]*types.Post, error) {
	rows, err := p.db.Query("SELECT * FROM posts")
	if err != nil {
		return nil, err
	}

	products := make([]*types.Post, 0)
	for rows.Next() {
		p, err := scanRowsIntoProduct(rows)
		if err != nil {
			return nil, err
		}

		products = append(products, p)
	}

	return products, nil
}

func scanRowsIntoProduct(rows *sql.Rows) (*types.Post, error) {
	post := new(types.Post)

	err := rows.Scan(
		&post.ID,
		&post.Title,
		&post.Content,
		&post.AuthorID,
		&post.CreatedAt,
		&post.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return post, nil
}
