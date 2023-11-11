// Simple helper functions used throughout the app

// Formats project name strings to be more readable in the frontend
// turns internal-project-name to Internal Project Name
export function projectNameStringFormatter(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b(\w)/g, (s) => s.toUpperCase())
    .replace(/-/g, " ");
}
