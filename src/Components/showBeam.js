import { Beam } from "vexflow";

export const showBeam = (noteOrRest) => {
  if (Array?.isArray(noteOrRest?.beam)) {
    // this condition is for when the beam is come in array
    const newBeamForm = noteOrRest?.beam?.map((status) => {
      if (status?._ === "begin") {
        // to check when begin
        return {
          name: "begin",
          data: noteOrRest,
          number: status?.number,
        };
      }
      if (status?._ === "continue") {
        // to check when continue
        return {
          name: "continue",
          data: noteOrRest,
          number: status?.number,
        };
      }
      if (status?._ === "end") {
        // to check when end
        return {
          name: "end",
          data: noteOrRest,
          number: status?.number,
        };
      }
    });
    return newBeamForm;
  }
  if (!Array?.isArray(noteOrRest?.beam)) {
    // this condition is for when the beam is come in object
    if (noteOrRest?.beam?._ === "begin") {
      // to check when begin
      return {
        name: "begin",
        data: noteOrRest,
      };
    }

    if (noteOrRest?.beam?._ === "continue") {
      // to check when continue
      return {
        name: "continue",
        data: noteOrRest,
      };
    }
    if (noteOrRest?.beam?._ === "end") {
      // to check when end
      return {
        name: "end",
        data: noteOrRest,
      };
    }
  }
};
export const beamCreation = (beamArr) => {
  if (Object?.keys(beamArr)?.length !== 0) {
    const filterItem = beamArr?.filter((itm) => itm?.length >= 2);
    return filterItem?.map((itm) => {
      return new Beam(itm);
    });
  } else {
    return [];
  }
};
