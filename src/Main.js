/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  LogBox,
  ActivityIndicator,
  Text,
} from "react-native";
import { parseMusicXML } from "./utils/musicXmlParser";
import SameRenderFile from "./SameRenderFile";
import RenderFile from "./RenderFile";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
const Main = ({ uri }) => {
  const [score, setScore] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    console.log('Uri***',uri);
    if (uri) {
      fetchData(uri);
    }
  }, [uri]);

  const fetchData = async () => {
    try {
      //to convert MusicXML file into JSON
      const result = await parseMusicXML(uri);
      setName(result);
      console.log(JSON.stringify(result), "<====resultresultresult");
      setScore(result?.part);
    } catch (error) {
      console.error("Error parsing MusicXML:", error);
    }
  };
  if (!score) {
    return (
      <View>
        {/* to show the indicator while loading MusicXML file */}
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        <View
          style={{
            backgroundColor: "aqua",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          {name?.identification?.creator &&
            Array?.isArray(name?.identification?.creator) &&
            name?.identification?.creator?.map((itm) => {
              {
                console.log(itm, "<asudnklasndsaiubyd");
              }
              return (
                <Text style={{ fontSize: 20 }}>
                  {itm?.type + "    " + itm?._}
                </Text>
              );
            })}
          <Text style={{ fontSize: 20 }}>{name?.identification?.rights}</Text>
          <View>
            <Text style={{ fontSize: 20 }}>
              {name?.["movement-title"]
                ? name?.["movement-title"]
                : name?.work["work-title"]}
            </Text>
          </View>
        </View>
        {Array?.isArray(score) ? (
          score?.map((itm) => {
            return <SameRenderFile itm={itm} />;
          })
        ) : (
          <SameRenderFile itm={score} />
        )}
      </ScrollView>
    </>
  );
};

export default Main;
