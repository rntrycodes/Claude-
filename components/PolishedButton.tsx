import { useState } from "react";

type ButtonState = "idle" | "loading" | "success" | "error";

interface PolishedButtonProps {
  onClick?: () => Promise<void>;
  children: React.ReactNode;
}

export function PolishedButton({ onClick, children }: PolishedButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");

  async function handleClick() {
    if (state !== "idle") return;
    setState("loading");
    try {
      await onClick?.();
      setState("success");
      setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1800);
    }
  }

  return (
    <button className="btn" data-state={state} onClick={handleClick}>
      <span className="btn-content" data-state={state}>
        {state === "idle" && children}
        {state === "loading" && (
          <span className="spinner" aria-label="Loading" />
        )}
        {state === "success" && <span>Done ✓</span>}
        {state === "error" && <span>Try again</span>}
      </span>
    </button>
  );
}
