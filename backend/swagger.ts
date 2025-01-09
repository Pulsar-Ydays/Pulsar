import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: Gestion des transactions
 *   - name: Users
 *     description: Gestion des utilisateurs
 */

// Configuration des options de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Utilisateurs',
      version: '1.0.0',
      description: 'Une API pour gérer les utilisateurs',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Mets à jour avec ton URL
      },
    ],
  },
  apis: ['./routes/*.ts'], // Indique où Swagger doit chercher les définitions
};

// Générer les spécifications Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
