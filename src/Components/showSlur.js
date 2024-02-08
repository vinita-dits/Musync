import { StaveTie } from "vexflow";

export const showSlur = (noteOrRest) => {
  if (noteOrRest?.notations?.slur) {
    if (!Array?.isArray(noteOrRest?.notations?.slur)) {
      // this condition is for when slur come in object
      if (noteOrRest?.notations?.slur?.type === "start") {
        return {
          type: "start", //start the slur
        };
      } else {
        return {
          type: "stop", //stop the slur
        };
      }
    } else {
      // this condition is for when slur come in array
      const rightData = noteOrRest?.notations?.slur?.map((itm) => {
        if (itm?.type === "start") {
          return {
            type: "start",
            number: itm?.number,
          }; //start the slur
        } else {
          return {
            type: "stop",
            number: itm?.number,
          }; //stop the slur
        }
      });
      return rightData;
    }
  }
};

export const showTie = (noteOrRest) => {
  if (noteOrRest?.notations?.tied) {
    if (noteOrRest?.notations?.tied?.type === "start") {
      return {
        type: "start",
      };
    } else {
      return {
        type: "stop",
      };
    }
  }
};

export const slurCreation = (slurArr) => {
  return slurArr?.flat()?.map((itm) => {
    return new StaveTie({
      first_note: itm[0],
      last_note: itm[1],
      first_indices: [0],
      last_indices: [0],
    });
  });
};
