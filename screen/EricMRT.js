import React, { useState, useRef}from 'react';
import { StyleSheet, View, Animated, Text, PanResponder } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';



const EricMRT = () => {
  const {metroStations, metroLines} = require('./MRTData');
 
  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;  

  const pinchRef = useRef();
  const panRef = useRef();

  const pan = useRef(new Animated.ValueXY()).current;

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY,
    }
  }],
    { useNativeDriver: true, },
    );

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

  const handlePanStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }
    if (nativeEvent.state === State.END) {
        translateX.extractOffset();
        translateY.extractOffset();
        console.log("pan end");
      }
  }

  return ( 
    <View>
      <PanGestureHandler
              onGestureEvent={onPanEvent}
              onHandlerStateChange={handlePanStateChange}
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
                      transform: [{ scale }, { translateX}, { translateY }],
                    }}
                    //{...panResponder.panHandlers}
                  >

                      <Svg width ="200%" height="200%">
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
                          r={5}
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
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "red",
  },
  });

export default EricMRT;



