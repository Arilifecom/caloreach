"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { memo } from "react";

type GetStartedButtonProps = {
  isLoggedIn: boolean;
};

const Component = ({ isLoggedIn }: GetStartedButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    if (isLoggedIn) {
      router.push("/dashbord");
    } else {
      router.push("/auth/signup");
    }
  };

  return <Button onClick={handleClick}>カロリーチを始める</Button>;
};

const GetStartedButton = memo(Component);
export { GetStartedButton };
