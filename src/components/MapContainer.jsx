import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  Circle,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";

const LIBRARIES = ["places"];

const MapContainer = ({ meeting }) => {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({});
  const [activeMarker, setActiveMarker] = useState(null);
  const [middleLocation, setMiddleLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  const { user } = useSelector((store) => store.authSlice);
  const mapRef = useRef(null);

  const handleToggleRoute = () => {
    if (!showRoute) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(coords);
            setError(null);
            setShowRoute(true);
          },
          (err) => {
            if (err) {
              setError(
                "Location access denied. Please allow it in your browser settings."
              );
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    } else {
      setShowRoute(false);
    }
  };

  useEffect(() => {
    if (meeting?.participants) {
      const transformed = meeting.participants
        .map((item) => {
          const lat = item?.location?.lat;
          const lng = item?.location?.lng;

          if (
            lat != null &&
            lng != null &&
            !isNaN(Number(lat)) &&
            !isNaN(Number(lng))
          ) {
            return {
              name: item.name,
              email: item.email,
              position: {
                lat: Number(lat),
                lng: Number(lng),
              },
              description: item?.location?.placeName || "",
            };
          }
          return null;
        })
        .filter(Boolean);

      setMarkers(transformed);

      const creatorMarker = transformed.find((m) => m.email === user.email);

      if (creatorMarker) {
        setCenter(creatorMarker.position);
      } else if (transformed.length > 0) {
        setCenter(transformed[0].position);
      }
    }
  }, [meeting, user.email]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (markers.length > 0) {
      let totalLat = 0;
      let totalLng = 0;
      markers.forEach((m) => {
        totalLat += m.position.lat;
        totalLng += m.position.lng;
      });
      setMiddleLocation({
        lat: totalLat / markers.length,
        lng: totalLng / markers.length,
      });
    }
  }, [markers]);

  if (!isLoaded) return <div>Loading maps...</div>;

  console.log({ center, userLocation });

  return (
    <div className="relative">
      <button
        onClick={handleToggleRoute}
        className="absolute top-2 left-2 z-10 px-3 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
      >
        {showRoute ? "Hide Route" : "Show Route"}
      </button>

      {error && (
        <div className="absolute top-14 left-2 z-10 bg-red-500 text-white text-sm px-2 py-1 rounded">
          {error}
        </div>
      )}

      <GoogleMap
        mapContainerClassName="w-full h-[400px]"
        center={center}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={marker?.position}
            title={marker?.title || marker?.email}
            onClick={() => setActiveMarker(index)}
          >
            {activeMarker === index && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="min-w-[150px]">
                  <h3 className="m-0 text-sm font-bold">{marker?.name}</h3>
                  <h3 className="m-0 text-sm font-bold">{marker?.email}</h3>
                  {marker?.description && (
                    <p className="my-1 text-xs">{marker?.description}</p>
                  )}
                </div>
              </InfoWindow>
            )}
          </MarkerF>
        ))}

        {middleLocation && (
          <Circle
            center={middleLocation}
            radius={1000}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.1,
            }}
          />
        )}

        {showRoute &&
          userLocation?.lat &&
          userLocation?.lng &&
          center?.lat &&
          center?.lng && (
            <>
              <DirectionsService
                options={{
                  origin: {
                    lat: Number(userLocation.lat),
                    lng: Number(userLocation.lng),
                  },
                  destination: center,
                  travelMode: "DRIVING",
                }}
                callback={(res) => {
                  if (res !== null && res.status === "OK") {
                    setDirections(res);
                  }
                }}
              />
              {directions && <DirectionsRenderer directions={directions} />}
            </>
          )}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
