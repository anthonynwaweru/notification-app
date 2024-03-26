"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  let userInfo: string = "";
  if (session.data?.user) {
    userInfo = "User is signed in";
  } else {
    userInfo = "User is not signed in";
  }
  return (
    <div>
      From client: {userInfo} {JSON.stringify(session.data?.user)}
    </div>
  );
}
