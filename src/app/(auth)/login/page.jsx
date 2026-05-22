

"use client";

import { FcGoogle } from "react-icons/fc";
import { 
  Card, 
  Separator,
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField
} from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
// import { redirect } from "next/navigation";
import Link from "next/link";
import { RiMailLine, RiLock2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';



const LoginPage = () => {
  const router = useRouter();
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      // redirect('/');
      router.push("/");
    }

    if (error) {
      //alert("Invalid email or password. Please try again.");
      toast.error("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
                const { data, error } = await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
                });
                if (error) {
                    console.error(error);
                    // toast.error(error.message)
                    //alert("Google Sign-In failed. Please try again.");
                    toast.error("Google Sign-In failed. Please try again.");
                } else {
                    console.log(data);
                    // toast.success("SignIn successful")
                    //alert("Google Sign-In successful! Redirecting...");
                    toast.success("Google Sign-In successful! Redirecting...");
                }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center pt-24 pb-16 transition-colors duration-300 px-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
            Welcome <span className="text-[#f97316]">Back</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
            Log in to continue your adventure with DriveFleet.
          </p>
        </div>

        <Card className="bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none">
          <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-1.5">
                Email Address
              </Label>
              <div className="relative w-full">
                <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                <Input 
                  placeholder="john@example.com" 
                  className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
                />
              </div>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <div className="flex justify-between items-center mb-1.5">
                <Label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block">
                  Password
                </Label>
                <Link href="#" className="text-xs text-gray-400 hover:text-[#f97316] transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative w-full">
                <RiLock2Line className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                <Input 
                  placeholder="Enter your password" 
                  className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
                />
              </div>
              <Description className="text-[11px] text-gray-400 dark:text-white/30 mt-1">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <Button 
              className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-[#f97316]/10 text-sm h-auto mt-2" 
              type="submit"
            >
              Login
            </Button>
          </Form>

          <div className="flex justify-center items-center gap-3 my-6">
            <Separator className="flex-1 bg-gray-100 dark:bg-white/[0.06]" />
            <div className="whitespace-nowrap text-xs uppercase text-gray-400"> Or sign in with </div>
            <Separator className="flex-1 bg-gray-100 dark:bg-white/[0.06]" />
          </div>

          <div>
            <Button 
              onClick={handleGoogleSignin} 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2.5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/[0.06] text-gray-900 dark:text-white border border-gray-200 dark:border-white/[0.08] py-3 rounded-xl font-medium text-sm transition-colors h-auto"
            >
              <FcGoogle className="text-lg" /> 
              Sign in with Google
            </Button>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-white/40 mt-6">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-[#f97316] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;