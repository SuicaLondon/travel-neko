/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

const center = {
  lat: 35.68822,
  lng: 139.70134,
};

const zoom = 16;

const options: google.maps.MapOptions = {
  center,
  zoom,
  mapId: "NEXT_MAPS_TUTS",
};

const MapComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        version: "quarterly",
      });
      try {
        const { Map } = await loader.importLibrary("maps");
        setIsLoading(false);
        const { AdvancedMarkerElement } = await loader.importLibrary("marker");
        const map = new Map(ref.current as HTMLDivElement, options);

        const marker = new AdvancedMarkerElement({
          map: map,
          position: center,
        });
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      }
    };
    initializeMap();
  }, []);

  return (
    <>
      {isLoading && <div className="h-dvh w-dvw">Loading</div>}
      {error && <div className="h-dvh w-dvw">{error}</div>}
      <div className="h-dvh w-dvw" ref={ref} id="map" />
    </>
  );
};

export { MapComponent };
