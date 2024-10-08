// src\components\ui\input.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  // Using the ref provided to forwardRef
  const inputRef = ref as React.MutableRefObject<HTMLInputElement>;

  // Use effect to focus the input whenever value changes
  React.useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [props.value]); // Triggers focus whenever the value prop changes

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={inputRef}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
