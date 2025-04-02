import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element for accessibility
import { getData } from "./WeartherData";
//card
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { X } from "lucide-react";
/**
 * @typedef {Object} ExpandMoreProps
 * @property {boolean} expand - Indicates whether the component is expanded.
 */

/** @type {ExpandMoreProps} */
const ExpandMoreProps = {};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <IconButton
      {...other}
      style={{ transform: expand ? "rotate(180deg)" : "rotate(0deg)" }}
    />
  );
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const heart = (e) => {
  e.target.style.color = e.target.style.color === "red" ? "" : "red";
};

// import { useState } from "react";
import "./model.css";
export default function ModelComp({ show, onClose, city }) {
  const [expanded, setExpanded] = useState(false);
  let [weatherdata, setWeatherData] = useState({
    temp: "",
    humidity: "",
    tempMin: "",
    tempMax: "",
    weather: "",
    feels_like: "",
  });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let data = async () => {
    let fetchedData = await getData(city);
    setWeatherData({
      temp: fetchedData.main.temp,
      humidity: fetchedData.main.humidity,
      tempMin: fetchedData.main.temp_min,
      tempMax: fetchedData.main.temp_max,
      disc: fetchedData.weather[0].description,
      feels_like: fetchedData.main.feels_like,
    });
  };

  // Call the data function when the component renders
  useEffect(() => {
    if (city) {
      data();
    }
  }, [city]);

  return (
    <div className="model">
      <Modal
        isOpen={show}
        onRequestClose={onClose}
        style={{
          content: {
            width: "345px",
            margin: "auto",
            fontSize: "16px", // Set font size for the modal
            // borderRadius: "4px",
            border: "none",
            overflow: "auto",
            fontWeight: "400",
            color: "black",
            backgroundImage: `
                linear-gradient(
                  rgba(255, 255, 255, 0.6), 
                  rgba(255, 255, 255, 0.6)
                ), 
                ${
                  weatherdata.humidity > 80
                    ? `url('https://plus.unsplash.com/premium_photo-1664303017917-71ebeb42343d?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                    : weatherdata.temp > 25
                    ? `url('https://images.unsplash.com/photo-1604228741406-3faa38f4907a?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                    : `url('https://images.unsplash.com/photo-1517362302400-873b4e30f5c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29sZHxlbnwwfHwwfHx8MA%3D%3D')`
                }`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },
        }}
      >
        <Card
          sx={{ maxWidth: 345 }}
          style={{
            background: "none",
            fontSize: "16px",
            fontWeight: "400",
            color: "black",
            padding: "0px 20px",
            boxSizing: "border-box",
          }}
          className="card"
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {city ? city[0].toUpperCase() : ""}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={onClose}>
                <X />
              </IconButton>
            }
            title={city ? city.toUpperCase() : ""}
            subheader="Weather"
          />
          <CardMedia
            component="img"
            height="154"
            image={
              weatherdata.humidity > 80
                ? "https://plus.unsplash.com/premium_photo-1664303017917-71ebeb42343d?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : weatherdata.temp > 25
                ? "https://images.unsplash.com/photo-1604228741406-3faa38f4907a?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : "https://images.unsplash.com/photo-1517362302400-873b4e30f5c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29sZHxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="Paella dish"
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",

            }}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Temperature is :{" "}
              {weatherdata.temp
                ? `${weatherdata.temp}°C`
                : "Loading weather data..."}{" "}
              <br />
              There will be {weatherdata.disc} and temperature would feels like{" "}
              {weatherdata.feels_like}°C
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" className="heart">
              <FavoriteIcon onClick={heart} />
            </IconButton>
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography sx={{ marginBottom: 2 }}>Weather Data:</Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Humidity: {weatherdata.humidity} <br />
                Minimum Temperature: {weatherdata.tempMin}°C <br />
                Maximum Temperature: {weatherdata.tempMax}°C
                <br />
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Modal>
    </div>
  );
}
