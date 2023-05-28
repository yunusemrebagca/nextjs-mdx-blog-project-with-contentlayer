import React, { useEffect } from "react";

export const useMousedown = (handler) => {
  useEffect(() => {
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
};
