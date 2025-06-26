package main

import (
	"github.com/alyosha-bar/trello-clone/database"
	"github.com/alyosha-bar/trello-clone/middleware"
	"github.com/alyosha-bar/trello-clone/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to Neon database
	database.ConnectDB()
	// database.DB.AutoMigrate(&models.Todo{})

	// initialise Clerk Middleware
	middleware.InitClerkClient()

	// Setup Gin router
	router := gin.Default()
	routes.SetupRoutes(router)

	// Start the server
	router.Run(":8080")
}
