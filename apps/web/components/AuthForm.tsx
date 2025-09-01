"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@workspace/ui/components/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@workspace/ui/components/card";

import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  UserIcon
} from "lucide-react";
import Link from "next/link";

import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";
import { useAuthStore } from "@/app/store/auth.store";

type Props = { formType: "signin" | "signup" };

// Schemas
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});

const AuthFormSeparator = () => (
  <div className="flex items-center justify-center gap-2">
    <span className="w-full border-t border-border" />
    <span className="text-xs text-muted-foreground uppercase">or</span>
    <span className="w-full border-t border-border" />
  </div>
);

const AuthForm = ({ formType }: Props) => {
  const { setCurrentUser, setError } = useAuthStore();

  const handleOAuth = async (
    provider: OAuthProvider.Github | OAuthProvider.Google
  ) => {
    try {
      const response = await account.createOAuth2Session({
        provider: provider,
        success: `${window.location.origin}/dashboard`,
        failure: `${window.location.origin}/signin`
      });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEmailPasswordSignUp = async (data: FormData) => {
    try {
      const response = await account.create({
        userId: "unique()",
        email: data.get("email") as string,
        password: data.get("password") as string,
        name: data.get("name") as string
      });
      setCurrentUser(response);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEmailPasswordSignIn = async (data: FormData) => {
    try {
      const response = account.createEmailPasswordSession({
        email: data.get("email") as string,
        password: data.get("password") as string
      });
      const user = await account.get();
      setCurrentUser(user);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Card className="w-full max-w-md bg-stone-950/50 border-border/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          {formType === "signin" ? "Sign In" : "Create Account"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex flex-col gap-2">
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => handleOAuth(OAuthProvider.Google)}
          >
            <FaGoogle />
            Continue with Google
          </Button>
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => handleOAuth(OAuthProvider.Github)}
          >
            <FaGithub />
            Continue with GitHub
          </Button>
        </div>

        <AuthFormSeparator />

        {formType === "signin" ? <SignInForm /> : <SignUpForm />}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-muted-foreground">
        {formType === "signup" && (
          <div className="text-xs text-center w-full">
            By continuing, you agree to our{" "}
            <Link
              href={"/terms-of-service"}
              className="font-semibold text-white"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={"privacy-policy"} className="text-white font-semibold">
              Privacy Policy
            </Link>
            .
          </div>
        )}
        <div className="text-xs text-center w-full">
          {formType === "signin" ? (
            <>
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-white font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-white font-semibold hover:underline"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { signIn, loading, error } = useAuthStore();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const success = await signIn(values.email, values.password);
    if (success) {
      // Redirect to dashboard or handle success
      window.location.href = "/dashboard";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="name@domain.com"
                    className="pl-10 h-11 bg-input border-border"
                    {...field}
                  />
                </div>
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
              <FormControl>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  {passwordVisible ? (
                    <EyeIcon
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <EyeClosedIcon
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-input border-border"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-11" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </form>
    </Form>
  );
};

const SignUpForm = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { signUp, loading, error } = useAuthStore();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const success = await signUp(values.email, values.password, values.name);
    if (success) {
      // Redirect to dashboard or handle success
      window.location.href = "/dashboard";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Your Name"
                    className="pl-10 bg-input border-border"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="name@domain.com"
                    className="pl-10 h-11 bg-input border-border"
                    {...field}
                  />
                </div>
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
              <FormControl>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  {passwordVisible ? (
                    <EyeIcon
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <EyeClosedIcon
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-input border-border"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </form>
    </Form>
  );
};

export default AuthForm;
