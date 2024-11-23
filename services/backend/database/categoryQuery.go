package database

import (
	"database/sql"
	"fmt"
	"strings"

	"main.go/types"
)

func (p *PostgresDB) CreateCategoryDB(c *types.Category) (int, error) {
	var newID int
	query := "INSERT INTO categories (name) VALUES ($1) RETURNING id;"
	err := p.db.QueryRow(query, strings.ToLower(c.Name)).Scan(&newID)
	if err != nil {
		return 0, err
	}
	return newID, nil
}

func (p *PostgresDB) GetCategoriesDB() ([]*types.Category, error) {
	rows, err := p.db.Query("SELECT * FROM categories")
	if err != nil {
		return nil, err
	}

	categories := make([]*types.Category, 0)
	for rows.Next() {
		c := new(types.Category)
		err := rows.Scan(
			&c.ID,
			&c.Name,
		)
		if err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}

	return categories, nil
}

func (p *PostgresDB) GetCategoryByNameDB(name string) (*types.Category, error) {
	rows, err := p.db.Query("SELECT * FROM categories WHERE name = $1", strings.ToLower(name))

	if err != nil {
		return nil, err
	}

	c := new(types.Category)

	for rows.Next() {
		c, err = scanRowsIntoCategory(rows)
		fmt.Println("Category: ", c)
		if err != nil {
			return nil, err
		}
	}

	return c, nil
}

func scanRowsIntoCategory(rows *sql.Rows) (*types.Category, error) {
	category := new(types.Category)

	err := rows.Scan(
		&category.ID,
		&category.Name,
	)

	if err != nil {
		return nil, err
	}

	return category, nil
}

func (p *PostgresDB) GetCategoryByIDDB(id int) (*types.Category, error) {
	rows, err := p.db.Query("SELECT * FROM categories WHERE id = $1", id)
	if err != nil {
		return nil, err
	}

	c := new(types.Category)
	for rows.Next() {
		err := rows.Scan(
			&c.ID,
			&c.Name,
		)
		if err != nil {
			return nil, err
		}
	}

	return c, nil
}

func (p *PostgresDB) UpdateCategoryByIDDB(c *types.Category) error {
	query := "UPDATE categories SET name = $1 WHERE id = $2"
	_, err := p.db.Exec(query, c.Name, c.ID)
	if err != nil {
		return err
	}
	return nil
}

func (p *PostgresDB) DeleteCategoryByIDDB(id int) error {
	query := "DELETE FROM categories WHERE id = $1"
	_, err := p.db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}

func (p *PostgresDB) GetCategoriesByPostIDDB(postID int) ([]*types.Category, error) {
	query := `
		SELECT c.id, c.name
		FROM categories c
		JOIN post_category pc ON c.id = pc.category_id
		WHERE pc.post_id = $1
	`
	rows, err := p.db.Query(query, postID)
	if err != nil {
		return nil, err
	}

	categories := make([]*types.Category, 0)
	for rows.Next() {
		c := new(types.Category)
		err := rows.Scan(
			&c.ID,
			&c.Name,
		)
		if err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}

	return categories, nil
}

func (p *PostgresDB) GetPostsByCategoryIDDB(categoryID int) ([]*types.Post, error) {
	query := `
		SELECT p.id, p.title, p.content, p.author_id, p.created_at, p.updated_at
		FROM posts p
		JOIN post_category pc ON p.id = pc.post_id
		WHERE pc.category_id = $1
	`
	rows, err := p.db.Query(query, categoryID)
	if err != nil {
		return nil, err
	}

	posts := make([]*types.Post, 0)
	for rows.Next() {
		p := new(types.Post)
		err := rows.Scan(
			&p.ID,
			&p.Title,
			&p.Content,
			&p.AuthorID,
			&p.CreatedAt,
			&p.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}

func (p *PostgresDB) AddCategoryToPostDB(postID, categoryID int) error {
	query := "INSERT INTO post_category (post_id, category_id) VALUES ($1, $2)"
	_, err := p.db.Exec(query, postID, categoryID)
	if err != nil {
		return err
	}
	return nil
}

func (p *PostgresDB) RemoveCategoryFromPostDB(postID, categoryID int) error {
	query := "DELETE FROM post_category WHERE post_id = $1 AND category_id = $2"
	_, err := p.db.Exec(query, postID, categoryID)
	if err != nil {
		return err
	}
	return nil
}
