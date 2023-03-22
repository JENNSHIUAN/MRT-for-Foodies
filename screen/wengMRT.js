import React, { useState, useRef}from 'react';
import { StyleSheet, View, Animated, Text, Dimensions, Image, TouchableOpacity, ScrollView} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { PanGestureHandler, PinchGestureHandler, State} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4; 
const CARD_WIDTH = CARD_HEIGHT- 50 ; 

const wengMRT = () => {
  const {metroStations, metroLines} = require('./MRTData');
 
  const [panEnabled, setPanEnabled] = useState(false);
  const [showCard, setShowCard] = useState(false);

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

  const images = [
    require('../assets/food.png'),
    require('../assets/food.png'),
    require('../assets/food.png'),
    require('../assets/food.png'),
    require('../assets/food.png'),
  ];

  const renderCard = () => {
    return (
      <ScrollView style={styles.scrollView} 
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH}>
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
      ))}
    </ScrollView>

    );
  };

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
                  >

                      <Svg style={{width :"200%", height :"200%", zIndex: 0}}>
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
                    
                    {/* {metroStations.map(station => (
                      <View key={station.id} 
                        style={[styles.stationLabel, { left: station.x, top: station.y }]}>
                        <TouchableOpacity
                          onPress={() => {
                            // <View style={styles.card}
                              // <Image
                              //   source={require('../assets/food.png')}
                              //   style={styles.cardImage}
                              //   resizeMode="cover"
                              // />
                            // </View>
                          }}> 
                            <Text style={style s.stationLabelText}>{station.name}</Text>
                        </TouchableOpacity>
                      </View>
                    ))} */}
                    
                    {metroStations.map(station => (
                      <View key={station.id} style={[styles.stationLabel, { left: station.x, top: station.y }]}>
                        <TouchableOpacity onPress={() => setShowCard(!showCard)}> 
                          <Text style={styles.stationLabelText}>{station.name}</Text>
                      </TouchableOpacity>

                        {/* {showCard && (
                          <View style={styles.card}>
                            <Image
                              source={require('../assets/food.png')}
                              style={styles.cardImage}
                              resizeMode="cover"
                            />
                          </View>
                        )} */}
                      </View>
                    ))}
    
                  {showCard && renderCard()}
                  

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
    zIndex: 0
  },
  stationLabel: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000000',
    zIndex: 0,
  },
  stationLabelText: {
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'center',
  zIndex: 0
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "red",
  },
  card: {
    width: 100,
    height: 100,
    top: 50,
    left: 50,
    position: 'absolute',
    zIndex: 1
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  scrollView: {
    marginHorizontal:  20,
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    zIndex: 1
  },
  });

export default wengMRT;



