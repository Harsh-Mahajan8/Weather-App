import { useState } from "react";
import ModelComp from "./ModelComp";
//textfield
import TextField from "@mui/material/TextField";
//button
import Button from "@mui/material/Button";

export default function SearchBox() {
  let [city, setCity] = useState("");
  let [show, setShow] = useState(false);

  let handleCity = async(e) => {
    setCity(e.target.value);
  };
  let onSubmit = (e) => {
    e.preventDefault();
    console.log(city);
    setShow(true);
  };
  let closeModal = () => {
    setShow(false);
  };

return (
    <div>
        <h1 style={{color:'#fff'}}>Weather App</h1>
        <form action="" onSubmit={onSubmit}>
            <TextField
                id="standard-basic"
                label="City Name"
                variant="standard"
                value={city}
                onChange={handleCity}
                required
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
            />
            <br />
            <br />
            <Button variant="contained" type="submit">
                Search
            </Button>
        </form>
        <ModelComp show={show} onClose={closeModal} city = {city}/>
    </div>
);
}
