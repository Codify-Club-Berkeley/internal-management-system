import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "../app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Internal Management System API Spec",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          // Todo delete this, or investigate if we can use it with clerk
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
