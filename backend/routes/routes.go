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
	}

	ticketsRoutes := router.Group("/ticket")
	{
		ticketsRoutes.GET("/:workspace_id", handlers.GetAllTicketsInWorkspaceHandler)
	}

}
