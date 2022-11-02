//papa parser is used to read csv data and convert it into
//JSON format. it will also create a chunk of size 2mb and
//send data to backend.
import Papa from "papaparse";
import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";

const CheckApi = () => {
  const request = {
    method: "post",
    header: "Content-Type: application/json",
    url: "http://localhost:3000/getpmreading/getreadingforDevice",
    data: ["devicea", "deviceb", "devicec"],
  };

  useEffect(() => {
    axios(request)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  });
  return <div className="uploadFile">Check console for results</div>;
};

export default CheckApi;
