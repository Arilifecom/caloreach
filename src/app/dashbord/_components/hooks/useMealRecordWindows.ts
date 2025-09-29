import { useCallback, useState } from "react";

export const useMealRecordWindows = () => {
  const [optionWindowOpen, setOptionWindowOpen] = useState(false);
  const [inputFormOpen, setInputFormOpen] = useState(false);

  //Handle Option Window
  const handleOptionWindow = useCallback(() => {
    setOptionWindowOpen((prev) => !prev);
  }, []);

  //Handle Input Form Window
  const handleInputFormWindow = useCallback(() => {
    setInputFormOpen((prev) => !prev);
  }, []);

  //Handle Regular Meals Window
  const handleRegularMealsWindow = useCallback(() => {
    console.log("Open Regular Meals Window");
  }, []);

  return {
    inputFormOpen,
    handleOptionWindow,
    handleInputFormWindow,
    optionWindowOpen,
    handleRegularMealsWindow,
  };
};
