import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

export default function MyMap({ lng, lat }) {
  console.log({ lng, lat });
  return (
    <>
      {lng ? (
        <Map defaultCenter={[lat, lng]} defaultZoom={10}>
          <Marker width={40} anchor={[lat, lng]} />
          <ZoomControl />
        </Map>
      ) : (
        <p></p>
      )}
    </>
  );
}
