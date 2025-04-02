package repository

import (
	"github.com/alyosha-bar/trello-clone/database"
	"github.com/alyosha-bar/trello-clone/models"
)

func GetAllTicketsInWorkspace(workspace_id uint) ([]models.Ticket, error) {
	var tickets []models.Ticket
	result := database.DB.Where("WorkspaceID = ?", workspace_id).Find(&tickets)
	return tickets, result.Error
}
