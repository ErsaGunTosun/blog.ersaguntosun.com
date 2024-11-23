package types

import "time"

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}

type Post struct {
	ID           int       `json:"id"`
	Title        string    `json:"title"`
	Introduction string    `json:"introduction"`
	Content      string    `json:"content"`
	AuthorID     int       `json:"author_id"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type Comment struct {
	ID        int    `json:"id"`
	Content   string `json:"content"`
	PostID    int    `json:"post_id"`
	UserID    int    `json:"user_id"`
	CreatedAt string `json:"created_at"`
}

type PostCategory struct {
	PostID     int `json:"post_id"`
	CategoryID int `json:"category_id"`
}

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type UserStore interface {
	CreateUser(user *User) error
	GetUserByID(id int) (*User, error)
	GetUserByEmail(email string) (*User, error)
}
type PostStore interface {
	GetPosts() ([]*Post, error)
	GetPostByID(id int) (*Post, error)
	CreatePost(post *Post) (int, error)
	UpdatePost(post *Post) error
	DeletePost(id int) error

	// user
	GetUserByID(userID int) (*User, error)

	// category
	CreateCategory(category *Category) (int, error)
	GetCategoryByName(name string) (*Category, error)
	AddCategoryToPost(postID, categoryID int) error
}

type CategoryStore interface {
	GetCategories() ([]*Category, error)
	GetCategoryByName(name string) (*Category, error)
	GetCategoryByID(id int) (*Category, error)
	CreateCategory(category *Category) (int, error)
	UpdateCategory(category *Category) error
	DeleteCategory(id int) error

	GetCategoriesByPostID(postID int) ([]*Category, error)
	GetPostsByCategoryID(categoryID int) ([]*Post, error)
	AddCategoryToPost(postID, categoryID int) error
	RemoveCategoryFromPost(postID, categoryID int) error

	GetUserByID(userID int) (*User, error)
}

// Payload
type RegisterUserPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type LoginUserPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CreatePostPayload struct {
	Title        string   `json:"title"`
	Introduction string   `json:"introduction"`
	Categories   []string `json:"categories"`
	Content      string   `json:"content"`
}

type UpdatePostPayload struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

type CreateCategoryPayload struct {
	Name string `json:"name"`
}

type UpdateCategoryPayload struct {
	Name string `json:"name"`
}
