import React, { useState } from "react";

import { Container, Header, Grid } from "semantic-ui-react";

import CityStats from "./CityStats";

import "./App.css";
//import Map from "./components/map/Map2";
import MapWithAMarker from "./components/map/Map";

import FavoritesBox from "./FavoritesBox";
import citiesJSON from "./data/cities.json";

function App() {
  const [cities, setCities] = useState([]);

  //
  const getCityIndex = (city) => {
    let idx = 0;
    if (cities[idx]) {
      while (idx < cities.length && city.temp > cities[idx].temp) {
        idx++;
      }
    }
    return idx;
  };

  const addToFavoritesHandler = (data) => {
    if (cities.length === 0) {
      setCities([{ name: data.name, temp: data.temp, coords: data.coords }]);
    } else {
      const cityIndex = getCityIndex(data);
      if (cityIndex !== cities.findIndex((city) => city.name === data.name)) {
        cities.splice(cityIndex, 0, {
          name: data.name,
          temp: data.temp,
          coords: data.coords,
        });

        setCities([...cities]);
      }
    }
  };

  const handleClear = (cityname) => {
    setCities(cities.filter((city) => city.name !== cityname));
  };


  return (
    <Container>
      <Header as="h1" textAlign="left">
        Weather App
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <CityStats
              cities={citiesJSON}
              addToFavoritesHandler={addToFavoritesHandler}
            />
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
          <Grid.Column width={6} divided>
            <FavoritesBox cities={cities} setCities={setCities} handleClear={handleClear} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            
            <MapWithAMarker
              places={cities}
              center={{ lat: 40.6451594, lng: -74.0850826 }}
              zoom={3}
              googleMapURL={process.env.REACT_APP_GOOGLE_MAP_URL}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
