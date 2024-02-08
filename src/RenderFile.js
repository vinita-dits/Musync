import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
    ReactNativeSVGContext,
    NotoFontPack,
} from "standalone-vexflow-context";
// import {
//   Articulation,
//   BarNote,
//   Clef,
//   Formatter,
//   PedalMarking,
//   StaveHairpin,
//   Tuplet,
// } from "vexflow";
import { convertClef } from "./utils/CommonConverstion";
import { getKeySignature } from "./Components/TimeSignature";
import { KeySignature } from "./Components/KeySignature";
import { ShowStaveNote } from "./Components/ShowStaveNote";
import { dotNotation } from "./Components/dotNotation";
import { showArticulation } from "./Components/showArticulation";
// import { beamCreation, showBeam } from "./Components/showBeam";
import { showSlur, slurCreation } from "./Components/showSlur";
import { showFermata } from "./Components/showFermata";
import { showAccidental } from "./Components/showAccidental";
import { DetectPedal } from "./Components/showPedal";
import { showArpeggiate } from "./Components/showArpeggiate";
import { graceNotation } from "./Components/graceNotation";
import { DynamicNotation } from "./Components/DynamicNotation";
import { Beam, Formatter, GraceNote, Stave, StaveNote, Tuplet, Voice } from "vexflow";
import { ShowBeam, beamCreation } from "./Components/BeamShow";
import { ShowNote } from "./Components/StaveNote";
// import { StaveNote } from "./Components/StaveNote";

