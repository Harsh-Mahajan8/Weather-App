console.log(import.meta.env.VITE_GEO_KEY);

export async function getCoordinates(place) {
    try {
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${import.meta.env.VITE_GEO_KEY}&pretty=1`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        let coor = data.results[0].geometry;
        console.log(coor);
        return coor;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
}

export const getWeatherData = async (lat, lon) => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_KEY}`;
        console.log("Fetching weather data from URL:", url);
        let response = await fetch(url);
        if (!response.ok) {
            console.error("Weather API response status:", response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        };
        let data = await response.json();
        console.log("Weather data received:", data);
        return (data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

export const getWeatherByPlace = async (place) => {
    try {
        const { lat, lng } = await getCoordinates(place);
        if (lat === undefined || lng === undefined) {
            throw new Error("Invalid coordinates received");
        }
        const weatherData = await getWeatherData(lat, lng);
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather by place:', error);
        return null;
    }
}

import { createApi } from 'unsplash-js';

export const getImages = async (des) => {
    const unsplash = createApi({ accessKey: import.meta.env.VITE_ACCESS_KEY });

    try {
        const res = await unsplash.search.getPhotos({
            query: des,
            page: 1,
            perPage: 1,
            color: 'black',
            orientation: 'portrait',
        });

        if (res.errors) {
            console.log('error occurred: ', res.errors[0]);
            return null;
        } else {
            const { results } = res.response;
            let image = results[0].urls.regular;
            return image;
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

export const getTime = (data) => {
    let date = new Date(data * 1000);
    return date;
}

export const findIcon = (dis, icons) => {
    try {
        // Convert dis to string to avoid errors
        dis = String(dis);

        // Validate inputs
        if (typeof dis !== "string" || !dis.trim()) {
            throw new Error("Invalid sentence: Must be a non-empty string");
        }
        if (
            !icons ||
            typeof icons !== "object" ||
            Object.keys(icons).length === 0
        ) {
            throw new Error("Invalid icons: Must be a non-empty object");
        }

        // Convert sentence to lowercase and split into words
        const words = dis.toLowerCase().split(/\s+/);

        // Find the first matching key in the sentence
        for (const key of Object.keys(icons)) {
            // Check if any word includes the key as substring
            if (words.some(word => word.includes(key.toLowerCase()))) {
                return { [key]: icons[key] };
            }
        }

        // Return empty object if no match is found
        return {};
    } catch (error) {
        console.error(error.message);
        return {};
    }
};
