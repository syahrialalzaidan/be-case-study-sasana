import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NewForm from "../component/NewForm";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user && !user.loginOtp) {
    redirect("/");
  } else if (user?.loginOtp) {
    redirect("/login/verification");
  }
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="p-8 w-1/3 shadow-md bg-white rounded-lg">
        <h2 className="text-2xl text-center font-bold mb-4">New Password</h2>
        <p className="text-center">Please enter your new password below</p>
        <NewForm />
      </div>
    </div>
  );
};

export default Page;
