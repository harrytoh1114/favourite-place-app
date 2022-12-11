import { StyleSheet, FlatList, View, Text } from "react-native";
import { Colors } from "../../constant/color";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet! Please add some.
        </Text>
      </View>
    );
  }
  const renderPlacesHandler = (item) => {
    <PlaceItem place={item} />;
  };

  return (
    <FlatList
      data={places}
      key={(item) => item.id}
      renderItem={renderPlacesHandler}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  },
});
