import React, { useRef, useMemo } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../redux/userData";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          dispatch(
            setLocation({
              location: marker.getLatLng(),
            })
          );
        }
      },
    }),
    []
  );

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      dispatch(
        setLocation({
          location: e.latlng,
        })
      );
      map.flyTo(e.latlng, 18);
    },
    // locationerror() {
    //   dispatch(
    //     setLocation({
    //       location: defaultMarker,
    //     })
    //   );
    //   map.flyTo(defaultMarker, 16);
    // },
  });

  return userData?.location === null ? null : (
    <Marker
      draggable={false}
      eventHandlers={eventHandlers}
      position={userData?.location}
      ref={markerRef}
      easeLinearity={0.35}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
