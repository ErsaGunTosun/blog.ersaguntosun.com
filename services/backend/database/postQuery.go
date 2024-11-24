package database

import (
	"database/sql"
	"fmt"

	"main.go/types"
)

func (p *PostgresDB) CreatePostDB(i *types.Post) (int, error) {
	var newID int

	query := `
			INSERT INTO posts (title,introduction,content, author_id) 
			VALUES ($1,$2, $3,$4) 
			RETURNING id;
			`
	err := p.db.QueryRow(query, i.Title, i.Introduction, i.Content, i.AuthorID).Scan(&newID)
	if err != nil {
		return 0, err
	}

	return newID, nil

}

func (p *PostgresDB) GetPostsDB() ([]*types.Post, error) {
	rows, err := p.db.Query("SELECT * FROM posts")
	if err != nil {
		return nil, err
	}

	products := make([]*types.Post, 0)
	for rows.Next() {
		p, err := scanRowsIntoPost(rows)
		if err != nil {
			return nil, err
		}

		products = append(products, p)
	}

	return products, nil
}

func (p *PostgresDB) GetPostByIDDB(id int) (*types.Post, error) {
	query := "SELECT * FROM posts WHERE id = $1"
	rows, err := p.db.Query(query, id)
	if err != nil {
		return nil, err
	}

	post := new(types.Post)
	for rows.Next() {
		post, err = scanRowsIntoPost(rows)
		if err != nil {
			return nil, err
		}
	}

	if post.ID == 0 {
		return nil, fmt.Errorf("post not found")
	}

	return post, nil

}

func (p *PostgresDB) UpdatePostByIDDB(i *types.Post) (int, error) {
	var newID int
	query := `
		UPDATE posts SET title = $1, content = $2, introduction=$3 WHERE id = $4 
		RETURNING id;`
	err := p.db.QueryRow(query, i.Title, i.Content, i.Introduction, i.ID).Scan(&newID)

	if err != nil {
		return 0, err
	}

	return newID, nil
}

func (p *PostgresDB) DeletePostByIDDB(id int) error {
	query := "DELETE FROM posts WHERE id = $1"
	_, err := p.db.Query(query, id)
	if err != nil {
		return err
	}
	return nil
}

func scanRowsIntoPost(rows *sql.Rows) (*types.Post, error) {
	post := new(types.Post)

	err := rows.Scan(
		&post.ID,
		&post.Title,
		&post.Introduction,
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
