"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}
export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const name = formData.get("name");
  const description = formData.get("description");
  console.log(name, description);
  const results = createTopicSchema.safeParse({ name, description });

  // validation
  if (!results.success) {
    return { errors: results.error.flatten().fieldErrors };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a topic."],
      },
    };
  }
  let topic: Topic;
  try {
    // throw new Error("failed to load");
    topic = await db.topic.create({
      data: {
        slug: results.data.name,
        description: results.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }
  // revalidate the homepage after creating a new topic
  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
