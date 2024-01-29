import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Dashboard from "@/component/Dashboard";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/login");
  } else if (user.loginOtp) {
    redirect("/login/verification");
  }

  return (
    <>
      <Dashboard />
    </>
  );
}
