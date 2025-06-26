package services

import (
	"github.com/alyosha-bar/trello-clone/models"
	"github.com/alyosha-bar/trello-clone/repository"
)

func GetAllWorkspaces(userID uint) ([]models.Workspace, error) {
	return repository.GetAllWorkspaces(userID)
}

func CreateWorkspace(workspace *models.Workspace) error {
	return repository.CreateWorkspace(workspace)
}

func GetWorkspaceByID(id uint) (models.Workspace, error) {
	return repository.GetWorkspaceByID(id)
}

func DeleteWorkspace(id uint) error {
	return repository.DeleteWorkspace(id)
}
