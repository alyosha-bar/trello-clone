package handlers

import (
	"net/http"
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
