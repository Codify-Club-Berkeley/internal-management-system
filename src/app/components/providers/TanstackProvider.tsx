"use client";

// Create a react query client
// https://tanstack.com/query/v4/docs/react/guides/ssr#using-the-app-directory-in-nextjs-13
// Mirrors this tutorial: https://www.youtube.com/watch?v=G0BmM-L5FoE&t=1660s

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
