import { ALargeSmall } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  appliedTextSize,
  applyTextSize,
  DEFAULT_TEXT_SIZE,
  TEXT_SIZE_STEPS,
  type TextSizeStep,
} from "@/lib/text-size";
import { cn } from "@/lib/utils";

export function TextSizeToggle({ className }: { className?: string }) {
  const [step, setStep] = useState<TextSizeStep>(DEFAULT_TEXT_SIZE);

  useEffect(() => {
    setStep(appliedTextSize());
  }, []);

  const next =
    TEXT_SIZE_STEPS[
      (TEXT_SIZE_STEPS.indexOf(step) + 1) % TEXT_SIZE_STEPS.length
    ] ?? DEFAULT_TEXT_SIZE;
  const resets = next === DEFAULT_TEXT_SIZE;

  const label = resets ? "Reset text size" : `Increase text size to ${next}%`;

  const handleClick = () => {
    applyTextSize(next);
    setStep(next);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={`${label} (currently ${step}%)`}
      title={label}
      className={cn(
        "relative rounded-none",
        // Enlarged sizes read as an active toggle instead of a plain icon.
        step !== DEFAULT_TEXT_SIZE && "bg-muted text-foreground",
        className,
      )}
    >
      <ALargeSmall aria-hidden="true" className="size-4" />
      <span aria-live="polite" className="sr-only">
        Text size {step}%
      </span>
    </Button>
  );
}
