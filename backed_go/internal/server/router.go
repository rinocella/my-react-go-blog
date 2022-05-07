package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setRouter() *gin.Engine {
	// Creates default gin router with Logger and Recovery
	router := gin.Default()

	router.Use(cors.Default())

	// router.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"https://foo.com"},
	// 	AllowMethods:     []string{"PUT", "PATCH"},
	// 	AllowHeaders:     []string{"Origin"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	AllowOriginFunc: func(origin string) bool {
	// 		return origin == "https://github.com"
	// 	},
	// 	MaxAge: 12 * time.Hour,
	// }))

	router.RedirectTrailingSlash = true
	// Create API route group
	api := router.Group("/api")
	{

		// Add /hello GET route to router and define route handler function
		api.GET("/hello", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "world"})
		})
		api.POST("/signup", signUp)
		api.POST("/signin", signIn)

	}

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

	return router

}
