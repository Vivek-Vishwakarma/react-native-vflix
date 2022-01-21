import { useState, useEffect, useRef } from "react";
import { ScrollView, Text } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Header from "./Header";
import Carditem from "./Carditem";

const Search = () => {
  const ref = useRef(null);
  const [totalpage, setTotalpage] = useState(1);
  const [movie, setMovie] = useState([]);
  const [selectedValue, setSelectedValue] = useState("movie");
  // const [type, setType] = useState("movie");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    const searchFetch = await fetch(
      `https://api.themoviedb.org/3/search/${selectedValue}?api_key=84785e3e799edf874c8bb0606d7630de&query=${query}&page=${page}`
    );
    const data = await searchFetch.json();
    setTotalpage(data.total_pages);
    setMovie(data.results);
  };
  const next = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setPage(page + 1);
  };
  const prev = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setPage(page - 1);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, selectedValue]);

  return (
    <>
      <Header text="Search" />
      <ScrollView ref={ref} contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View>
          <TextInput
            label="Search"
            mode="outlined"
            placeholder="Search movies"
            style={{ marginTop: 5}}
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
          <Picker
            selectedValue={selectedValue}
            mode={"dropdown"}
            style={{ height: 50, textAlign: "center"}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Movie" value="movie" />
            <Picker.Item label="TV" value="tv" />
          </Picker>
          <Button
            onPress={fetchData}
            style={{ marginTop: 5 }}
            mode="contained"
            icon="search-web"
          >
            Search
          </Button>
        </View>
        <View style={styles.container}>
          {movie &&
            movie.map((element) => {
              return (
                <Carditem
                  element={element}
                  id={element.id}
                  type={selectedValue}
                  key={element.id}
                />
              );
            })}
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Button
            onPress={prev}
            disabled={true ? page <= 1 : false}
            mode="contained"
            color="green"
            style={styles.buttons}
          >
            Prev
          </Button>
          <Button
            onPress={next}
            mode="contained"
            color="green"
            disabled={true ? page === totalpage || !totalpage : false}
            style={styles.buttons}
          >
            Next
          </Button>
        </View>
        <Text style={{ textAlign: "center", margin: 5 }}>
          Curent Page = {page}
        </Text>
        <Text style={{ textAlign: "center", margin: 5 }}>
          Total Page = {totalpage ? totalpage : "?"}
        </Text>
      </ScrollView>
    </>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  buttons: {
    margin: 5,
  },
});
