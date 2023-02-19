import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const MeloMRT = () => {
  const metroStations = [
    { id: 1, name: '台北', x: 20, y: 20 },
    { id: 2, name: '新竹', x: 150, y: 50 },
    { id: 3, name: '花蓮', x: 100, y: 100 },
  ];

  const metroLines = [
    { id: 1, color: '#FF5733', stations: [1, 2] },
    { id: 2, color: '#5BC0EB', stations: [2, 3] },
  ];

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%">
        {metroLines.map(line => (
          <Path
            key={line.id}
            d={`M${metroStations[line.stations[0] - 1].x},${metroStations[line.stations[0] - 1].y} L${metroStations[line.stations[1] - 1].x},${metroStations[line.stations[1] - 1].y}`}
            stroke={line.color}
            strokeWidth={5}
            fill="none"
          />
        ))}

        {metroStations.map(station => (
          <Circle
            key={station.id}
            cx={station.x}
            cy={station.y}
            r={10}
            stroke="#000000"
            strokeWidth={3}
            fill="#FFFFFF"
          />
        ))}
      </Svg>

      {metroStations.map(station => (
        <View key={station.id} style={[styles.stationLabel, { left: station.x, top: station.y }]}>
          <Text style={styles.stationLabelText}>{station.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  stationLabel: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000000',
    zIndex: 1,
  },
  stationLabelText: {
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'center',
  },
  });

export default MeloMRT;



