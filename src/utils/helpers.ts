// stringFormatter.ts

export function projectNameStringFormatter(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b(\w)/g, (s) => s.toUpperCase())
    .replace(/-/g, " ");
}
