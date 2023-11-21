import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/dist/server/api-utils";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser(); // Make sure getUser is awaited to get the actual user object

  if (!user || !user.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    // Redirect to auth-callback with status code 307 (Temporary Redirect)
    redirect(307, "/auth-callback?origin=dashboard");
  }

  return <div>{user.email}</div>;
};

export default Page;

