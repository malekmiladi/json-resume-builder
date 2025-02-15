import { useState } from "react";

const useAccordion = (length: number) => {
  const [accordionControls, setAccordionControls] = useState(
    Array(length).fill(false)
  );

  const updateActive = (index: number) => {
    setAccordionControls((prevState) => {
      const newArray = Array(prevState.length).fill(false);
      newArray[index] = !prevState[index];
      return newArray;
    });
  };

  const addAccordionControl = () =>
    setAccordionControls((prevState) => {
      const newArray = Array(prevState.length + 1).fill(false);
      newArray[prevState.length] = true;
      return newArray;
    });

  const deleteAccordionControl = (index: number) => {
    const currentActive = accordionControls.indexOf(true);
    const adjustedActive =
      index < currentActive ? currentActive - 1 : currentActive;
    setAccordionControls((prevState) => {
      prevState[currentActive] = false;
      const newArray = prevState.splice(index, 1);
      if (index !== currentActive && currentActive !== -1) {
        newArray[adjustedActive] = true;
      }
      return newArray;
    });
  };

  return {
    accordionControls,
    updateActive,
    addAccordionControl,
    deleteAccordionControl
  };
};

export default useAccordion;
