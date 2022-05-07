package store

type User struct {
	Username string `binding:"required,min=5,max=30"`
	Password string `binding:"required,min=5,max=30"`
	// Gender   bool   `binding:"required"`
	// Name     string `binding:"required,min=3,max=30"`
	// Surname  string `binding:"required,min=3,max=30"`
}

var Users []*User
