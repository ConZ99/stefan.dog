package handlers

import (
	"BVGButBetter/models"
	"BVGButBetter/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetArrivals godoc
// @Summary Get arrivals but with resty
// @Description Get upcoming arrivals for a station ID
// @Tags arrivals
// @Produce json
// @Param stationID path string true "Station ID"
// @Success 200 {object} map[string]interface{}
// @Failure 500 {object} map[string]string
// @Router /arrivals/new/{stationID} [get] func
func GetLocations(context *gin.Context) {
	locationName := context.Param("locationName")

	locations, err := services.FetchLocations(locationName)
	fmt.Println("test")
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"locations": models.FilterLocationsByType(locations)})
}
