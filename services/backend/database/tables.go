package database

func (p *PostgresDB) createUsersTable() error {
	query := `
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			username TEXT NOT NULL,
			email TEXT NOT NULL,
			password TEXT NOT NULL,
			role TEXT NOT NULL
		);
	`
	_, err := p.db.Exec(query)

	return err
}

func (p *PostgresDB) createPostsTable() error {
	query := `
		CREATE TABLE IF NOT EXISTS posts (
			id SERIAL PRIMARY KEY,
			title TEXT NOT NULL,
			introduction TEXT NOT NULL,
			content TEXT NOT NULL,
			author_id INT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
			FOREIGN KEY (author_id) REFERENCES users (id)
		);
	`
	_, err := p.db.Exec(query)

	return err
}

func (p *PostgresDB) createPostCategoryTable() error {
	query := `
		CREATE TABLE IF NOT EXISTS post_category (
			post_id INT NOT NULL,
			category_id INT NOT NULL,
			FOREIGN KEY (post_id) REFERENCES posts (id),
			FOREIGN KEY (category_id) REFERENCES categories (id)
		);
	`
	_, err := p.db.Exec(query)

	return err
}

func (p *PostgresDB) createCategoriesTable() error {
	query := `
		CREATE TABLE IF NOT EXISTS categories (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL
		);
	`
	_, err := p.db.Exec(query)

	return err
}

func (p *PostgresDB) createCommentsTable() error {
	query := `
		CREATE TABLE IF NOT EXISTS comments (
			id SERIAL PRIMARY KEY,
			content TEXT NOT NULL,
			author_id INT NOT NULL,
			post_id INT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
			FOREIGN KEY (author_id) REFERENCES users (id),
			FOREIGN KEY (post_id) REFERENCES posts (id)
		);
	`
	_, err := p.db.Exec(query)

	return err
}
