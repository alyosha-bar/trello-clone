package services

import (
	"github.com/alyosha-bar/trello-clone/models"
	"github.com/alyosha-bar/trello-clone/repository"
)

func GetAllWorkspaces() ([]models.Workspace, error) {
	return repository.GetAllWorkspaces()
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

// business logic functions

// in place of repository layer in GPT
