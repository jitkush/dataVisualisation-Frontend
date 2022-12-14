//papa parser is used to read csv data and convert it into
//JSON format. it will also create a chunk of size 2mb and
//send data to backend.
import Papa from "papaparse";
import axios from "axios";
import "../App.css";
import { useState } from "react";

const UploadFile = () => {
  let file = null;
  const [upload, setUpload] = useState(false);
  //define object for data transef
  const request = {
    method: "post",
    header: "Content-Type: application/json",
    url: "http://localhost:3000/uploadFile/dataTransfer/",
  };
  //function to handle file change
  const changeHandler = (e) => {
    setUpload(false);
    file = e.target.files[0];
  };
  //function to upload file to server
  const setFileStream = (e) => {
    //using papa parse to read data in chunks and on
    //completion of parsing a chunk send data to backend server
    Papa.parse(file, {
      delimiter: ",",
      header: true,
      dynamicTyping: true,
      transformHeader: function (h) {
        return h.trim();
      },
      complete: function () {
        setUpload((prev) => !prev);
      },

      //callback function that executes after processing of a chunk is complete
      chunk: (results, parser) => {
        console.log("Row data:", results.data);
        let postRequest = { ...request, data: results.data };
        //parser.pause();
        axios(postRequest)
          .then((res) => {
            // waiting for response from server to resume parser
            if (res.data == "OK") {
              console.log("parser resumed");
              // parser.resume();
            }
          })
          .catch((err) => {
            console.log(err);
            parser.abort();
          });
      },
      //setting chunk size
      chunkSize: 1048576 * 2,
    });
    console.log("done");
  };

  return (
    <div className="uploadFile">
      {/* File Uploader */}
      <input
        className="homepageButton"
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <button className="homepageButton" onClick={setFileStream}>
        Submit
      </button>
      {upload}
      <div className={upload ? "show" : "noShow"}>Data Upload Successfull</div>
    </div>
  );
};

export default UploadFile;
