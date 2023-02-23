export const config = {
	database: {
		mongoURI: process.env.MONGO_URI
	},
	server: {
		port: process.env.PORT ?? 3000
	},
	jwt: {
		secret: process.env.SECRET
	}
};