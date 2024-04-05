"use server";

import { z } from "zod";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

//
const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const results = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!results.success) {
    return {
      errors: results.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a post."],
      },
    };
  }
  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: results.data.title,
        content: results.data.content,
      },
    });
  } catch (error) {}
  return {
    errors: {},
  };
  // revalidate the topicshow page
}
