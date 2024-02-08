import { Dot } from "vexflow";

export const dotNotation = (staveNote) => {
  const dot = new Dot()?.setDotShiftY(15);
  // Add a dot modifier to the StaveNote at index 0.
  // This dot indicates a half-duration increase to the note's original duration.
  staveNote?.addModifier(dot, 0);
};
