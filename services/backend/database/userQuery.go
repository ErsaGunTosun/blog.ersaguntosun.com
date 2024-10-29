package database

import (
	"database/sql"
	"fmt"

	"main.go/types"
)

func (p *PostgresDB) CreateUserDB(u *types.User) error {
	query := "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)"
	_, err := p.db.Exec(query, u.Username, u.Email, u.Password, u.Role)
	if err != nil {
		return err
	}
	return nil
}

func (p *PostgresDB) GetUserByEmailDB(e string) (*types.User, error) {
	rows, err := p.db.Query("SELECT * FROM users WHERE email = $1", e)
	if err != nil {
		return nil, err
	}

	u := new(types.User)
	for rows.Next() {
		u, err = scanRowsIntoUser(rows)
		if err != nil {
			return nil, err
		}
	}

	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return u, nil
}

func scanRowsIntoUser(rows *sql.Rows) (*types.User, error) {
	user := new(types.User)

	err := rows.Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password,
		&user.Role,
	)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (p *PostgresDB) GetUserByIDDB(id int) (*types.User, error) {
	rows, err := p.db.Query("SELECT * FROM users WHERE id = $1", id)
	if err != nil {
		return nil, err
	}

	u := new(types.User)
	for rows.Next() {
		u, err = scanRowsIntoUser(rows)
		if err != nil {
			return nil, err
		}
	}

	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return u, nil
}
