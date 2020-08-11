import React, { useState } from "react";
import { List, Button, Dropdown, Label } from "semantic-ui-react";

const CityStats = (props) => {
  const [city, setCity] = useState({});

  const changeContainerBgColor = (temp) => {
    var color = "rgba(244,244,244,0.4)";

    if (temp > -10 && temp <= 0) {
      color = "rgba(50,97,214, 0.4)";
    } else if (temp > 1 && temp <= 15) {
      color = "rgba(244,244,244, 0.4)";
    } else if (temp > 16 && temp <= 25) {
      color = "rgba(244,204,0, 0.4)";
    } else if (temp > 26) {
      color = "rgba(216,128,48, 0.4)";
    }
    return color;
  };

  //Dropwdown change event
  const dropdownChange = (event, data) => {
    const url = `${process.env.REACT_APP_WEATHER_API_URL}?q=${data.value}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCity({
          name: data.name,
          temp: data.main.temp,
          color: changeContainerBgColor(data.main.temp),
          coords: data.coord
        });
      });
  };

  return (
    <>
      <Dropdown
        onChange={dropdownChange}
        placeholder="Select City"
        fluid
        selection
        options={props.cities}
      />

      <List>
        <List.Item>
          <p
            style={{
              backgroundColor: city.color,
            }}
          >
            City Name: {city.name}
          </p>
        </List.Item>
        <List.Item>
          <p
            style={{
              backgroundColor: city.color,
            }}
          >
            Temperature: {city.temp}
          </p>
        </List.Item>

        <List.Item>
          <Button
            onClick={() => {
              props.addToFavoritesHandler(city);
            }}
            color="orange"
          >
            Add To Favorites
          </Button>
        </List.Item>
      </List>
    </>
  );
};

export default CityStats;
