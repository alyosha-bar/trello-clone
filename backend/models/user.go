package models

type User struct {
	ID      uint   `gorm:"primaryKey"`
	ClerkID string `gorm:"uniqueIndex"`
	Email   string
}
