import { Articulation } from "vexflow";

export const showFermata = (staveNote) => {
  // Create a new Articulation with the symbol "a" and annotation "a"
  const arc = new Articulation("a@a");
  staveNote.addModifier(arc, 0);
};
