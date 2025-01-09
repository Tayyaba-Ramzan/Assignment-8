import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: "eru5r6ea",
  dataset: "production",
});
