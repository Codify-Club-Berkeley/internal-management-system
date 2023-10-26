# Codify Internal Management System

The IMS is a custom internal tool built and maintained by Codify to help us manage our project, education program, and applications.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses pnpm as a package manager. If you do not already have it installed, [install it with either npm or homebrew](https://pnpm.io/installation).

Additionally, the project requires certain environment variables to be set, which are not committed to GitHub. Get the .env file from the discord, and add it to the root of the project. Make sure the name of the file is .env and not env

Finally, install all of the dependencies with:

```bash
pnpm install
```

Generate the Prisma Client with

```bash
pnpx prisma generate
```

and, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### VS Code Extensions

I don't think that any of these are strictly necessary, but I would HIGHLY recommend installing the following extensions for VS Code:

Frontend: ES7+ React/Redux/React-Native snippets, Tailwind CSS IntelliSense
Backend: Prisma, Thunder Client (Or use Postman for API testing)
General: Better Comments, ESLint, Prettier, GitLens, GitHub Copilot (requires you to register for student access),Material Icon Theme

## Tech Stack

1. TypeScript: Everything in this project is written in TypeScript.
2. NextJS: NextJS is a React framework that allows for server-side rendering, static site generation, and more. We use it for the frontend and backend of this project.
3. ReactJS: NextJS is built on top of React, so we are also using React
4. Prisma: Prisma is an ORM that allows us to interact with our database. It is used for all database interactions so that we don't have to write SQL.
5. Clerk: Clerk is an authentication service that allows us to easily add authentication to our project. It is used for all authentication.
6. TailwindCSS: TailwindCSS is a CSS framework that makes CSS much easier to write. It is used for all styling in this project.
7. React Query: A library that makes it easy to fetch and cache data from an API on your frontend. It is used for all API calls in this project.

## Linting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to enforce code style and best practice.

To run eslint, run:

```bash
pnpx eslint . --ext .js,.jsx,.ts,.tsx
```

To format code with prettier, run:

```bash
pnpx prettier . --write
```

## API documentation

The Swagger API documentation is automatically generated according to the swagger annotations on each of the API routes. The information in the documentation may not be up to date. It can be accessed at the path /api-docs
