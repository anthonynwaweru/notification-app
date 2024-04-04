"use server";
import { error } from "console";
import { z } from "zod";

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
    _form: string[];
  };
}
export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const name = formData.get("name");
  const description = formData.get("description");
  console.log(name, description);
  const data = createTopicSchema.safeParse({ name, description });
  if (!data.success) {
    return { errors: data.error.flatten().fieldErrors };
  }
  return {
    errors: {},
  };
  // revalidate the homepage after creating a new topic
}
