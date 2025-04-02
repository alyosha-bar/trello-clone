package models

import "gorm.io/gorm"

type Ticket struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	WorkspaceID uint   `json:"workspace_id"`
	Status      string `json:"status"`
}
