import { getServerSession } from "next-auth";
import LoginForm from "./component/LoginForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        <LoginForm />
        <p className="mt-4 text-center">{"Don't have an account? Register "} <a href="/signup" className="underline">here</a></p>
      </div>
    </div>
  );
};

export default Page;
