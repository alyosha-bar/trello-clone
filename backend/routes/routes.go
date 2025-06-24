package routes

import (
	"github.com/alyosha-bar/trello-clone/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	workspaceRoutes := router.Group("/workspace")
	{
		workspaceRoutes.GET("/", handlers.GetWorkspacesHandler)
		workspaceRoutes.POST("/create", handlers.CreateWorkspaceHandler)
		// Update workspace details
		// Delete a workspace
	}

	ticketsRoutes := router.Group("/ticket")
	{
		ticketsRoutes.GET("/:workspace_id", handlers.GetAllTicketsInWorkspaceHandler)
		// GET 1 ticket --> more details
		// ticketsRoutes.GET("/:ticket_id", handlers.)

		// Create a ticket

		// Update a ticket
		ticketsRoutes.PATCH("/:ticket_id/:stage", handlers.UpdateTicketStage)

		// Delete a ticket
	}

}
