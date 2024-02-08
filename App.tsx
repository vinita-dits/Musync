// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import React, {useState} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';


import Main from './src/Main';
function App(): JSX.Element {
  const [uri, setUri] = useState(false);
  const selectFiles = () => {
    try { //to select the musicXML file from the device's storage
      DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      }).then(async (results: any) => {
        setUri(results?.uri);
      });
    } catch (err) { // to manage the exception
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const [isCombined, setIsCombined] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

     
      const textElement = React.createElement(Text, null, 'Hello, world!');

      // Using React.createElement for image
      const imageElement = React.createElement(Image, {
        source: {    uri: 'https://reactnative.dev/img/tiny_logo.png' },
        style: { width: 100, height: 100 }
      });
      const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 1);
      };
      const handleZoomOut = () => {
        if (zoomLevel > 1) {
          setZoomLevel(zoomLevel - 1);
        }
      };
      const images = [
        'https://reactnative.dev/img/tiny_logo.png',
        'https://reactnative.dev/img/tiny_logo.png',
        'https://reactnative.dev/img/tiny_logo.png',
        'https://reactnative.dev/img/tiny_logo.png'
      ];
      const windowWidth = Dimensions.get('window').width;
      const imageWidth = windowWidth / (1 * zoomLevel);
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={selectFiles}>
        <Text> click me</Text>
      </TouchableOpacity>
      {uri && <Main uri={uri} />}
       {/* {textElement} */}
      
      {/* {imageElement}  */}
     {/* <View style={{flexDirection: 'column',
    alignItems: 'center'}}>
      <View style={styles.imageContainer}>
        {images.map((imageUrl, index) => (
          <Image
            key={index}
            source={{ uri: imageUrl }}
            resizeMode='contain'
            style={[styles.image, { width: imageWidth }]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleZoomIn}>
        <Text>Zoom In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleZoomOut}>
        <Text>Zoom Out</Text>
      </TouchableOpacity>
    </View> */}
      
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop:90
    },
    block: {
      backgroundColor: 'black',
      width: '80%',
      height: 30,
      marginVertical: 5,
    },
    button: {
      backgroundColor: 'lightgray',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    image: {
      height: 100,
      margin: 5
    }
});
