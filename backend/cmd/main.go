package main

import (
	"github.com/alyosha-bar/trello-clone/database"
	"github.com/alyosha-bar/trello-clone/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// connect to database

	// set up router

	// run server

	// Load .env file
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	// Connect to Neon database
	database.ConnectDB()
	// database.DB.AutoMigrate(&models.Todo{})

	// Setup Gin router
	router := gin.Default()
	routes.SetupRoutes(router)

	// Start the server
	router.Run(":8080")
}
