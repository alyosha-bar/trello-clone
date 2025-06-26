package models

// structs representing different DB entities
import "gorm.io/gorm"

type Workspace struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	UserID      uint   `json:"user_id"`
}
