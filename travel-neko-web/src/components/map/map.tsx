/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useCallback, useEffect, useRef, useState } from "react";

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

const mapFrameClassNames = "h-dvh max-w-dvw";

const MapComponent = () => {
  const loaderRef = useRef(
    new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
      version: "quarterly",
    }),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const initializeMap = async () => {
      const loader = loaderRef.current;
      try {
        const { Map } = await loader.importLibrary("maps");
        setIsLoading(false);
        const map = new Map(ref.current as HTMLDivElement, options);

        const { AdvancedMarkerElement, PinElement } =
          await loader.importLibrary("marker");
        const pin = new PinElement({});

        const marker = new AdvancedMarkerElement({
          map: map,
          position: center,
          title: "Suica",
          content: pin.element,
          gmpClickable: true,
        });

        // searchPlaces(map);
        return () => {};
      } catch (error) {
        console.error(error);
        setError(`${error}`);
      }
    };
    initializeMap();
  }, []);

  const searchPlaces = useCallback(async (map: google.maps.Map) => {
    const loader = loaderRef.current;
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");
    const { Place } = await loader.importLibrary("places");
    const request = {
      textQuery: "Torikizoku",
      fields: ["displayName", "location", "businessStatus"],
      includedType: "restaurant",
      locationBias: center,
      //   isOpenNow: true,
      language: "en-US",
      maxResultCount: 8,
      minRating: 3.2,
      //   region: "jp",
      useStrictTypeFiltering: false,
    };
    const { places } = await Place.searchByText(request);

    if (places.length > 0) {
      const { LatLngBounds } = (await google.maps.importLibrary(
        "core",
      )) as google.maps.CoreLibrary;
      const bounds = new LatLngBounds();

      places.forEach(async (place, index) => {
        if (index === 0) {
          await place.fetchFields({
            fields: [
              "displayName",
              "formattedAddress",
              "location",
              "photos",
              "reviews",
            ],
          });
          console.log(place.displayName);
          console.log(place.formattedAddress);
          console.log(place.photos);
          console.log(place.photos?.[0].getURI({ maxHeight: 400 }));
          setSelectedPlace(place);
        }
        const markerView = new AdvancedMarkerElement({
          map,
          position: place.location,
          title: place.displayName,
        });
        bounds.extend(place.location as google.maps.LatLng);
        console.log(place);
      });
      map.fitBounds(bounds);
    }
  }, []);

  return (
    <>
      {isLoading && <div className={mapFrameClassNames}>Loading</div>}
      {error && <div className={mapFrameClassNames}>{error}</div>}
      <div className={mapFrameClassNames} ref={ref} id="map" />
      {selectedPlace && (
        <div className="fixed bottom-4 left-4 max-h-96 overflow-auto rounded-md bg-white shadow">
          <h1>{selectedPlace.id}</h1>
          <p>{selectedPlace.displayName}</p>
          <p>{selectedPlace.formattedAddress}</p>
          {selectedPlace.photos?.map((photo) => {
            const uri = photo.getURI({ maxWidth: 400 });
            const author = photo.authorAttributions;
            return (
              <div key={uri}>
                <img src={uri} alt="Author" width={400} height={400} />
                <p>{author[0].displayName}</p>
              </div>
            );
          })}
          {selectedPlace.reviews?.map((review) => {
            return (
              <div key={`${review.authorAttribution}-${review.publishTime}`}>
                <a href="${authorUri}" target="_blank">
                  Author: ${review.authorAttribution?.displayName}
                </a>
                <div id="rating">Rating: {review.rating} stars</div>
                <div id="rating">
                  <p>Review: {review.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export { MapComponent };
