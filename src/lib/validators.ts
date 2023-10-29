import { z } from "zod";

// Request body validators for API routes

// PATCH  /api/projects/{id}
export const updateProjectValidator = z.object({
  title: z.string().optional(),
  addUsers: z.array(z.string()).optional(),
  removeUsers: z.array(z.string()).optional(),
});

// PATCH /api/projects
export const createProjectValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
});

// PUT /api/user/{id}
// Todo add more properties as we build out the user model
// Todo add the ability to add roles to a user
export const updateUserValidator = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  linkedInUrl: z.string().optional(),
  githubUsername: z.string().optional(),
  phoneNum: z.string().optional(),
});
