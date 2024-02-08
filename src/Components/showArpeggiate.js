import { Stroke } from "vexflow";

export const showArpeggiate = (data) => {
  const appregia = new Stroke(3);
  // Add arpeggio modifier to musical data at index 0
  data?.addModifier(appregia, 0);
};
