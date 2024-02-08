import { Alert } from "react-native";

export const DynamicNotation = (measure) => {
  console.log(measure, "<====notesnotesnotesnotesnotes");
  if (Array?.isArray(measure?.direction)) {
    //   Alert?.alert("comin");
    const anotherPedal = measure?.direction?.map((itm) => {
      if (Object?.keys(itm["direction-type"])?.includes("wedge")) {
        console.log(itm["direction-type"]?.wedge, "<===jkbhvvg");
        return {
          value: "wedge",
          type: itm["direction-type"]?.wedge?.type,
          spread: itm["direction-type"]?.wedge?.spread
            ? itm["direction-type"]?.wedge?.spread
            : 0,
        };
      }
    });
    const reightData = anotherPedal.filter(function (element) {
      return element !== undefined;
    });
    return {
      type: reightData[0]?.type,
      value: reightData[0]?.value,
      spread: reightData[0]?.spread,
    };
    console.log(reightData, "<====anotherPedalanotherPedalanotherPedal");
    return anotherPedal;
  } else {
    console.log(
      measure?.direction,
      "<=====measure?.direction?measure?.direction?measure?.direction?"
    );
  }
};
