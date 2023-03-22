import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4; 
const CARD_WIDTH = CARD_HEIGHT- 10 ; 

const images = [
  require('../assets/food.png'),
  require('../assets/food.png'),
  require('../assets/food.png'),
  require('../assets/food.png'),
  require('../assets/food.png'),
];

export default function App() {
  return (
    <ScrollView style={styles.scrollView} 
    horizontal
    showsHorizontalScrollIndicator={false}
    snapToInterval={CARD_WIDTH}>
      {images.map((image, index) => (
        <View style={styles.card} key={index}>
          <Image 
            source={image} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>
     ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  test: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    width: 90,
    height: 90,
    alignSelf: "left",
  },
  scrollView: {
    marginHorizontal:  20,
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
  },
});
