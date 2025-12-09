"use client";

import { useCallback, useState } from "react";

export const useModalControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRegularOpen, setisRegularOpen] = useState(false);

  //Handle Window
  const handleOpenChange = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  //Handle Input Form Window
  const handleFormOpenChange = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  //Handle Regular Meals Window
  const handleRegularOpenChange = useCallback(() => {
    setisRegularOpen((prev) => !prev);
  }, []);

  //Close all window
  const closeAllWindows = () => {
    setIsOpen(false);
    setIsFormOpen(false);
    setisRegularOpen(false);
  };

  return {
    isOpen,
    handleOpenChange,
    isFormOpen,
    handleFormOpenChange,
    isRegularOpen,
    handleRegularOpenChange,
    closeAllWindows,
  };
};
