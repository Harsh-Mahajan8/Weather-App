import { getTime } from "./helper";
import Icon from "./Icon";
import { Sunrise, Sunset, RotateCcw } from "lucide-react";
export default function Card({ state }) {
  return (
    <div className="gb-box relative text-white rounded-md w-[22rem] h-[26rem] flex flex-col px-6 overflow-hidden drop-shadow-xl ">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[2px] "
        style={{ backgroundImage: `url(${state.url})` }}
      ></div>

      <ul className="relative text-2xl font-[400] font-white">
        {state.weather && state.weather.main && (
          <div className="flex flex-col content-between space-y-4">
            <div className="head flex justify-between py-4 pb-1">
              <p className="text-[3rem] font-semibold">{state.loca}</p>
              <span className="pt-8">
                <Icon
                  description={state.weather.weather[0].description}
                  color="#b4955f"
                />
              </span>
            </div>
            <div className="details">
              <li>
                Temperature: {Math.floor(state.weather.main.temp - 273) + "°C"}
              </li>
              <li>Humidity: {state.weather.main.humidity} %</li>
              {state.weather &&
                state.weather.weather &&
                state.weather.weather[0] && (
                  <li>Description: {state.weather.weather[0].description}</li>
                )}
              {state.weather && state.weather.wind && (
                <li>Wind Speed: {state.weather.wind.speed} m/s</li>
              )}
            </div>
            <div className="bottom flex pt-2 justify-between">
              <span className="text-[1rem] font-[400] ">
                Sunrise
                <span className="flex font-bold">
                  <Sunrise size={29} color="#5fa6b4" className="mt-1" />
                  <p className=" ps-2">
                    {getTime(state.weather.sys.sunrise).toLocaleTimeString()}
                  </p>
                </span>
              </span>
              <span className="text-[1rem] font-[400]">
                Sunset
                <span className="flex font-bold">
                  <Sunset size={29} color="#f7c12b" className="mt-1" />
                  <p className=" ps-2">
                    {getTime(state.weather.sys.sunset).toLocaleTimeString()}
                  </p>
                </span>
              </span>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}
