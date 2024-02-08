import { Accidental } from "vexflow";

const accidentConverter = (type) => {
  switch (type) {
    case "natural":
      return "n";
    case "sharp":
      return "#";
    case "flat":
      return "b";
    case "double-sharp":
      return "##";
    case "flat-flat":
      return "bb";
    default:
      return "b";
  }
};
export const showAccidental = (note, stavenote) => {
  const newAccident = new Accidental(accidentConverter(note));
  // Adding an accidental modifier to the note at index 0
  // newAccident represents the type of accidental (sharp, flat, natural, etc.)
  stavenote?.addModifier(newAccident, 0);
};
