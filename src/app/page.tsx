import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import Profile from "@/components/profile";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={actions.signIn} className="mb-5">
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>sign out</div>
      )}
      <Profile />
    </div>
  );
}
