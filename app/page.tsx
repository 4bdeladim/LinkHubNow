"use client";
import { redirect, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


type TLoginType = "credentials" | "google" | "github";
export default function SignIn() {
    const { status } = useSession();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string>()
    const callbackUrl = searchParams.get("callbackUrl") || "/edit";
    const login = async (loginType: TLoginType) => {
        switch (loginType) {
            case "github":
                await signIn("github", {
                    redirect: true,
                    callbackUrl,
                    
                });
                return;
            case "credentials":
                await signIn("credentials", {
                    callbackUrl,
                    redirect: false,
                    email,
                    password,
                }).then((res) => {
                    
                    if(!res?.error) redirect("/edit")
                    else {
                        setError("Invalid Credentials")
                    }
                })
                return;
            case "google":
                await signIn("google", {
                    callbackUrl,
                    redirect: true,
                });
                return;
            default:
                return;
        }
    };
    if (status === "authenticated") {
        redirect("/edit");
    }
        return (
            <Card className="w-[350px]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password below to sign in
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                  <Button onClick={() => login("github")} variant="outline">
                    <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Github
                  </Button>
                  <Button onClick={() => login("google")} variant="outline">
                    <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Google
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input onChange={(e) => setPassword(e.target.value)}  id="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => login("credentials")} className="w-full">Sign In</Button>
              </CardFooter>
            </Card>
          );
}
