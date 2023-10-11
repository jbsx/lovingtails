import { z } from "zod";

export const dataSchema = z.object({
  title: z.string().min(5),
  category: z.string(),
  desc: z.string().min(20),
  price: z.number().gte(0),
  tag: z.string().optional(),
  amznlink: z.string().url(),
  priority: z.number().gte(0).lte(100),
  imgs: z.string(),
});

export const adminsSchema = z.object({
  email: z.string().email(),
});
