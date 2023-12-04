// Simple helper functions used throughout the app

// Formats project name strings to be more readable in the frontend
// turns internal-project-name to Internal Project Name
export function projectNameStringFormatter(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b(\w)/g, (s) => s.toUpperCase())
    .replace(/-/g, " ");
}

// Given an API input in the validated format, format all of the connections and disconnections between models
// Any field in the input prefixed with "add" or "remove" is an array of ids that will be connected or disconnected from the model
// All other fields will be unchanged

// Example input:
// {
// title: z.string().optional(),
// addUsers: z.array(z.string()).optional(),
// removeUsers: z.array(z.string()).optional(),
// addLeads: z.array(z.string()).optional(),
// removeLeads: z.array(z.string()).optional(),
// }

// Example output:
// data: {
//   title: body.title,
//   members: {
//     connect: addUsers,
//     disconnect: removeUsers,
//   },
//   leads: {
//     connect: addLeads,
//     disconnect: removeLeads,
//   },
// },
export function formatModelConnections(input: any): any {
  let formatted: any = {};

  // Get all of the keys in the input
  const keys: string[] = Object.keys(input);

  // Loop through each key
  keys.forEach((key: string) => {
    if (key.startsWith("add")) {
      // Get the second half of the key name and format it to be all lower case
      // Example: addUsers -> users
      const modelName = key.replace("add", "").toLowerCase();

      // Format the array of ids to be used in the update
      const addIds = input[key].map((addId: string) => ({ id: addId }));

      // Add the formatted array of ids to the formatted object
      // If the model name already exists in the formatted object, add the connect field
      if (formatted[modelName]) {
        formatted[modelName].connect = addIds;
      } else {
        // If the model name does not exist in the formatted object, create it and add the connect field
        formatted[modelName] = {
          connect: addIds,
        };
      }
    } else if (key.startsWith("remove")) {
      // Get the second half of the key name and format it to be all lower case
      // Example: removeUsers -> users
      const modelName = key.replace("remove", "").toLowerCase();

      // Format the array of ids to be used in the update
      const removeIds = input[key].map((removeId: string) => ({
        id: removeId,
      }));

      // Add the formatted array of ids to the formatted object
      // If the model name already exists in the formatted object, add the disconnect field
      if (formatted[modelName]) {
        formatted[modelName].disconnect = removeIds;
      } else {
        // If the model name does not exist in the formatted object, create it and add the disconnect field
        formatted[modelName] = {
          disconnect: removeIds,
        };
      }
    } else {
      // If the key does not start with "add" or "remove", add it to the formatted object
      formatted[key] = input[key];
    }
  });

  return formatted;
}
