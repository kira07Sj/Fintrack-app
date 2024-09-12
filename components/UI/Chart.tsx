import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const Chart = ({ data, radius = 100, strokeWidth = 0 }) => {
  // Helper function to calculate the arcs for the chart
  const calculateArcs = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    return data.map((item) => {
      const arcSweep = (item.value / total) * 360;
      const endAngle = startAngle + arcSweep;
      const largeArcFlag = arcSweep > 180 ? 1 : 0;

      const startX = radius + radius * Math.cos((Math.PI * startAngle) / 180);
      const startY = radius + radius * Math.sin((Math.PI * startAngle) / 180);
      const endX = radius + radius * Math.cos((Math.PI * endAngle) / 180);
      const endY = radius + radius * Math.sin((Math.PI * endAngle) / 180);

      const pathData = [
        `M ${radius},${radius}`,
        `L ${startX},${startY}`,
        `A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`,
        'Z',
      ].join(' ');

      startAngle = endAngle;
      return { pathData, color: item.color, label: item.label, value: item.value };
    });
  };

  const arcs = calculateArcs(data);

  return (
    <View style={styles.container}>
      <Svg style={styles.chart} width={radius * 2} height={radius * 2}>
        <G>
          {arcs.map((arc, index) => (
            <Path key={index} d={arc.pathData} fill={arc.color} stroke="white" strokeWidth={strokeWidth} />
          ))}
        </G>
      </Svg>
      <View style={styles.labelsContainer}>
        {arcs.map((arc, index) => (
          <Text key={index} style={[styles.label, { color: arc.color }]}>
            {arc.label}: {arc.value} 
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width:'100%'
  },
  labelsContainer: {
    marginTop: 20,
    width:'80%'
    
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical:5
  },
  chart:
  {
    padding:10
  }
});

export default Chart;
