import { Alert } from "react-native";
var RNFS = require("react-native-fs");
const parseString = require("react-native-xml2js").parseString;
// function parseXML(xmlString) {
//   const result = {};
//   const regex = /<(\w+)([^>]*)>(.*?)<\/\1>/gs;

//   let match;
//   while ((match = regex.exec(xmlString)) !== null) {
//     const [, tagName, attributes, innerText] = match;
//     console.log("<====matchmatchmatchmatch", tagName, attributes, innerText);
//     console.log("<====matchmatchmatchmatch22222", match);
//     const node = {
//       attributes: parseAttributes(attributes),
//       text: innerText.trim(),
//     };

//     if (!result[tagName]) {
//       result[tagName] = node;
//     } else {
//       if (!Array.isArray(result[tagName])) {
//         result[tagName] = [result[tagName]];
//       }
//       result[tagName].push(node);
//     }
//   }
//   console.log(result, "<====resultresultresultresult222");
//   // Object?.keys(result)?.map((itm) => {
//   //   console.log(itm, "<lsdksajbdsahvd");
//   //   if (Array?.isArray(result[itm])) {
//   //     result[itm]?.map((ilm) => {
//   //       console.log(ilm, "<====ilalnskkbjdasdbasjdsbak");
//   //       parseXML(ilm?.text);
//   //     });
//   //   } else if (result[itm]?.text) {
//   //     parseXML(result[itm]?.text);
//   //   }
//   // });
//   console.log(result, "<====resultresultresultresult");
//   return result;
// }

// function parseAttributes(attributesString) {
//   const attributes = {};
//   const regex = /(\w+)="([^"]*)"/g;

//   let match;
//   while ((match = regex.exec(attributesString)) !== null) {
//     const [, attributeName, attributeValue] = match;
//     attributes[attributeName] = attributeValue;
//   }

//   console.log(attributes, "<===attributesattributesattributes");
//   return attributes;
// }

// const parseXml = (xmlString) => {
//   const result = {};
//   const stack = [];
//   let currentObject = result;

//   for (let i = 0; i < xmlString.length; i++) {
//     if (xmlString[i] === "<") {
//       const closingTagIndex = xmlString.indexOf(">", i);
//       const tagName = xmlString.substring(i + 1, closingTagIndex);
//       console.log(
//         closingTagIndex,
//         "<=====xmlStringxmlStringxmlString",
//         tagName
//       );
//       if (tagName[0] === "/") {
//         stack.pop();
//         currentObject = stack[stack.length - 1];
//       } else {
//         const newNode = { [tagName]: {} };
//         if (currentObject[tagName]) {
//           if (!Array.isArray(currentObject[tagName])) {
//             currentObject[tagName] = [currentObject[tagName]];
//           }
//           currentObject[tagName].push(newNode[tagName]);
//         } else {
//           currentObject[tagName] = newNode[tagName];
//         }

//         stack.push(currentObject);
//         currentObject = newNode[tagName];
//       }

//       i = closingTagIndex;
//     } else {
//       // Extract text content between tags
//       const closingTagIndex = xmlString.indexOf("<", i);
//       const textContent = xmlString.substring(i, closingTagIndex).trim();

//       if (textContent) {
//         currentObject["textContent"] = textContent;
//       }

//       i = closingTagIndex - 1;
//     }
//   }

//   return result;
// };

