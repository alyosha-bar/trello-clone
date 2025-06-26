package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/gin-gonic/gin"
)

var clerkClient clerk.Client

// InitClerkClient should be called in main.go after loading env variables
func InitClerkClient() {
	var err error
	secretKey := os.Getenv("CLERK_SECRET_KEY")
	if secretKey == "" {
		panic("CLERK_SECRET_KEY environment variable not set")
	}

	clerkClient, err = clerk.NewClient(secretKey)
	if err != nil {
		panic("Failed to initialize Clerk client: " + err.Error())
	}
}

func ClerkAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization token"})
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization header format"})
			return
		}

		token := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))

		sessionClaims, err := clerkClient.VerifyToken(token)
		if err != nil {
			fmt.Println("Verify token error:", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		clerkUserID := sessionClaims.Claims.Subject
		c.Set("clerkUserID", clerkUserID)

		fmt.Println(clerkUserID)

		c.Next()
	}
}
