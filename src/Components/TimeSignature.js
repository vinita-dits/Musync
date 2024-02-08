export const getKeySignature = (notes, stave) => {
  //condition for keysignature is array
  if (Array?.isArray(notes) && notes[0]?.time) {
    // Set the time signature for the stave.
    stave?.setTimeSignature(
      notes[0]?.time?.beats + "/" + notes[0]?.time["beat-type"]
    );
  } else if (notes?.time) {
    // Set the time signature for the stave.
    stave?.setTimeSignature(notes?.time.beats + "/" + notes?.time["beat-type"]);
  }
};
