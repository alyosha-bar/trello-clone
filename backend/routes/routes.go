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
		// GET all tickets in workspace
		ticketsRoutes.GET("/:workspace_id", handlers.GetAllTicketsInWorkspaceHandler)

		// GET 1 ticket --> more details --> not that useful yet
		ticketsRoutes.GET("/details/:ticket_id", handlers.GetTicketDetails)

		// Create a ticket
		ticketsRoutes.POST("/new/:workspace_id", handlers.CreateTicket)

		// Update a ticket
		ticketsRoutes.PATCH("/:ticket_id/:stage", handlers.UpdateTicketStage)

		// Delete a ticket
	}

}
