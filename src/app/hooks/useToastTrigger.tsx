import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useToastTrigger(
  trigger: boolean,
  message: string,
  cb?: () => void
) {
  useEffect(() => {
    if (trigger) {
      toast(message);
    }

    cb?.();
  }, [trigger, message]);
}
