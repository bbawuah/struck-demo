import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

type Word = {
  word: string;
  group: string;
};

export function useAutoSaveWord(word?: Word) {
  const mutation = useMutation({
    mutationFn: async (data: Word) => {
      const res = await fetch("/word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save word");
      return res.json();
    },
  });

  useEffect(() => {
    if (word && !mutation.isPending && !mutation.isSuccess) {
      mutation.mutate(word);
    }
  }, [word]);

  return mutation;
}
