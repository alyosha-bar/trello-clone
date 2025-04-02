package handlers

import (
	"net/http"

	"github.com/alyosha-bar/trello-clone/models"
	"github.com/alyosha-bar/trello-clone/services"
	"github.com/gin-gonic/gin"
)

// functions to call the business logic from services

func GetWorkspacesHandler(c *gin.Context) {

	workspaces, err := services.GetAllWorkspaces()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch workspaces"})
		return
	}

	c.JSON(http.StatusOK, workspaces)

}

func CreateWorkspaceHandler(c *gin.Context) {
	var workspace models.Workspace
	if err := c.ShouldBindJSON(&workspace); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	err := services.CreateWorkspace(&workspace)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Workspace"})
		return
	}

	c.JSON(http.StatusOK, workspace)

}
