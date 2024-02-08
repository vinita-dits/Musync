import { Beam } from "vexflow";

export const ShowBeam = (noteBeam) => {
    if (Array.isArray(noteBeam?.beam)) {
        const newBeamData = noteBeam?.beam?.map((beamStatus, index) => {
            if (beamStatus?._ === "begin"||beamStatus?._ === "end"||beamStatus?._ === "continue") {
                return {
                    name: beamStatus._,
                    data: noteBeam,
                    number: beamStatus.number
                };
            }
            return null;
        });
        return newBeamData;
    } else {
        if (noteBeam.beam?._ === "end"||noteBeam.beam?._ === "begin"||noteBeam.beam?._ === "continue") {
            return {
                name: noteBeam.beam?._,
                data: noteBeam
            }
        }
      
    }

}
export const beamCreation=(beamArr)=>{
if(Object.keys(beamArr).length!==0){
    const filteredItem=beamArr?.filter((itm)=>itm.length>=2);
    return filteredItem.map((itm)=>{
        return new Beam(itm);
    })
}else{
    return [];
}
}