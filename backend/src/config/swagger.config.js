const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AltCred API',
            version: '1.0.0',
            description: 'API documentation for AltCred - AI-Driven Alternative Credit Scoring',
            contact: {
                name: 'API Support',
                email: 'support@altcred.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:4000/api/v1',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/modules/**/routes/*.js', './src/modules/**/validators/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
