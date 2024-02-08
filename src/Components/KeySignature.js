function majorToKeySignature(major) {
  // Calculate the number of flats
  const flats = Math.abs(major);

  // Determine the direction (flat or sharp)
  const direction = major < 0 ? "b" : "";
  console.log(direction, flats, "<===flatsflatsflatsflats");
  // Determine the letter for the key signature
  const letters = ["C", "F", "B", "E", "A", "D", "G"];
  const letter = letters[flats];

  // Combine the key signature and direction to get the result
  return letter + direction;
}

export const KeySignature = (notes, stave) => {
  if (Array?.isArray(notes)) {
    if (notes[0]?.key) {
      // Set the key signature for the stave, indicating the number of sharps (#) or flats (b).
      // Example usage: stave.setKeySignature('A'); // Sets the key signature to A major (3 sharps: F#, C#, G#)
      stave.setKeySignature(
        notes[0]?.key?.fifths == "-1"
          ? "F"
          : majorToKeySignature(notes[0]?.key?.fifths)
      );
    }
  } else {
    if (notes?.key) {
      stave.setKeySignature(
        notes?.key?.fifths == "-1"
          ? "F"
          : majorToKeySignature(notes?.key?.fifths)
      );
    }
  }
};
