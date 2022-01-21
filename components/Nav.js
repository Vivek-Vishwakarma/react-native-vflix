import * as React from "react";

import { BottomNavigation, Text } from "react-native-paper";
import All from "./All";

import Movie from "./Movie";
import Search from "./Search";
import Tv from "./Tv";

const AllRoute = () => <All />;

const MovieRoute = () => <Movie />;

const TvRoute = () => <Tv />;

const SearchRoute = () => <Search />;

const Nav = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "all", title: "All", icon: "filmstrip-box-multiple" },
    { key: "movie", title: "Movie", icon: "movie", color: "#3F51B5" },
    { key: "tv", title: "Tv", icon: "television", color: "#795548" },
    { key: "search", title: "Search", icon: "magnify", color: "#009688" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    all: AllRoute,
    movie: MovieRoute,
    tv: TvRoute,
    search: SearchRoute,
  });
  return (
    <>
      
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default Nav;
