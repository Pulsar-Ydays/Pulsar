import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API pour gérer les utilisateurs",
    },
    servers: [
      {
        url: "http://localhost:5050", // Changez ceci selon votre environnement
        description: "Serveur local",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Chemin vers vos fichiers de route
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
