package handlers

import (
	"BVGButBetter/models"
	"BVGButBetter/services"
	"log"
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
func GetTripInfo(context *gin.Context) {
	stopID := context.Param("stopID")

	arrivals, err := services.FetchTripEntry("arrivals", stopID)
	log.Print("arrivals")
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	departures, err := services.FetchTripEntry("departures", stopID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	trips := models.Cleanup(arrivals, departures)
	context.JSON(http.StatusOK, gin.H{"stopID": stopID, "trips": trips})
}
