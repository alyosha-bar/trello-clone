package handlers

import (
	"fmt"
	"net/http"

	"github.com/alyosha-bar/trello-clone/models"
	"github.com/alyosha-bar/trello-clone/services"
	"github.com/gin-gonic/gin"
)

type ClerkUserWebhookPayload struct {
	Type string        `json:"type"` // this is the event type like "user.created"
	Data ClerkUserData `json:"data"`
}

type ClerkUserData struct {
	ID             string         `json:"id"`
	EmailAddresses []EmailAddress `json:"email_addresses"`
}

type EmailAddress struct {
	EmailAddress string `json:"email_address"`
}

func ClerkWebHookHandler(c *gin.Context) {
	var payload ClerkUserWebhookPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload", "details": err.Error()})
		return
	}

	fmt.Println("Received Clerk webhook event:", payload.Type)

	switch payload.Type {
	case "user.created":
		user := models.User{
			ClerkID: payload.Data.ID,
			Email:   extractPrimaryEmail(payload.Data.EmailAddresses),
		}

		err := services.SyncUserCreated(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "User creation synced."})

	default:
		c.JSON(http.StatusOK, gin.H{"message": "Event ignored."})
	}
}

// Helper: extractPrimaryEmail (dummy example, you will adjust based on actual payload)
func extractPrimaryEmail(emails interface{}) string {
	// Clerk sends emails as array or object; parse accordingly
	// For simplicity, assuming a single email string here
	return fmt.Sprintf("%v", emails)
}
