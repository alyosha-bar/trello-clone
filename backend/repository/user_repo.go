package repository

import (
	"errors"

	"github.com/alyosha-bar/trello-clone/database"
	"github.com/alyosha-bar/trello-clone/models"
	"gorm.io/gorm"
)

func GetUserByClerkID(clerkID string) (models.User, error) {
	var user models.User
	err := database.DB.Where("clerk_id = ?", clerkID).First(&user).Error
	return user, err
}

func CreateUser(user *models.User) error {
	return database.DB.Create(user).Error
}

func SyncUserCreated(user *models.User) error {
	// Check if user with ClerkID already exists
	var existingUser models.User
	err := database.DB.Where("clerk_id = ?", user.ClerkID).First(&existingUser).Error
	if err == nil {
		// user already exists, no need to create
		return nil
	} else if errors.Is(err, gorm.ErrRecordNotFound) {
		// user not found, create new
		return database.DB.Create(user).Error
	} else {
		return err
	}
}
