import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    console.log(place);

    await insertPlace(place);

    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
