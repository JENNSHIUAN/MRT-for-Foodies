import React, { useState, useRef}from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

const wengMRT = () => {
  const metroStations = [
    { id: 1, name: 'Station A', x: 20, y: 20 },
    { id: 2, name: 'Station B', x: 150, y: 50 },
    { id: 3, name: 'Station C', x: 100, y: 100 },
    { id: 4, name: 'Station D', x: 50, y: 150 },
    { id: 5, name: 'Station E', x: 200, y: 200 },
    { id: 6, name: 'Station F', x: 150, y: 250 },
  ];

  const metroLines = [
    { id: 1, color: '#FF5733', stations: [1, 2] },
    { id: 2, color: '#5BC0EB', stations: [2, 3] },
    { id: 3, color: '#FF5733', stations: [3, 4] },
    { id: 4, color: '#5BC0EB', stations: [4, 5] },
    { id: 5, color: '#FF5733', stations: [5, 6] },
  ];
 
  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = useRef();
  const panRef = useRef();

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY
    }
  }],
    { useNativeDriver: true });

  const handlePinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };



  return ( 

    <View>

      <PanGestureHandler
              onGestureEvent={onPanEvent}
              ref={panRef}
              simultaneousHandlers={[pinchRef]}
              enabled={panEnabled}
              failOffsetX={[-1000, 1000]}
              shouldCancelWhenOutside
            >
              <Animated.View>
                <PinchGestureHandler
                  ref={pinchRef}
                  onGestureEvent={onPinchEvent}
                  simultaneousHandlers={[panRef]}
                  onHandlerStateChange={handlePinchStateChange}
                >
                  <Animated.View
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: [{ scale }, { translateX }, { translateY }],
                    }}
                  >

                      <Svg width ="100%" height="100%">
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

                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
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

export default wengMRT;



