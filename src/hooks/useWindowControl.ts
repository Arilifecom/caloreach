"use client";

import { useCallback, useState } from "react";

export const useWindowControl = () => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  //Handle Option Window
  const handleOptionWindow = useCallback(() => {
    setIsOptionOpen((prev) => !prev);
  }, []);

  //Handle Input Form Window
  const handleInputFormWindow = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  //Handle Regular Meals Window
  const handleRegularMealsWindow = useCallback(() => {
    console.log("Open Regular Meals Window");
  }, []);

  //Close all window
  const handleCloseAllWindows = () => {
    setIsOptionOpen(false);
    setIsFormOpen(false);
  };

  return {
    isFormOpen,
    handleOptionWindow,
    handleInputFormWindow,
    isOptionOpen,
    handleRegularMealsWindow,
    handleCloseAllWindows,
  };
};
