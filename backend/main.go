package main

import (
	"BVGButBetter/routes"

	_ "BVGButBetter/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title BVG Proxy API
// @version 1.0
// @description A proxy service that sanitizes BVG transport data
// @termsOfService http://swagger.io/terms/
// @host localhost:8080
// @BasePath /api
func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	routes.RegisterRoutes(router)

	router.Run("localhost:8080")
}
