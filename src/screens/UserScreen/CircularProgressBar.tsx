import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const CircularProgressBar = ({correct,wrong,skipped,total}) => {
    console.log(correct,wrong,skipped,total,'============correct,wrong,skipped,total')
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const data = [];

  for (let i = 1; i <= correct; i++) {
    data.push({
      color: "#46DFAF",
    });
  }

  for (let i = 1; i <= wrong; i++) {
    data.push({ color: "#F47E9E" });
  }
  for (let i = 1; i <= skipped; i++) {
    data.push({ color: "#747BFF" });
  }

  const percentage = (1 / total) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  const angle = (1 / total) * 360;
  const sliceSpacing = total === 1 ? 0 : 4;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="85" width="85" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            { total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
             ) : (
               data.map((element, index) => (
                <Circle
                  key={index}
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={element.color}
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset + sliceSpacing}
                  rotation={angle * index}
                  originX="90"
                  originY="90"
                />
              ))
             )}
          </G>
        </Svg>
        {/* <Text style={styles.label}>{total}</Text> */}
      </View>
    </View>
  );
};

export default CircularProgressBar;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
    color: "#082032",
  },
});