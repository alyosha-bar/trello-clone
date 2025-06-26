package services

import (
	"errors"

	"github.com/alyosha-bar/trello-clone/models"
	"github.com/alyosha-bar/trello-clone/repository"
	"gorm.io/gorm"
)

func GetOrCreateUser(clerkID string, email string) (models.User, error) {
	user, err := repository.GetUserByClerkID(clerkID)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		newUser := models.User{
			ClerkID: clerkID,
			Email:   email,
		}

		if err := repository.CreateUser(&newUser); err != nil {
			return models.User{}, err
		}

		return newUser, nil
	}
	return user, err
}

func SyncUserCreated(user *models.User) error {
	return repository.SyncUserCreated(user)
}
