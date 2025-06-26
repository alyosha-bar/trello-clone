package routes

import (
	"github.com/alyosha-bar/trello-clone/handlers"
	"github.com/alyosha-bar/trello-clone/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	router.POST("/api/webhooks/clerk", handlers.ClerkWebHookHandler)

	workspaceRoutes := router.Group("/workspace")
	workspaceRoutes.Use(middleware.ClerkAuthMiddleware())
	{
		// GET all Workspaces --> for the sidebar?
		workspaceRoutes.GET("/", handlers.GetWorkspacesHandler)

		// GET specific workspace --> unclear what for

		// Create a workspace
		workspaceRoutes.POST("/create", handlers.CreateWorkspaceHandler)

		// Update workspace details --> not that important

		// Delete a workspace

	}

	ticketsRoutes := router.Group("/ticket")
	ticketsRoutes.Use(middleware.ClerkAuthMiddleware())
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
