import { GraceNote, StaveNote } from "vexflow";

export const ShowStaveNote = (notes, i, staves, clef, stave) => {
  //to create stave note
  const FilterbyStave = stave?.filter((itm) => parseInt(itm?.staff) === i); //filter the stave note
  let value = [];
  if (FilterbyStave?.find((itm) => itm["default-x"] === notes["default-x"])) {
    const data = FilterbyStave?.filter(
      (itm) => itm["default-x"] === notes["default-x"]
    );
    value = data?.map((ilm) => {
      const steps = ilm.pitch.step;
      const octaves = ilm.pitch.octave;
      const noteKey = `${steps}/${octaves}`;
      return noteKey;
    });
  }
  const typeChecker = (type) => {
    //convert the type note
    switch (type) {
      case "eighth":
        return "8";
      case "quarter":
        return "q";
      case "16th":
        return "16";
      case "32nd":
        return "32";
      case "whole":
        return "w";
      case "half":
        return "h";
      case "64th":
        return "h";
      default:
        return "8";
    }
  };

  if (!staves) {
    if (notes?.pitch?.step) {
      if (notes?.grace || notes?.grace === "") {
        //To show Grace note
        const step = notes?.pitch?.step;
        const octave = notes?.pitch?.octave;
        const noteKey = `${step}/${octave}`;
        const restDuration = notes?.type?._ ? notes?.type?._ : notes.type;
        var graceNote = new GraceNote({
          slash: notes?.grace?.slash === "yes" ? true : false,
          keys: [noteKey],
          duration: restDuration ? typeChecker(restDuration) : "8",
        });
        return graceNote;
      } else {
        //To show simnple note
        const restDuration = notes?.type?._ ? notes?.type?._ : notes.type;
        const step = notes.pitch.step;
        const octave = notes.pitch.octave;
        const accidental = notes.pitch.accidental || "n";
        const noteKey = `${step}/${octave}`;
        const staveNote = new StaveNote({
          clef: clef ? clef : "treble",
          keys: value?.length !== 0 ? [...value, noteKey] : [noteKey],
          stem_direction:
            notes?.stem === "down" || notes?.stem?._ === "down" ? -1 : 1,
          duration: restDuration ? typeChecker(restDuration) : "8",
          dots: 2,
        });
        return staveNote;
      }
    } else {
      //To show res note
      const step = notes?.rest["display-step"];
      const octave = notes?.rest["display-octave"];
      const noteKey = `${step}/${octave}`;
      const restDuration = notes?.type?._ ? notes?.type?._ : notes.type;
      const staveNote = new StaveNote({
        clef: clef ? clef : "treble",
        keys: notes?.rest["display-step"] ? [noteKey] : ["b/4"],
        duration: restDuration ? typeChecker(restDuration) + "r" : "qr",
        dots: 1,
      });
      return staveNote;
    }
  } else {
    if (parseInt(notes?.staff) === i) {
      //when we have multiple stave
      if (notes?.pitch?.step) {
        if (notes?.grace || notes?.grace === "") {
          const restDuration = notes?.type?._ ? notes?.type?._ : notes.type;
          const step = notes?.pitch?.step;
          const octave = notes?.pitch?.octave;
          const noteKey = `${step}/${octave}`;
          var graceNote = new GraceNote({
            slash: notes?.grace?.slash === "yes" ? true : false,
            keys: [noteKey],
            duration: restDuration ? typeChecker(restDuration) : "8",
          });
          return graceNote;
        } else {
          const restDuration = notes?.type?._ ? notes?.type?._ : notes.type;
          const step = notes.pitch.step;
          const octave = notes.pitch.octave;
          const accidental = notes.pitch.accidental || "n";
          const noteKey = `${step}/${octave}`;
          const staveNote = new StaveNote({
            clef: clef ? clef : "treble",
            keys: value?.length !== 0 ? [...value, noteKey] : [noteKey],
            stem_direction:
              notes?.stem === "down" || notes?.stem?._ === "down" ? -1 : 1,
            duration: restDuration ? typeChecker(restDuration) : "8",
            dots: 1,
          });
          return staveNote;
        }
      } else {
        const step = notes?.rest["display-step"];
        const octave = notes?.rest["display-octave"];
        const noteKey = `${step}/${octave}`;
        const restDuration = notes?.type?._ ? notes?.type?._ : notes.type;
        const staveNote = new StaveNote({
          clef: clef ? clef : "treble",
          keys: notes?.rest["display-step"]
            ? [noteKey]
            : clef === "treble"
            ? ["b/4"]
            : ["c/3"],
          duration: restDuration ? typeChecker(restDuration) + "r" : "wr",
          dots: 1,
        });
        return staveNote;
      }
    }
  }
};
