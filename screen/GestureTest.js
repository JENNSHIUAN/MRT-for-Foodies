import { Dimensions, StyleSheet, View, Animated } from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
  } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZE = 80;

export default function App() {

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  
  const gesture = Gesture.Pan().onUpdate((event) => {
    translateX.value = event.translationX
    translateY.value = event.translationY
  })
  
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.circle, rStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circle: {
    position: 'absolute',
    height: SIZE,
    aspectRatio: 1,
    backgroundColor: 'blue',
    borderRadius: SIZE / 2,
    opacity: 0.8,
  },
});