const RenderFile = ({ itm }) => {
    const context = new ReactNativeSVGContext(NotoFontPack, {
        width: 10000,
        height: 200,
    });
    const measure = itm?.measure;

    var stavelIne = []; //create array for staves
    var long = 0;
    let width = 0;
    itm?.measure?.map((space) => {
        width = width + parseInt(space?.width ? space?.width : 1000);
    });
    const convertClef = (type) => {
        switch (type) {
            case 'G':
                return "treble";
            case 'F':
                return "bass";
            case 'C':
                return "auto";
            default:
                "treble";
        }
    }
    // console.log(JSON.stringify(itm), "<===widthwidth");
    const mainAttributes = measure[0]?.attributes;
    let arr = []
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
    let clefSign = "G";
    let beats = "3";
    let beatType = '4';
    if (Array.isArray(itm.measure[0].attributes)) {
        // clefSign = itm.measure[0].attributes[1].clef.sign;
        itm.measure[0].attributes.forEach(element => {
            processAttribute(element)
        });
    } else {
        processAttribute(itm.measure[0].attribute);
    }
    let combinedNotes = [];
    if (itm.measure && Array.isArray(itm.measure)) {
        for (const measure of itm.measure) {
            if (measure.note && Array.isArray(measure.note)) {
                const notesArray = measure.note;
                combinedNotes.push(...notesArray);
            }
        }
    }
    // const measure = itm?.measure;
    let correctBeam = {};
    var tuppleArr = [];
    let pedalTYpe = 0;
    var slurArr = [];
    var getBeam = [];
    let beamArr = {};
    var getSlurNo = [];
    var correctSlur = {};
    if (measure && Array.isArray(measure)) {
        let combinedValue = [];
        for (var i = 0; i < measure.length; i++) {
            // console.log(itm.measure[i],'iiiiii')
            let pedal = [];
            var newSlur = [];
            var tupple = [];
            var currentTupple = [];
            var wedgeValue = false;
            if(measure[i].direction){
                console.log('Direction**',measure[i].direction);
                const dynamics=DynamicNotation(measure[i]);
                if(dynamics?.value==="wedge"){
                    wedgeValue=dynamics;
                }
                console.log('VINITA',dynamics);
            }
            if(measure[i].direction&&i==2){
                   //to detect pedals
        if (Array.isArray(measure[i]?.direction)) {
            const anotherPedal = DetectPedal(measure[i]);
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
            if (measure[i].note.length)
                if (measure[i] && Array.isArray(measure[i].note)) {
                    measure[i].note?.map(itm => {
                        const data = ShowNote(itm);
                        arr.push(data);
                        if (itm.beam) {
                            const beam = ShowBeam(itm);
                            if (!Array.isArray(itm.beam)) {
                                if (beam.name === "begin") {
                                    correctBeam = {
                                        ...correctBeam,
                                        [itm.beam.number]: [data],
                                    };
                                    getBeam.push(itm.beam.number);
                                } else if (beam.name === "continue") {
                                    correctBeam = {
                                        ...correctBeam,
                                        [itm.beam?.number]: [
                                            ...correctBeam[itm.beam.number],
                                            data
                                        ],
                                    };
                                } else {
                                    correctBeam = {
                                        ...correctBeam,
                                        [itm.beam.number]: [
                                            ...correctBeam[itm.beam.number],
                                            data
                                        ],
                                    };
                                    if (Object?.keys(beamArr).includes(itm?.beam?.number)) {
                                        beamArr = {
                                            ...beamArr,
                                            [itm.beam.number]: [
                                                ...beamArr[itm.beam.number],
                                                correctBeam[itm.beam.number],
                                            ],
                                        };
                                    } else {
                                        beamArr = {
                                            ...beamArr,
                                            [itm.beam.number]: [
                                                correctBeam[itm.beam.number],
                                            ],
                                        };

                                    }
                                    correctBeam = {
                                        ...correctBeam,
                                        [itm.beam?.number]: [],
                                    };

                                    const newBeamFiltered = getBeam?.filter((itm) => itm !== itm?.beam?.number);
                                    getBeam = newBeamFiltered;
                                }
                                // console.log('correctBeam==>>>>????',  "beamArr==>>", JSON.stringify(beamArr));

                            } else {
                                const newBeam = beam.filter(function (element) {
                                    return element !== null;
                                });
                                newBeam.map((newBeamItem) => {
                                    if (newBeamItem.name === "begin") {
                                        getBeam?.push(newBeam?.number);
                                        correctBeam = {
                                            ...correctBeam,
                                            [newBeamItem.number]: [data]
                                        }
                                    } else if (newBeamItem.name === "continue") {
                                        correctBeam = {
                                            ...correctBeam,
                                            [newBeamItem.number]: [...correctBeam[newBeamItem.number], data],
                                        };
                                    } else {
                                        correctBeam = {
                                            ...correctBeam,
                                            [newBeamItem.number]: [...correctBeam[newBeamItem.number], data],
                                        };
                                        if (Object?.keys(beamArr).includes(newBeamItem.number)) {
                                            beamArr = {
                                                ...beamArr,
                                                [newBeamItem.number]: [
                                                    ...beamArr[newBeamItem.number],
                                                    correctBeam[newBeamItem.number],
                                                ],
                                            };
                                        } else {
                                            beamArr = {
                                                ...beamArr,
                                                [newBeamItem.number]: [
                                                    correctBeam[newBeamItem.number],
                                                ],
                                            };
                                        }
                                        correctBeam = {
                                            ...correctBeam,
                                            [newBeamItem?.number]: [],
                                        };
                                        const newBeamFiltered = getBeam?.filter((itm) => itm !== newBeamItem?.number);
                                        getBeam = newBeamFiltered;
                                    }
                                    // console.log( "beamArr==999>>", beamArr);
                                })
                            }
                        }
                        //check if for the Notation;
                        if (itm.notations) {
                            if (itm.notations?.slur) {
                                const slur = showSlur(itm)
                                // console.log('slur*****', itm.notations?.slur);
                                if (!Array?.isArray(slur)) {
                                    //to condition is when slur is in object
                                    if (!getSlurNo?.includes(itm?.notations?.slur?.number)) {
                                        //to check when slur is start
                                        getSlurNo = [
                                            ...getSlurNo,
                                            itm?.notations?.slur?.number,
                                        ];
                                        const getSlur = [data];
                                        correctSlur = {
                                            ...correctSlur,
                                            [itm?.notations?.slur?.number]: getSlur,
                                        };
                                    } else if (
                                        //to check when slur is stop
                                        getSlurNo?.includes(itm?.notations?.slur?.number) &&
                                        arr?.length !== 0 &&
                                        slur?.type === "stop"
                                    ) {
                                        const newSlurData = getSlurNo?.filter(
                                            (itm) => itm !== itm?.notations?.slur?.number
                                        );
                                        getSlurNo = newSlurData;

                                        newSlur = [
                                            ...newSlur,
                                            [...correctSlur[itm?.notations?.slur?.number], data],
                                        ];

                                        correctSlur = {
                                            ...correctSlur,
                                            [itm?.notations?.slur?.number]: [],
                                        };
                                    }
                                } else {
                                    //to condition is for when slur is in array
                                    itm?.notations?.slur?.map((ilm) => {
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
                            if(itm.notations?.articulations){
                                showArticulation(itm,data);
                            }
                            if(itm?.accidental){
                                showAccidental(itm?.accidental,data);
                            }
                            if (itm?.notations?.arpeggiate) {
                                showArpeggiate(data); // to show the arpeggiate notation
                              }
                            //to check the tuplet notation
                            if (itm.notations.tuplet) {
                                if (itm.notations.tuplet.type === "start") {
                                    currentTupple?.push(data);
                                } else {
                                    currentTupple?.push(data);
                                    tupple?.push(currentTupple);
                                    currentTupple = [];
                                }
                            }

                        }
                    })

                }

            if (newSlur?.length !== 0) {
                slurArr?.push(newSlur);
            }
            if (tupple?.length !== 0) {
                tuppleArr?.push(tupple); // to store the tupple in array
            }
        }
        const newSlurD = slurCreation(slurArr);

        const getShowBeam = Object?.keys(beamArr)?.map((item) => {
            return beamCreation(beamArr[item]);
        })
        console.log('Combined_values', combinedValue.length);
        const mainTuple = tuppleArr?.flat()?.map((itm) => {
            return new Tuplet(itm, {
                num_notes: 3,
                notes_occupied: 2,
            });
        });
        var stave = new Stave(20, 0, 1000);
        stave.addClef(convertClef(clefSign));
        stave.addTimeSignature(`${beats}/${beatType}`);
        stave.setContext(context).draw();
        var voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice?.setStrict(false)
        voice.addTickables(arr);
        var formatter = new Formatter().joinVoices([voice]).format([voice], 400);
        voice.draw(context, stave);
        getShowBeam?.map((itemSB) => {
            itemSB?.map((beam) => {
                beam?.setContext(context).draw();
            })
        })
        newSlurD?.map((itm) => {
            // console.log('ITEM===>', itm);
            itm.setContext(context).draw(); //to draw the slue
        });

        mainTuple?.map((ilm) => {
            ilm.setContext(context).draw(); //to draw the beam notation
        });

    }

    function processAttribute(attribute) {
        if (attribute && attribute.clef) {
            if (Array.isArray(attribute.clef)) {
                attribute.clef.forEach(clefElement => {
                    processClef(clefElement)
                })
            } else {
                processClef(attribute.clef)
            }
        }
        // check if attribute has time signature information
        if (attribute && attribute.time) {
            beats = attribute.time.beats;
            beatType = attribute.time["beat-type"];
        }
        if (attribute && attribute.key) {
            const key = attribute.key.fifths
        }
    }
    function processClef(clef) {
        // let clefSign;
        if (clef) {
            clefSign = clef.sign;
        }
    }
  
    return (
        <View>
            <ScrollView
                style={{
                    marginTop: haveStaves ? 20 : 70,
                    backgroundColor: haveStaves ? "skyblue" : "pink"
                }}
                horizontal={true}
            >
                {context?.render()}

            </ScrollView>
            {/* <>

                <Text>vinita</Text>
            </> */}
             

        </View>
    );
};

export default RenderFile;


//loop for create staves
