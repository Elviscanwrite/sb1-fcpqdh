"use client";

import { type KeyboardEvent } from "react";

export const useEnterSubmit = ({
  onSubmit,
}: {
  onSubmit: () => void;
}): {
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      onSubmit();
    }
  };

  return { onKeyDown: handleKeyDown };
};