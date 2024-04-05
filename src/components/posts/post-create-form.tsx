"use client";
import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

export default function PostCreateForm() {
  const [formState, action] = useFormState(actions.createPost, { errors: {} });
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              type="text"
              name="title"
              label="Title"
              placeholder="Title"
              labelPlacement="outside"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              label="Content"
              name="content"
              placeholder="Post content"
              labelPlacement="outside"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 bprder-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <FormButton>Submit post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
