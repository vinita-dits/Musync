export const DetectPedal = (measure) => {
  // this method is for detect the pedal and direction-type"
  const anotherPedal = measure?.direction?.map((itm) => {
    if (Object?.keys(itm["direction-type"])?.includes("pedal")) {
      console.log(itm["direction-type"], "<=asdsadsadsada");
      return {
        status: true,
        line: itm["direction-type"]?.pedal?.line,
      };
    }
  });
  return anotherPedal;
};
