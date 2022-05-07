package server

func Start() {

	router := setRouter()
	//start listening an serving requests
	router.Run(":8080")
}
