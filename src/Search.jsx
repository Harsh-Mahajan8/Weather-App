import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
export default function Search({ handleLocation }) {
  let [place, setPlace] = useState("");

  let handleInput = (e) => {
    setPlace(e.target.value);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    handleLocation(place);
    console.log(place);
    setPlace("");
  };
  return (
    <div className="flex flex-col justify-center items-center ms-3 pb-5 px-4 sm:px-0">
      <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text heading text-center">
        Search for Weather
      </h2>
      <form onSubmit={handleSubmit} className="ps-6 mt-4 font-2xl w-full max-w-md flex justify-center">
        <TextField
          name="search"
          id="standard-basic"
          label="Location"
          variant="standard"
          value={place}
          onChange={handleInput}
          required
          fullWidth
        />
        <Button variant="text" className="mt-2" type="submit">
          <SearchIcon className="mt-3 -ms-5" />
        </Button>
      </form>
    </div>
  );
}
