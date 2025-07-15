import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  Sun,
  Snowflake,
  CloudRain,
  Wind,
} from "lucide-react";
import { findIcon } from "./helper";

export default function Icon({ description }) {
    console.log("Icon description:", description);
    let icons = {
        cloud: <Cloud size={103} color="#ffffff" />,
        lightning: <CloudLightning size={103} color="#ffffff" />,
        clear: <Sun size={103} color="#ffffff" />,
        snow: <Snowflake size={103} color="#ffffff" />,
        rain: <CloudRain size={103} color="#ffffff" />,
        wind: <Wind />,
    };
    let icon = findIcon(description, icons);
    console.log("Icon found:", icon);
    // findIcon returns an object with one key-value pair or empty object
    // Return the icon component if found, else return null or a default icon
    if (icon && Object.values(icon).length > 0) {
        return Object.values(icon)[0];
    }
    return null;
}
