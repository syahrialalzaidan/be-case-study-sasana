import { getServerSession } from "next-auth";
import SignupForm from "./component/SignupForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user && !user.loginOtp) {
    redirect("/");
  } else if (user?.loginOtp && user) {
    redirect("/login/verification");
  }
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="p-8 w-1/3 shadow-md bg-white rounded-lg">
        <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>
        <SignupForm />
        <p className="mt-4 text-center">
          {"Already have an account? Login "}{" "}
          <a href="/login" className="underline">
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
