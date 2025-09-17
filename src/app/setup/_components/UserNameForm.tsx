"use client";

import { createProfile } from "@/actions/setup";
import { userNameInputSchema } from "@/app/setup/_components/_schema";
import { userNameFormInput } from "@/app/setup/_components/_types";
import { PageHeader } from "@/components";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const userNameDefaultValues: {
  name: string;
} = {
  name: "",
};

interface UserNameFormProps {
  userId: string;
}

export const UserNameForm = ({ userId }: UserNameFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<userNameFormInput>({
    resolver: zodResolver(userNameInputSchema),
    defaultValues: userNameDefaultValues,
  });

  const submitUserProfileSent = async (values: userNameFormInput) => {
    const profileData = {
      userName: values.name,
      id: userId,
    };
    try {
      await createProfile(profileData);
      //go to next setup
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("登録に失敗しました");
    }
  };

  return (
    <>
      <PageHeader
        title="Profile設定"
        description="ユーザー名を登録してください"
      />
      <CardWithShadow className="py-8">
        <p className="absolute -top-7 right-2 font-bold">step 1/2</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitUserProfileSent)}
            className="space-y-4 px-6 w-[80%] mx-auto"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 mx-auto">ユーザー名</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="名前を入力してください"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-red-500">{errorMessage}</p>

            <div className="flex justify-center gap-2 mt-8 h-10">
              <Button
                type="button"
                onClick={() => form.reset()}
                className="rounded-lg"
                variant={"outline"}
              >
                リセット
              </Button>
              <Button type="submit" className="rounded-lg">
                登録
              </Button>
            </div>
          </form>
        </Form>
      </CardWithShadow>
    </>
  );
};
