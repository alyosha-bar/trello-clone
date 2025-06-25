package repository

import (
	"github.com/alyosha-bar/trello-clone/database"
	"github.com/alyosha-bar/trello-clone/models"
)

func GetAllTicketsInWorkspace(workspace_id uint) ([]models.Ticket, error) {
	var tickets []models.Ticket
	result := database.DB.Where("workspace_id = ?", workspace_id).Find(&tickets)
	return tickets, result.Error
}

func UpdateTicketStage(ticketID uint, stage string) (models.Ticket, error) {
	var ticket models.Ticket
	result := database.DB.Model(&models.Ticket{}).Where("id = ?", ticketID).Update("status", stage)
	return ticket, result.Error
}

func GetTicketDetails(ticketID uint) (models.Ticket, error) {
	var ticket models.Ticket
	result := database.DB.Where("id = ?", ticketID).Find(&ticket)
	return ticket, result.Error
}

func CreateTicket(workspaceID uint, ticket models.Ticket) (models.Ticket, error) {
	ticket.WorkspaceID = workspaceID
	result := database.DB.Create(&ticket)
	return ticket, result.Error
}
