import React from "react";
import { useState, useEffect, useRef } from "react";
import { ScrollView, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Carditem from "./Carditem";
import Header from "./Header";

const All = () => {
  const [movie, setMovie] = useState([]);
  const [totalpage, setTotalpage] = useState(1);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ref = useRef(null);
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=84785e3e799edf874c8bb0606d7630de&page=${page}`
    );
    const data = await response.json();
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
    getMovies();
    // eslint-disable-next-line
  }, [page]);
  return (
    <>
      <Header text="Vflix" />
      <ScrollView ref={ref} contentContainerStyle={{ paddingHorizontal: 20 }}>
        <TextInput
          label="Search"
          mode="outlined"
          placeholder="Search movies"
          style={{ marginTop: 5 }}
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
        <View style={styles.container}>
          {movie &&
            movie
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.title &&
                  val.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.name &&
                  val.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((element) => {
                return (
                  <Carditem
                    element={element}
                    id={element.id}
                    type={element.media_type}
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
            disabled={true ? page === totalpage : false}
            color="green"
            style={styles.buttons}
          >
            Next
          </Button>
        </View>
        <Text style={{ textAlign: "center", margin: 5 }}>
          Curent Page = {page}
        </Text>
        <Text style={{ textAlign: "center", margin: 5 }}>
          Total Page = {totalpage}
        </Text>
      </ScrollView>
    </>
  );
};

export default All;

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
