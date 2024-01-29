import { getServerSession } from "next-auth";
import LoginVerifForm from "../component/LoginVerifForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Page = async() => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/login");
  } else if (!user.loginOtp) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="p-8 w-1/3 shadow-md bg-white rounded-lg">
        <h2 className="text-2xl text-center font-bold mb-4">Login Verification</h2>
        <p className="text-center">Please Enter the code to verify {"it's"} you</p>
        {/* Pass the token to the VerificationForm component */}
        <LoginVerifForm email={user.email} />
      </div>
    </div>
  );
};

export default Page;
