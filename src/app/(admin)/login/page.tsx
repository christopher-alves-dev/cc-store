"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import { FormInput } from "../dashboard/components/form-input";
import { SubmitButton } from "../dashboard/components/submit-button";
import { login } from "./actions";
import { useLoginForm } from "./hooks/useLoginForm";
import { LoginSchemaType } from "./schema";

export default function LoginPage() {
  const { formMethods } = useLoginForm();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    startTransition(async () => {
      const { error } = await login(data);

      if (error) {
        redirect("/error");
      }

      redirect("/dashboard");
    });
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="px-4">
        <Card className="flex flex-col gap-4 bg-background">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* <label htmlFor="email">Email:</label> */}
            <FormInput
              id="email"
              name="email"
              control={formMethods.control}
              label="Email"
              placeholder="Email"
            />

            <FormInput
              id="password"
              name="password"
              control={formMethods.control}
              label="Password"
              placeholder="Password"
              type="password"
            />
          </CardContent>
          <CardFooter>
            <SubmitButton
              // formAction={login}
              pending={pending}
              label="Log in"
              loadingLabel="Carregando"
            />
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
