"use client";

import { useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, togleOpen };
};
