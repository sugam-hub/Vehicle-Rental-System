import React from "react";
import { OutlinedInput, Button } from "@mui/material";

const Search = () => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const params = {
            q: "",
            format: "json",
            addressdetails: "addressdetails",
          };
        }}
      >
        Search
      </Button>
    </>
  );
};

export default Search;
