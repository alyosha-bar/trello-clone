package handlers

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"github.com/alyosha-bar/trello-clone/services"
	"github.com/gin-gonic/gin"
)

type WorkspaceRequest struct {
	WorkspaceID uint `json:"workspace_id"`
}

func GetAllTicketsInWorkspaceHandler(c *gin.Context) {

	// get id from param
	workspaceIDStr := c.Param("workspace_id")

	// convert workspaceID to int
	workspaceID, err := strconv.ParseUint(workspaceIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid workspace id."})
	}

	tickets, err := services.GetAllTicketsInWorkspace(uint(workspaceID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tickets"})
		return
	}

	c.JSON(http.StatusOK, tickets)
}

func UpdateTicketStage(c *gin.Context) {
	ticketIDStr := c.Param("ticket_id")
	stage := c.Param("stage")

	fmt.Println(stage)

	decodedStage, _ := url.QueryUnescape(stage)

	fmt.Println(decodedStage)

	ticketID, err := strconv.ParseUint(ticketIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ticket id."})
	}

	ticket, err := services.UpdateTicketStage(uint(ticketID), decodedStage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update ticket."})
		return
	}

	c.JSON(http.StatusOK, ticket)
}
