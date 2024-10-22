package user

import (
	"main.go/database"
	"main.go/types"
)

type Store struct {
	db *database.PostgresDB
}

func NewStore(db *database.PostgresDB) *Store {
	return &Store{db: db}
}

func (s *Store) CreateUser(user *types.User) error {
	return s.db.CreateUserDB(user)
}

func (s *Store) GetUserByID(id int) (*types.User, error) {
	user := &types.User{}

	return user, nil
}

func (s *Store) GetUserByEmail(email string) (*types.User, error) {
	return s.db.GetUserByEmailDB(email)
}
