/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebookF,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";

const LoginPage = () => {
  const session = useSession();
  console.log("session: ", session.data?.user?.name);
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().min(1, "Email is required.").email("Invalid email."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must have than 6 characters."),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleRouter = () => {
    router.push("/signup");
  };

  const handleSignInWithGoogle = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/user" });
  };

  const handleSignInWithFacebook = () => {
    signIn("facebook", { callbackUrl: "http://localhost:3000/user" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center xs:p-10">
      <div className="">
        <ModeToggle />
      </div>
      <Link href="/">
        <p className="xs:text-xs md:text-sm xs:mt-5 md:mt-10">
          <span>
            <FontAwesomeIcon icon={faAngleLeft} size="1x" className="mr-2" />
          </span>
          Back to home
        </p>
      </Link>
      <div className="border-2 border-black-500 p-5 xs:w-[350px] md:w-[500px] rounded-md mt-4">
        <h1 className="xs:text-3xl md:text-4xl text-center">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Type your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Type your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full !mt-10">
              LOGIN
            </Button>
          </form>
        </Form>
        <p className="line-or px-6 mt-7">
          <span className="line"></span>
          <span className="text text-[20px]">or</span>
          <span className="line"></span>
        </p>
        <Button
          variant={"outline"}
          className="w-full mt-7 p-6 text-[16px]"
          onClick={handleSignInWithGoogle}
        >
          <span className="text-2xl mr-2">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          Sign in with Google{" "}
        </Button>
        <Button
          variant={"outline"}
          className="w-full mt-7 p-6 text-[16px]"
          onClick={handleSignInWithFacebook}
        >
          <span className="text-2xl mr-2">
            <FontAwesomeIcon icon={faFacebookF} />
          </span>
          Sign in with Facebook{" "}
        </Button>
        <Button variant={"outline"} className="w-full mt-7 p-6 text-[16px]">
          <span className="text-2xl mr-2">
            <FontAwesomeIcon icon={faGithub} />
          </span>
          Sign in with GitHub{" "}
        </Button>
        <div className="mt-10 xs:text-xs md:text-sm">
          <p className="text-center cursor-default">Don't have an account?</p>
          <p
            className="text-center font-bold cursor-pointer"
            onClick={handleRouter}
          >
            Create an account
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
