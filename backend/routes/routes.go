package routes

import (
	"BVGButBetter/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.GET("/trips/:stopID", handlers.GetTripInfo)
		api.GET("/locations/:locationName", handlers.GetLocations)
	}
}
