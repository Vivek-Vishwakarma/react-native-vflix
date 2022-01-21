import * as React from "react";
import { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Paragraph, Title, Chip, Button } from "react-native-paper";

const Popup = ({ children, id, type }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [video, setVideo] = useState({});
  const [content, setContent] = useState({});
  const getVideo = async () => {
    const fetchVideo = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=84785e3e799edf874c8bb0606d7630de`
    );
    const videoData = await fetchVideo.json();
    setVideo(videoData.results[0]?.key);
  };
  const getData = async () => {
    const fetchData = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=84785e3e799edf874c8bb0606d7630de`
    );
    const contentData = await fetchData.json();
    setContent(contentData);
  };
  useEffect(() => {
    getVideo();
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Image
                style={{ height: 200, width: 250, marginLeft: "auto", marginRight: "auto" }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${content.backdrop_path}`,
                }}
              />
              <Title style={{ color: "white", fontSize: 25, marginTop: 10 }}>
                {content.title || content.name}
              </Title>
              <Paragraph style={{ color: "white" }}>
                {content.overview}
              </Paragraph>
              <Text style={{ color: "white", fontSize: 18, marginTop: 5 }}>
                Release Date :{" "}
                {content.release_date || content.first_air_date
                  ? content.release_date || content.first_air_date
                  : "Not Available"}
              </Text>
              {content.budget
                ? content.budget && (
                    <Text
                      style={{ color: "white", fontSize: 18, marginTop: 5 }}
                    >
                      Budget : {content.budget.toString()}$
                    </Text>
                  )
                : null}
              <Text style={{ color: "white", fontSize: 18, marginTop: 5 }}>
                Genre :
              </Text>
              <Text>
                {content.genres &&
                  content.genres.map((e) => {
                    return (
                      <Chip style={{ backgroundColor: "#1976d2" }} key={e.name}>
                        {e.name}
                      </Chip>
                    );
                  })}
              </Text>
              <Text style={{ color: "white", fontSize: 18, marginTop: 5 }}>
                Status : {content.status}
              </Text>
              <Text
                style={{
                  color: content.vote_average > 7 ? "green" : "yellow",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Rating : {content.vote_average}
              </Text>
              <Text style={{ color: "white", fontSize: 18, marginTop: 5 }}>
                Production Companies :
              </Text>
              <Text>
                {content.production_companies &&
                  content.production_companies.map((element) => {
                    return (
                      <Chip key={element.name} style={{ backgroundColor: "#9c27b0" }}>
                        {element.name}
                      </Chip>
                    );
                  })}
              </Text>
              <TouchableOpacity>
              <Button  onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video}`)} style={{marginTop: 10, marginBottom: 5}} icon="youtube" mode="contained" color="red">Watch Trailer</Button>
              </TouchableOpacity>
            </ScrollView>
            <Pressable
              style={{ height: 25 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ fontSize: 20, color: "red" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>{children}</Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 30,
    padding: 5,
    position: "absolute",
    right: 7,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Popup;
