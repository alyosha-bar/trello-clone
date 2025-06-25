package handlers

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"github.com/alyosha-bar/trello-clone/models"
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

func GetTicketDetails(c *gin.Context) {
	ticketIDStr := c.Param("ticket_id")

	ticketID, err := strconv.ParseUint(ticketIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ticket id."})
	}

	ticket, err := services.GetTicketDetails(uint(ticketID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update ticket."})
		return
	}

	c.JSON(http.StatusOK, ticket)
}

func CreateTicket(c *gin.Context) {
	workspaceIDStr := c.Param("workspace_id")
	var ticket models.Ticket

	workspaceID, err := strconv.ParseUint(workspaceIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ticket id."})
		return
	}

	err = c.ShouldBindJSON(&ticket)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ticket in request."})
		return
	}

	ticket_return, err := services.CreateTicket(uint(workspaceID), ticket)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create ticket."})
		return
	}

	c.JSON(http.StatusOK, ticket_return)
}
