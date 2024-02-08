import { GraceNote, StaveNote } from "vexflow";
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
export const ShowNote=(itm)=>{
    if (itm.grace || itm.grace === '') {
        const step = itm.pitch ? itm.pitch.step : itm?.rest["display-step"];
        const octave = itm.pitch ? itm.pitch.octave : itm?.rest["display-octave"];
        // console.log('grace===>', itm, `${step}/${octave}`);
        const noteKey = step ? `${step}/${octave}` : "c/4";
        const restDuration = itm?.type?._ ? itm?.type?._ : itm.type;
        const graceNote = new GraceNote({
            slash: itm.grace.slash === "yes" ? true : false,
            keys: [noteKey],
            duration: restDuration ? typeChecker(restDuration) : "8",
        })
        // arr.push(graceNote);
        return graceNote

    } else {
        const step = itm.pitch ? itm.pitch.step : itm?.rest["display-step"];
        const octave = itm.pitch ? itm.pitch.octave : itm?.rest["display-octave"];
        // console.log('ITEM===>', itm, `${step}/${octave}`,"stm_direct",itm?.stem==="up"||itm?.stem?._==="up"? 1:-1);
        const noteKey = step ? `${step}/${octave}` : "b/4";
        const restDuration = itm?.type?._ ? itm?.type?._ : itm.type;
        const staveNote = new StaveNote({
            clef: "treble",
            keys: [noteKey],
            duration: restDuration ? typeChecker(restDuration) : "qr",
            dots: 2,
            stem_direction: itm?.stem === "up" || itm?.stem?._ === "up" ? 1 : -1, // 1 for up, -1 for down
        })
        // arr.push(staveNote);
        return staveNote;
    }
}