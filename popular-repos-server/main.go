package main

import (
	"net/http"

	"github.com/sirupsen/logrus"
)

func main() {
	logrus.Info("Serving on port :8080")
	http.Handle("/", http.FileServer(http.Dir("./build")))

	err := http.ListenAndServe(":8080", nil)

	if err != nil {
		logrus.Error(err)
	}
}
