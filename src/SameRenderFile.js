import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ReactNativeSVGContext,
  NotoFontPack,
} from "standalone-vexflow-context";
import {
  Articulation,
  BarNote,
  Clef,
  Formatter,
  PedalMarking,
  Stave,
  StaveHairpin,
  Tuplet,
  Voice,
} from "vexflow";
import { convertClef } from "./utils/CommonConverstion";
import { getKeySignature } from "./Components/TimeSignature";
import { KeySignature } from "./Components/KeySignature";
import { ShowStaveNote } from "./Components/ShowStaveNote";
import { dotNotation } from "./Components/dotNotation";
import { showArticulation } from "./Components/showArticulation";
import { beamCreation, showBeam } from "./Components/showBeam";
import { showSlur, slurCreation } from "./Components/showSlur";
import { showFermata } from "./Components/showFermata";
import { showAccidental } from "./Components/showAccidental";
import { DetectPedal } from "./Components/showPedal";
import { showArpeggiate } from "./Components/showArpeggiate";
import { graceNotation } from "./Components/graceNotation";
import { DynamicNotation } from "./Components/DynamicNotation";

const SameRenderFile = ({ itm }) => {
  const measure = itm?.measure;

  var stavelIne = []; //create array for staves
  var long = 0;
  let width = 0;
  itm?.measure?.map((space) => {
    width = width + parseInt(space?.width ? space?.width : 1000);
  });
  console.log(JSON.stringify(itm), "<===widthwidth");
  const mainAttributes = measure[0]?.attributes;

  const haveStaves = mainAttributes?.[0]?.staves
    ? true
    : mainAttributes?.staves
    ? true
    : false;
  const staves = Array?.isArray(mainAttributes)
    ? mainAttributes?.[0]?.staves
    : mainAttributes?.staves
    ? mainAttributes?.staves
    : "1";
  const loopInter = staves ? parseInt(staves) : 1; // to check stave is one or multiple

  //to define the height and width of stave
  const context = new ReactNativeSVGContext(NotoFontPack, {
    width: 10000,
    height: loopInter * 230,
  });
  let clef = "";

  //loop for create staves
  for (let i = 1; i <= loopInter; i++) {
    stavelIne?.push(new Stave(10, i * 100, width + 5000));
    long = 0;
    if (haveStaves) {
      // this condition work for multiple staves
      if (Array?.isArray(mainAttributes)) {
        stavelIne[i - 1].setClef(
          convertClef(mainAttributes[0]?.clef[i - 1]?.sign)
        );
        clef = convertClef(mainAttributes[0]?.clef[i - 1]?.sign);
        long = long + 2;
      } else {
        // convertclef if more then on staves
        stavelIne[i - 1].setClef(
          convertClef(mainAttributes?.clef[i - 1]?.sign)
        );
        clef = convertClef(mainAttributes?.clef[i - 1]?.sign);
        long = long + 2;
      }
    } else {
      // convertclef if there is one stave
      stavelIne[i - 1].setClef(convertClef(mainAttributes?.clef?.sign));
      clef = convertClef(mainAttributes?.clef?.sign);
    }

    stavelIne[i - 1]?.setContext(context)?.draw(); //to draw the stave

    let arr = [];
    let correctBeam = {};
    var getBeam = [];
    var tuppleArr = [];
    var slurArr = [];
    let pedalMarking = [];
    let pedalTYpe = 0;
    let voices = [];
    let beamArr = {};
    var getSlurNo = [];
    var correctSlur = {};
    var wedgeFinalArray = [];
    measure?.forEach((notes, index) => {
      let pedal = [];
      var tupple = [];
      var currentTupple = [];
      var newSlur = [];
      var NewClef = "";
      var ClefNumber = 0;
      var staveNumber = 0;
      var wedgeValue = false;
      var wedgeArray = [];
      if (notes?.attributes) {
        getKeySignature(notes?.attributes, stavelIne[i - 1]); //get keysignature
        KeySignature(notes?.attributes, stavelIne[i - 1]); //show keysignature
      }
      if (notes?.direction) {
        const dynamics = DynamicNotation(notes);
        if (dynamics?.value === "wedge") {
          wedgeValue = dynamics;
        }
        console.log(dynamics, "<====dynamicsdynamicsdynamics");
      }
      if (notes?.direction && i === 2) {
        //to detect pedals
        if (Array.isArray(notes?.direction)) {
          const anotherPedal = DetectPedal(notes);
          if (anotherPedal) {
            const newdata = anotherPedal.filter(function (element) {
              return element !== undefined;
            });
            if (newdata?.length !== 0) {
              pedal?.push(true);
              pedalTYpe = newdata[0]?.line;
            }
          }
        }
      }
      if (notes?.attributes) {
        //to get clef and multiple clef in single stave
        if (Array?.isArray(notes?.attributes) && index === 0) {
          ClefNumber = parseInt(notes?.attributes[1]?.clef?.line);
          NewClef = convertClef(notes?.attributes[1]?.clef?.sign);
          staveNumber = parseInt(notes?.attributes[1]?.clef?.number);
        } else {
          if (Array?.isArray(notes?.attributes?.clef) && index !== 0) {
            const findRightData = notes?.attributes?.clef?.filter(
              (itm) => parseInt(itm?.number) === i
            );
            ClefNumber = parseInt(findRightData[0]?.line);
            NewClef = convertClef(findRightData[0]?.sign);
            staveNumber = parseInt(findRightData[0]?.number);
          } else if (!Array?.isArray(notes?.attributes?.clef)) {
            ClefNumber = parseInt(notes?.attributes?.clef?.line);
            NewClef = convertClef(notes?.attributes?.clef?.sign);
            staveNumber = parseInt(notes?.attributes?.clef?.number);
          }
        }
      }

      function showNotation(NewClef) {
        //to show the notation when we have multiple clefs
        stavelIne[i - 1]?.setContext(context)?.draw();
        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.setStrict(false);
        voice.addTickables(arr);
        long = long + arr?.length;
        const formatter = new Formatter()
          .joinVoices([voice])
          .format([voice], arr?.length * 100);
        voice.draw(context, stavelIne[i - 1]);
        const pedals = new PedalMarking(pedalMarking);
        pedals.setContext(context).draw();
        pedalMarking = [];
        const newBeam = beamCreation(beamArr);
        const newSlur = slurCreation(slurArr);
        newSlur?.map((itm) => {
          itm.setContext(context).draw(); //display the slue
        });
        newBeam?.map((itm) => {
          itm?.setContext(context)?.draw(); //display the beam
        });

        beamArr = [];
        slurArr = [];
        stavelIne[i - 1] = new Stave(long * 100, i * 100, 12000);
        stavelIne[i - 1]?.setContext(context)?.draw();
        stavelIne[i - 1]?.setClef(NewClef);
        clef = NewClef;
        return "completed";
      }

      if (Array?.isArray(notes?.note)) {
        const filterNotesArr = notes?.note?.filter((itm) => itm?.chord === "");
        const nonChordArr = notes?.note?.filter((itm) => itm?.chord !== "");
        nonChordArr?.forEach((noteOrRest, indexs) => {
          const data = ShowStaveNote(
            noteOrRest,
            i,
            haveStaves,
            clef,
            filterNotesArr
          );
          if (indexs)
            console.log(
              indexs + 1,
              nonChordArr?.length,
              "<==asdasdsadsacascas"
            );
          if (
            ClefNumber - 1 === indexs &&
            staveNumber === i &&
            ClefNumber !== 0
          ) {
            ClefNumber = 0;
            const key = showNotation(NewClef, i);
            if (key === "completed") {
              arr = [];
            }
          }
          if (data === undefined) {
          }
          if (data && noteOrRest?.chord !== "") {
            if (noteOrRest?.dot === "") {
              dotNotation(data); //to show the dot notation
            }
            if (noteOrRest?.grace) {
              graceNotation(data, noteOrRest?.grace); //to show the grace notation
            }
            if (pedal?.includes(true)) {
              pedalMarking?.push(data); //push the pedal marking's noation data into array
            }
            if (noteOrRest?.notations?.fermata) {
              showFermata(data); //to show the fermata notation
            }
            if (wedgeValue) {
              wedgeArray = [...wedgeArray, data];
              console.log(
                wedgeArray,
                "<===wedgeValuewedgeValue",
                nonChordArr?.length
              );
            }

            //to check the articulations available or not
            if (noteOrRest?.notations?.articulations) {
              showArticulation(noteOrRest, data); //to show the articulation notation
            }
            if (noteOrRest?.accidental) {
              showAccidental(noteOrRest?.accidental, data); //to show the accidental notation
            }

            //to check the beam available or not
            if (noteOrRest?.beam) {
              const beam = showBeam(noteOrRest);
              if (noteOrRest?.beam) {
                if (!Array?.isArray(noteOrRest?.beam)) {
                  if (beam?.name === "begin") {
                    //to check beam when its start
                    correctBeam = {
                      ...correctBeam,
                      [noteOrRest?.beam?.number]: [data],
                    };
                    getBeam?.push(noteOrRest?.beam?.number);
                  } else if (beam?.name === "continue") {
                    //to check beam when its continue
                    correctBeam = {
                      ...correctBeam,
                      [noteOrRest?.beam?.number]: [
                        ...correctBeam[noteOrRest?.beam?.number],
                        data,
                      ],
                    };
                  } else {
                    //to check beam when its end
                    correctBeam = {
                      ...correctBeam,
                      [noteOrRest?.beam?.number]: [
                        ...correctBeam[noteOrRest?.beam?.number],
                        data,
                      ],
                    };
                    if (
                      Object?.keys(beamArr)?.includes(noteOrRest?.beam?.number)
                    ) {
                      beamArr = {
                        ...beamArr,
                        [noteOrRest?.beam?.number]: [
                          ...beamArr[noteOrRest?.beam?.number],
                          correctBeam[noteOrRest?.beam?.number],
                        ],
                      };
                    } else {
                      beamArr = {
                        ...beamArr,
                        [noteOrRest?.beam?.number]: [
                          correctBeam[noteOrRest?.beam?.number],
                        ],
                      };
                    }

                    correctBeam = {
                      ...correctBeam,
                      [noteOrRest?.beam?.number]: [],
                    };

                    const newBeamData = getBeam?.filter(
                      (itm) => itm !== noteOrRest?.beam?.number
                    );
                    getBeam = newBeamData;
                  }
                } else {
                  let newbeam = beam.filter(function (element) {
                    return element !== undefined;
                  });

                  // this condition applied when beam is coming in as ARRAY
                  newbeam?.map((itm) => {
                    if (itm?.name === "begin") {
                      //to check beam when its start
                      getBeam?.push(newbeam?.number);
                      correctBeam = {
                        ...correctBeam,
                        [itm?.number]: [data],
                      };
                    } else if (itm?.name === "continue") {
                      //to check beam when its continue
                      correctBeam = {
                        ...correctBeam,
                        [itm?.number]: [...correctBeam[itm?.number], data],
                      };
                    } else {
                      //to check beam when its end
                      correctBeam = {
                        ...correctBeam,
                        [itm?.number]: [...correctBeam[itm?.number], data],
                      };
                      if (Object?.keys(beamArr)?.includes(itm?.number)) {
                        beamArr = {
                          ...beamArr,
                          [itm?.number]: [
                            ...beamArr[itm?.number],
                            correctBeam[itm?.number],
                          ],
                        };
                      } else {
                        beamArr = {
                          ...beamArr,
                          [itm?.number]: [correctBeam[itm?.number]],
                        };
                      }

                      correctBeam = {
                        ...correctBeam,
                        [itm?.number]: [],
                      };
                      const newBeamData = getBeam?.filter(
                        (itm) => itm !== itm?.number
                      );
                      getBeam = newBeamData;
                    }
                  });
                }
              }
            }

            // to check the arpeggiate notation
            if (noteOrRest?.notations?.arpeggiate) {
              showArpeggiate(data); // to show the arpeggiate notation
            }

            // to check the tuplet notation
            if (noteOrRest?.notations?.tuplet) {
              if (noteOrRest?.notations?.tuplet?.type === "start") {
                //to check tuplet when its start
                currentTupple?.push(data);
              } else {
                //to check tuplet when its end
                currentTupple?.push(data);
                tupple?.push(currentTupple);
                currentTupple = [];
              }
            }

            //to check the slur available or not
            if (noteOrRest?.notations?.slur) {
              const slur = showSlur(noteOrRest);
              if (!Array?.isArray(slur)) {
                //to condition is when slur is in object
                if (!getSlurNo?.includes(noteOrRest?.notations?.slur?.number)) {
                  //to check when slur is start
                  getSlurNo = [
                    ...getSlurNo,
                    noteOrRest?.notations?.slur?.number,
                  ];
                  const getSlur = [data];
                  correctSlur = {
                    ...correctSlur,
                    [noteOrRest?.notations?.slur?.number]: getSlur,
                  };
                } else if (
                  //to check when slur is stop
                  getSlurNo?.includes(noteOrRest?.notations?.slur?.number) &&
                  arr?.length !== 0 &&
                  slur?.type === "stop"
                ) {
                  const newSlurData = getSlurNo?.filter(
                    (itm) => itm !== noteOrRest?.notations?.slur?.number
                  );
                  getSlurNo = newSlurData;

                  newSlur = [
                    ...newSlur,
                    [...correctSlur[noteOrRest?.notations?.slur?.number], data],
                  ];

                  correctSlur = {
                    ...correctSlur,
                    [noteOrRest?.notations?.slur?.number]: [],
                  };
                }
              } else {
                //to condition is for when slur is in array
                noteOrRest?.notations?.slur?.map((ilm) => {
                  if (!getSlurNo?.includes(ilm?.number)) {
                    //to check when slur is start
                    getSlurNo = [...getSlurNo, ilm?.number];
                    const getSlur = [data];
                    correctSlur = {
                      ...correctSlur,
                      [ilm?.number]: getSlur,
                    };
                  } else if (
                    //to check when slur is start
                    getSlurNo?.includes(ilm?.number) &&
                    arr?.length !== 0 &&
                    ilm?.type === "stop"
                  ) {
                    const newSlurData = getSlurNo?.filter(
                      (itm) => itm !== ilm?.number
                    );
                    getSlurNo = newSlurData;

                    newSlur = [...newSlur, [...correctSlur[ilm?.number], data]];

                    correctSlur = {
                      ...correctSlur,
                      [ilm?.number]: [],
                    };
                  }
                });
              }
            }
            arr?.push(data); // to push the stave notes into staves
            if (i == loopInter && nonChordArr?.length - 1 === index) {
              voices?.push(arr);
            }
          }
        });
      }
      console.log(
        wedgeArray,
        wedgeFinalArray,
        "<==wedgeArraywedgeArraywedgeArray"
      );
      if (wedgeArray?.length !== 0) {
        wedgeFinalArray?.push(wedgeArray);
      }
      if (newSlur?.length !== 0) {
        slurArr?.push(newSlur); //to store slur notation in array
      }
      if (tupple?.length !== 0) {
        tuppleArr?.push(tupple); // to store the tupple in array
      }
      const staveBar = new BarNote();
      arr?.push(staveBar); // to store the bar note in array
    });

    const getShowBeam = Object?.keys(beamArr)?.map((itm) => {
      return beamCreation(beamArr[itm]);
    }); //to create beams
    const finalWedgr = wedgeFinalArray?.map((itm) => {
      console.log(itm[0], itm[itm?.length - 1], "<===itm[itm?.length - 1]");
      var crescendo = new StaveHairpin(
        {
          first_note: itm[0],
          last_note: itm[itm?.length - 1],
          position: 2, // Change to BELOW for decrescendo
          height: 8, // Height of the hairpin
          y_shift: 0, // Vertical shift
        },
        1
      );

      // Draw the crescendo
      return crescendo;
    });
    const newSlur = slurCreation(slurArr); //to create slur
    const mainTuple = tuppleArr?.flat()?.map((itm) => {
      return new Tuplet(itm, {
        num_notes: 3,
        notes_occupied: 2,
      });
    });
    stavelIne?.map((itm) => {
      itm?.setContext(context)?.draw();
    });

    const voice = new Voice({ num_beats: 4, beat_value: 4 });

    voice.setStrict(false);
    voice.addTickables(arr);

    console.log(wedgeFinalArray, "<======wedgeFinalArraywedgeFinalArray");

    const formatter = new Formatter()
      .joinVoices([voice])
      .format([voice], 2000 + width); //to format the note and width is for manage the spaces

    var pedal = new PedalMarking(pedalMarking); // to create pedal marking
    console.log(pedalTYpe, "<===pedalTYpepedalTYpe");
    pedal?.setType(pedalTYpe === "yes" ? 2 : 1);

    voice.draw(context, stavelIne[i - 1]); //to draw notations
    console.log(finalWedgr, "<====finalWedgrfinalWedgr");
    finalWedgr?.map((itm) => {
      itm.setContext(context).draw();
      // console.log(itm, "<===itmitm");
      // itm.setRenderOptions({
      //   height: 8,
      //   vo: voice,
      // });
      // itm?.setContext(context)?.draw();
    });
    newSlur?.map((itm) => {
      itm.setContext(context).draw(); //to draw the slue
    });
    mainTuple?.map((ilm) => {
      ilm.setContext(context).draw(); //to draw the beam notation
    });
    getShowBeam?.map((itm) => {
      itm?.map((ilm) => {
        ilm?.setContext(context)?.draw(); //to draw the beam notation
      });
    });
    pedal.setContext(context).draw(); //to draw pedals
  }

  return (
    <View>
      <ScrollView
        style={{
          marginTop: haveStaves ? 20 : 70,
          backgroundColor: haveStaves ? "skyblue" : "pink",
        }}
        horizontal={true}
      >
        {context?.render()}
      </ScrollView>
    </View>
  );
};

export default SameRenderFile;
