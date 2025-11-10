import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500, "Excerpt is too long").optional(),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  author: z.string().min(1).max(100).default("Emil"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format").optional(),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().max(500).optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  author: z.string().min(1).max(100).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format").optional(),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
