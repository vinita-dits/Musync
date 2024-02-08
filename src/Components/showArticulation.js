import { Articulation } from "vexflow";
const articulationsConverter = (type) => {
  switch (type) {
    case "staccato":
      return "a.";
    case "accent":
      return "a>";
    case "tenuto":
      return "a-";
    default:
      return "a.";
  }
};
export const showArticulation = (noteOrRest, staveNote) => {
  // Create a new Articulation instance using the articulationsConverter() method
  const articulte = new Articulation(
    articulationsConverter(
      Object?.keys(noteOrRest?.notations?.articulations)[0]
    )
  );
  // Adding an articulation modifier to the StaveNote
  // The addModifier function is used to attach a modifier to the note.
  // In this case, 'articulate' is the articulation type (e.g., 'a', 'u', etc. for accent, up-bow, etc.).
  // The second parameter, 0, represents the index of the note within the chord (0 for the first note).
  staveNote?.addModifier(articulte, 0);
};
