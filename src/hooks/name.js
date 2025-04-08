import axios from "axios";
import { useState } from "react";

export function useServerName() {
  let [serverName, setServerName] = useState("");
  axios
    .get("https://codingapple1.github.io/userdata.json")
    .then((response) => {
      const data = response.data;
      setServerName(data.name);
    })
    .catch((error) => {
      console.error(error);
    });

  return serverName;
}
