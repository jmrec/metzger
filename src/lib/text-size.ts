export const TEXT_SIZE_STORAGE_KEY = "marci-text-size";

export const TEXT_SIZE_STEPS = [100, 112.5, 125] as const;

export type TextSizeStep = (typeof TEXT_SIZE_STEPS)[number];

export const DEFAULT_TEXT_SIZE: TextSizeStep = 100;

/** Reads the size currently applied to `<html>`, falling back to the default. */
export function appliedTextSize(): TextSizeStep {
  const size = Number.parseFloat(document.documentElement.style.fontSize);
  return TEXT_SIZE_STEPS.find((step) => step === size) ?? DEFAULT_TEXT_SIZE;
}

export function applyTextSize(step: TextSizeStep) {
  const root = document.documentElement;

  if (step === DEFAULT_TEXT_SIZE) {
    root.style.removeProperty("font-size");
  } else {
    root.style.fontSize = `${step}%`;
  }

  try {
    window.localStorage.setItem(TEXT_SIZE_STORAGE_KEY, String(step));
  } catch {
    // Storage can be unavailable; the inline style still applies this visit.
  }
}

export const textSizeInitScript = `
(function () {
  try {
    var steps = ${JSON.stringify(TEXT_SIZE_STEPS)};
    var stored = Number(localStorage.getItem("${TEXT_SIZE_STORAGE_KEY}"));
    if (steps.indexOf(stored) !== -1 && stored !== ${DEFAULT_TEXT_SIZE}) {
      document.documentElement.style.fontSize = stored + "%";
    }
  } catch (error) {
    /* Storage can be blocked (private mode); keep the default size. */
  }
})();
`;
