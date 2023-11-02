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
// Todo add the ability to add roles to a user
export const updateUserValidator = z.object({
  email: z.string().email().optional(),
  // Regex for names that allows for hyphens, periods, and apostrophes
  firstName: z.string().regex(/^[A-Za-z \-\.\']+$/),
  lastName: z.string().regex(/^[A-Za-z \-\.\']+$/),
  bio: z.string().optional(),
  linkedInUrl: z.string().optional(),
  githubUsername: z.string().optional(),
  phoneNum: z.string().regex(/^[0-9]+$/),
  pronouns: z.string().optional(),
  graduationYear: z.string().optional(),
  major: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
});

// POST /api/meeting
export const createMeetingValidator = z.object({
  title: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
});
