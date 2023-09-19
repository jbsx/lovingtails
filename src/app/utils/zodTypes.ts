import { z } from "zod";

export const dataSchema = z.object({
  title: z.string().min(5),
  price: z.number(),
  tag: z.string().optional(),
  desc: z.string().min(20),
  amznlink: z.string().url(),
  imgs: z.string(),
});
