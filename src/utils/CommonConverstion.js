export const convertClef = (type) => {
  // in this method to convert the clef
  switch (type) {
    case "G":
      return "treble";
    case "F":
      return "bass";
    case "C":
      return "alto";
    default:
      return "treble";
  }
};
