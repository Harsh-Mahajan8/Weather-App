import { useState } from "react";
import Search from "./Search";
import { SyncLoader } from "react-spinners";
import { getWeatherByPlace, getImages } from "./helper.js";

import Card from "./Card.jsx";

export default function Data() {
  let [state, setState] = useState({
    weather: null,
    isLoading: false,
    loca: null,
    url: null,
  });

  let addNewLocation = async (place) => {
    try {
      setState((prev) => ({ ...prev, loca: place, isLoading: true }));

      // Fetch weather data
      let weatherData = await getWeatherByPlace(place);

      if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
        throw new Error("Invalid weather data received");
      }

      // Extract description for image query
      // Fetch image URL
      const url = await getImages(weatherData.weather[0].description);

      // Update state once with all new data
      setState((prev) => ({
        ...prev,
        weather: weatherData,
        url: url,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setState((prev) => ({
        ...prev,
        weather: null,
        url: null,
        isLoading: false,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center rounded-sm min-h-screen px-4 sm:px-0">
      <Search handleLocation={addNewLocation} />
      {state.isLoading ? (
        <SyncLoader color="#f33c3c" size={16} />
      ) : (
        <Card state={state} />
      )}
    </div>
  );
}
