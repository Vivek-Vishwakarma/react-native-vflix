import * as React from "react";
import { Card, Title, Paragraph, Badge } from "react-native-paper";
import { StyleSheet } from "react-native";
import Popup from "./Popup";


export default function Carditem({ element, id, type }){ 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return(
    
  <Popup id={id} type={type} >
    <Badge style={{top: 5, left : 10, backgroundColor: element.vote_average > 7 ?"green" : "red"}}>{element.vote_average}</Badge>
    <Card style={styles.cards}>
      <Card.Cover
      style={{borderRadius : 10}}
        source={{
          uri: `https://image.tmdb.org/t/p/w300${element.poster_path}`,
        }}
      />
      <Card.Content>
        <Title style={styles.text}>{element.title || element.name}</Title>
        <Paragraph>
          {capitalizeFirstLetter(element.media_type ? element.media_type : " ")}
        </Paragraph>
        <Paragraph>
          {element.release_date || element.first_air_date
            ? element.release_date || element.first_air_date
            : "Not Available"}
        </Paragraph>
      </Card.Content>
    </Card>
  </Popup>
  
);}

const styles = StyleSheet.create({
  cards: {
    width: 150,
    marginBottom: 10,
    borderRadius : 5
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
