package services

import (
	"github.com/alyosha-bar/trello-clone/models"
	"github.com/alyosha-bar/trello-clone/repository"
)

func GetAllTicketsInWorkspace(workspace_id uint) ([]models.Ticket, error) {
	return repository.GetAllTicketsInWorkspace(workspace_id)
}
