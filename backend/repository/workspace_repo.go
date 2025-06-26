package repository

import (
	"github.com/alyosha-bar/trello-clone/database"
	"github.com/alyosha-bar/trello-clone/models"
)

func GetAllWorkspaces(userID uint) ([]models.Workspace, error) {
	var workspaces []models.Workspace
	result := database.DB.Find(&workspaces).Where("user_id = ?", userID)
	return workspaces, result.Error
}

func GetWorkspaceByID(id uint) (models.Workspace, error) {
	var workspace models.Workspace
	result := database.DB.First(&workspace, id)
	return workspace, result.Error
}

func CreateWorkspace(workspace *models.Workspace) error {
	result := database.DB.Create(workspace)
	return result.Error
}

func UpdateWorkspace(workspace *models.Workspace) error {
	result := database.DB.Save(workspace)
	return result.Error
}

func DeleteWorkspace(id uint) error {
	result := database.DB.Delete(&models.Workspace{}, id)
	return result.Error
}
