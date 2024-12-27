import { toaster } from "@/components/ui/toaster";
import { useCallback } from "react";

export const useShowToast = () => {
  const showToast = useCallback(
    (title, description, type) => {
      toaster.create({
        title,
        description,
        type,
        duration: 3000,
      });
    },
    [toaster]
  );
  return showToast;
};
