import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import Profile from "@/components/profile";
import { auth } from "@/auth";
import TopicCreateForm from "@/components/topics/topic-create-form";
export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div>
        <TopicCreateForm />
      </div>
    </div>
  );
}
