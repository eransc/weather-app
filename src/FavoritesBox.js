import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { List, Segment, Label, Icon, Message } from "semantic-ui-react";

const FavoritesBox = (props) => {
  // const handleClear = (cityname) => {
  //   props.setCities(props.cities.filter((city) => city.name !== cityname));
  // };

  return (
    <>
      <Message>
        <Message.Header>Favorites (drag items)</Message.Header>
      </Message>
      <List divided selection>
        <ReactSortable list={props.cities} setList={props.setCities}>
          {props.cities.map((city) => (
            <List.Item key={city.name}>
              <Segment raised>
                <Label horizontal size="medium">
                  {city.name}
                </Label>
                {city.temp}
                <Icon name="x" link onClick={() => props.handleClear(city.name)} />
              </Segment>
            </List.Item>
          ))}
        </ReactSortable>
      </List>
    </>
  );
};

export default FavoritesBox;
