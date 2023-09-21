import { z } from "zod";

export const dataSchema = z.object({
  title: z.string().min(5),
  category: z.string(),
  desc: z.string().min(20),
  price: z.number(),
  tag: z.string().optional(),
  amznlink: z.string().url(),
  recommend: z.boolean(),
  imgs: z.string(),
});