const convertMusicXMLToJson = async (musicXmlContent) => {
  try {
    const jsonData = {
      metadata: {
        // title: musicXmlContent.match(
        //   /<movement-title>(.*?)<\/movement-title>/
        // )[1],
        // composer: musicXmlContent.match(
        //   /<credit-link-credit-words>(.*?)<\/credit-link-credit-words>/
        // )[1],
        // Add more metadata fields as needed
      },
      parts: [],
    };

    const partsRegex = /<part\s+id="(.*?)">(.*?)<\/part>/gs;
    let match;
    while ((match = partsRegex.exec(musicXmlContent)) !== null) {
      console.log(match[2], "<-hgcvjbhvgftfyjghhgcfyjty");
      const partData = {
        id: match[1],
        measures: [],
      };
      // <measure number="1" width="215.…
      let directionMeasures =
        /<direction\s+placement="(.*?)">(.*?)<\/direction>(.*?)<\/direction>/gs;
      let directionMeasuress = /<direction>(.*?)<\/direction>/gs;
      console.log(
        directionMeasures.exec(match),
        "<======directionsdirectionsdirectionsdirections",
        match
      );
      // const qwer = await changeParser(directions[0]);
      //   console.log(qwer, "<======qwerqwerqwerqwerqwer");
      let directions;
      while ((directions = directionMeasures.exec(match)) !== null) {
        console.log(
          directionMeasures.exec(match),
          "<======directionsdirectionsdirectionsdirections"
        );
        const measureDatas = {
          number: directions[1],
          notes: [],
        };
        const notesRegex = /<note>(.*?)<\/note>/gs;
        let noteMatch;
        while ((noteMatch = notesRegex.exec(directions[1])) !== null) {
          const pitchMatch = /<pitch>(.*?)<\/pitch>/.exec(noteMatch[1]);
          const noteData = {
            pitch:
              pitchMatch[1].match(/<step>(.*?)<\/step>/)[1] +
              (pitchMatch[1].match(/<alter>(.*?)<\/alter>/)
                ? pitchMatch[1].match(/<alter>(.*?)<\/alter>/)[1]
                : "") +
              pitchMatch[1].match(/<octave>(.*?)<\/octave>/)[1],
            duration: noteMatch[1].match(/<duration>(.*?)<\/duration>/)[1],
            // Add more note information as needed
          };
          measureDatas.notes.push(noteData);
        }
        partData.measures.push(measureDatas);
      }
      const measuresRegex = /<measure\s+number="(.*?)">(.*?)<\/measure>/gs;
      let measureMatch;

      while ((measureMatch = measuresRegex.exec(match[2])) !== null) {
        const measureData = {
          number: measureMatch[1],
          notes: [],
        };
        console.log(measureMatch, "<=====measureMatch[2]measureMatch[2]");
        const qwer = await changeParser(measureMatch[0]);
        console.log(qwer, "<======qwerqwerqwerqwerqwer");
        const notesRegex = /<note>(.*?)<\/note>/gs;
        let noteMatch;
        console.log(
          notesRegex.exec(measuresRegex),
          "<===measureMatchmeasureMatchmeasureMatchmeasureMatch",
          notesRegex?.exec(measureMatch[2]),
          measureMatch
        );
        while ((noteMatch = notesRegex.exec(measureMatch[2])) !== null) {
          const pitchMatch = /<pitch>(.*?)<\/pitch>/.exec(noteMatch[1]);
          const noteData = {
            pitch:
              pitchMatch[1].match(/<step>(.*?)<\/step>/)[1] +
              (pitchMatch[1].match(/<alter>(.*?)<\/alter>/)
                ? pitchMatch[1].match(/<alter>(.*?)<\/alter>/)[1]
                : "") +
              pitchMatch[1].match(/<octave>(.*?)<\/octave>/)[1],
            duration: noteMatch[1].match(/<duration>(.*?)<\/duration>/)[1],
            // Add more note information as needed
          };
          measureData.notes.push(noteData);
        }

        partData.measures.push(measureData);
      }

      jsonData.parts.push(partData);
    }

    // Convert the JSON data to a string
    const jsonString = JSON.stringify(jsonData, null, 2);

    console.log(jsonString, "<jaknsdkasjd", jsonData);

    // You can use the JSON data as needed in your React Native application
  } catch (error) {
    console.error("Error converting MusicXML to JSON:", error);
  }
};
export const changeParser = (xmldata) => {
  return new Promise((resolve, reject) => {
    parseString(
      xmldata,
      {
        trim: false,
        explicitArray: false,
        explicitRoot: false,
        mergeAttrs: true,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
const parseNote = (noteElement, dir, mir) => {
  console.log(noteElement, "<=====noteElementnoteElementnoteElement");
  const isRest = noteElement.includes("rest");
  console.log(
    noteElement.match(/<step>(.*?)<\/step>/),
    noteElement.match(/<step>(.*?)<\/step>/),
    noteElement.match(/<octave>(.*?)<\/octave>/),
    noteElement,
    "<===noteElementnoteElement"
  );
  const noteData = {
    isRest,
    pitch: isRest
      ? null
      : noteElement.match(/<step>(.*?)<\/step>/)[1]
      ? noteElement.match(/<step>(.*?)<\/step>/)[1]
      : noteElement.match(/<step>(.*?)<\/step>/)[0] || 0,
    alter: isRest
      ? null
      : noteElement.match(/<alter>(.*?)<\/alter>/)?.[1]
      ? noteElement.match(/<alter>(.*?)<\/alter>/)?.[1]
      : noteElement.match(/<alter>(.*?)<\/alter>/)?.[0] || 0,
    octave: isRest
      ? null
      : noteElement.match(/<octave>(.*?)<\/octave>/)[1]
      ? noteElement.match(/<octave>(.*?)<\/octave>/)[1]
      : noteElement.match(/<octave>(.*?)<\/octave>/)[0] || 0,
    direction: dir ? dir : false,
    measure: mir ? mir : false,
    // duration: noteElement.match(/<duration>(.*?)<\/duration>/)[1]
    //   ? noteElement.match(/<duration>(.*?)<\/duration>/)[1]
    //   : noteElement.match(/<duration>(.*?)<\/duration>/)[0] || 0,
    // Add more properties as needed
  };
  if (dir) {
    console.log(noteData, "<====noteDatanoteDatanoteData");
  }
  return noteData;
};

const musicXmlToJson = async (xmlData) => {
  const jsonData = { parts: [] };
  var newData = xmlData;
  const measureRegex = /<measure.*?>([\s\S]*?)<\/measure>/g;
  const getMeasureRegex = /<measure.*?>/g;
  const noteRegex = /<note.*?>([\s\S]*?)<\/note>/g;
  const directionRegex = /<\/direction>([\s\S]*?)<direction.*?>/g;
  const getDirection = /<direction.*?>([\s\S]*?)<\/direction>/g;
  const directionRegexs =
    /<measure.*?>([\s\S]*?)<\/direction>([\s\S]*?)<direction.*?>([\s\S]*?)<\/direction>/g;
  let match;
  let match2;
  while ((match2 = directionRegex.exec(xmlData)) !== null) {
    newData = xmlData?.replace(match2[0], "");
    const getMeasureDirection = directionRegexs.exec(xmlData);
    console.log(getMeasureDirection, "<===match2match2match2");
    let getMeasure = getMeasureRegex?.exec(getMeasureDirection[0]);
    const getDirectionSpecific = getDirection?.exec(getMeasureDirection[0]);
    let newParser = "";
    if (getDirectionSpecific) {
      console.log(getDirectionSpecific, "r", getMeasureDirection[0]);
      newParser = await newMadeParser(getDirectionSpecific);
    }

    const matchrrs = getMeasure[0].match(/number="([^"]+)"/);

    console.log(matchrrs, "<=kandkjsbdsajkdbjak", match2);

    console.log(xmlData, "<====newDatanewData222r", match2);
    const directiondata = { notes: [] };
    console.log(match2, "<===matchmatchmatchmatch22222");
    const notesMatch = match2[1].match(noteRegex);
    console.log(
      notesMatch,
      "<===measureRegex.exec(xmlData)measureRegex.exec(xmlData)22",
      matchrrs
    );
    if (notesMatch) {
      notesMatch.forEach((noteElement) => {
        const noteData = parseNote(noteElement, newParser, matchrrs[1]);
        directiondata.notes.push(noteData);
      });
    }
    console.log(directiondata, "<===measureDatameasureData222");
    jsonData.parts.push(directiondata);
  }

  // while ((match = measureRegex.exec(newData)) !== null) {
  //   const measureData = { notes: [] };

  //   let newMatch = getMeasureRegex.exec(match[0]);

  //   let makeanewdata = getMeasureRegex?.exec(match[0]);
  //   console.log(newMatch, "<====newDatanewDatanewData", makeanewdata);
  //   const matchrr = makeanewdata[0].match(/number="([^"]+)"/);

  //   console.log(matchrr, "<=sadnsajkdbasdkjb");
  //   const notesMatch = match[1].match(noteRegex);
  //   console.log(
  //     notesMatch,
  //     "<===measureRegex.exec(xmlData)measureRegex.exec(xmlData)"
  //   );
  //   if (notesMatch) {
  //     notesMatch.forEach((noteElement) => {
  //       const noteData = parseNote(noteElement, false, matchrr[1]);
  //       measureData.notes.push(noteData);
  //     });
  //   }
  //   console.log(measureData, "<===measureDatameasureData");
  //   jsonData.parts.push(measureData);
  // }

  return jsonData;
};
export const parseMusicXML = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const xmlData = await response.text();

    // const matches = await musicXmlToJson(xmlData);
    // console.log(matches, "<====matchesmatchesmatchesmatches");
    // const jsonData = parseXML(xmlData);

    return new Promise((resolve, reject) => {
      parseString(
        xmlData,
        {
          trim: false,
          explicitArray: false,
          explicitRoot: false,
          mergeAttrs: true,
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw new Error(`Error fetching MusicXML: ${error}`);
  }
};
const newMadeParser = (xmlData) => {
  try {
    return new Promise((resolve, reject) => {
      parseString(
        xmlData,
        {
          trim: false,
          explicitArray: false,
          explicitRoot: false,
          mergeAttrs: true,
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw new Error(`Error fetching MusicXML: ${error}`);
  }
};
