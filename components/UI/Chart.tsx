import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

// Define the type for the chart data
interface ChartData {
  label: string;
  value: number;
  color: string;
}

// Define the props for the Chart component
interface ChartProps {
  data: ChartData[];
  radius?: number;
  strokeWidth?: number;
}

const Chart: React.FC<ChartProps> = ({ data, radius = 100, strokeWidth = 0 }) => {
  // Helper function to calculate the arcs for the chart
  const calculateArcs = (data: ChartData[]) => {
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
      <View style={styles.chart}>
        <Svg width={radius * 2} height={radius * 2}>
          <G>
            {arcs.map((arc) => (
              <Path key={arc.label} d={arc.pathData} fill={arc.color} stroke="white" strokeWidth={strokeWidth} />
            ))}
          </G>
        </Svg>
        
      </View>
      <View style={styles.labelsContainer}>
        {arcs.map((arc) => (
          <View key={arc.label} style={styles.eachLabel}>
            <Text style={[styles.label, { color: arc.color }]}>
              {arc.label}:  
            </Text>

            <Text style={[styles.label, { color: arc.color }]}>
              {arc.value}  
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '100%',
  },
  labelsContainer: {
    marginTop: 15,
    paddingTop: 25,
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  eachLabel: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopColor: '#1BCA8B',
  },
  chart: {
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default Chart;
