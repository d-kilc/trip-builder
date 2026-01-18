package main

import (
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// add middlewares
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// healthcheck endpoint
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
	})

	// list trips by user endpoint
	// e.GET("/users/:id/trips", func(c echo.Context) error {
	// 	// parse id, call q.ListTripsByUser
	// })

	// start server
	addr := os.Getenv("ADDR")
	if addr == "" {
		// default to 8080
		addr = ":8080"
	}
	e.Logger.Fatal(e.Start(addr))
}
