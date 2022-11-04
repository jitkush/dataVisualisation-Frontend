//Assuming we will have different device at different location.
//used reading of three device to render the graph.
//the below useRef are used to format the data so that we can use it to prepare the graph.
//used useRef hook since it wont cause re-render when data is processed.

import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../App.css";

import axios from "axios";
const ThreeDeviceDataChart = () => {
  const [darkMode, setdarkMode] = useState(false);

  const dateConverter = (t) => {
    let date = new Date("20" + t);
    return Date.parse(date);
  };

  //dataRef is used for storing data fetched from API
  let dataRefA = useRef();
  let dataRefB = useRef();
  let dataRefC = useRef();

  //deviceAp1,deviceDataAp25,deviceDataAp10 is used for storing data of device A
  const deviceDataAp1 = useRef();
  const deviceDataAp25 = useRef();
  const deviceDataAp10 = useRef();

  //deviceBp1,deviceDataBp25,deviceDataBp10 is used for storing data of device B
  const deviceDataBp1 = useRef();
  const deviceDataBp25 = useRef();
  const deviceDataBp10 = useRef();

  //deviceCp1,deviceDataCp25,deviceDataCp10 is used for storing data of device C
  const deviceDataCp1 = useRef();
  const deviceDataCp25 = useRef();
  const deviceDataCp10 = useRef();

  //to cause re-render after the data received from server is completed.
  const [reloadA, setReloadA] = useState(false);
  const [reloadB, setReloadB] = useState(false);
  const [reloadC, setReloadC] = useState(false);

  //Request to get data from deviceA
  const requestA = {
    method: "get",
    url: "http://localhost:3000/getDeviceData/devicea",
  };

  //Request to get data from deviceB
  const requestB = {
    method: "get",
    url: "http://localhost:3000/getDeviceData/deviceb",
  };

  //Request to get data from deviceC
  const requestC = {
    method: "get",
    url: "http://localhost:3000/getDeviceData/devicec",
  };

  //Request to get data of DeviceA and processing the same
  const getDataA = async () => {
    console.log("FROM A");
    await axios(requestA)
      .then((res) => {
        dataRefA.current = res.data;
        console.log(dataRefA.current.sort((a, b) => a - b));
        //converting the data into array of array with 2 element for rendering graph for the value pm1
        deviceDataAp1.current = dataRefA.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p1];
          });
        //converting the data into array of array with 2 element for rendering graph for the value pm25
        deviceDataAp25.current = dataRefA.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p25];
          });
        //converting the data into array of array with 2 element for rendering graph for the value pm10
        deviceDataAp10.current = dataRefA.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p10];
          });
        //Setting the data to null so that remove previous values
        dataRefA.current = null;
        //Issuing reload after data processing so that the graph can be updated
        if (reloadA === false) {
          console.log(deviceDataAp25.current);
          setReloadA(true);
        }
      })
      .catch((err) => console.log(err));
  };

  //Request to get data of DeviceB and processing the same
  const getDataB = async () => {
    console.log("FROM b");
    await axios(requestB)
      .then((res) => {
        dataRefB.current = res.data;
        //converting the data into array of array with 2 element for rendering graph for the value pm1
        deviceDataBp1.current = dataRefB.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p1];
          });
        //converting the data into array of array with 2 element for rendering graph for the value pm25
        deviceDataBp25.current = dataRefB.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p25];
          });
        //converting the data into array of array with 2 element for rendering graph for the value pm10
        deviceDataBp10.current = dataRefB.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p10];
          });
        //Setting the data to null so that remove previous values
        dataRefB.current = null;
        //Issuing reload after data processing so that the graph can be updated
        if (reloadB == false) {
          setReloadB(true);
        }
        console.log(deviceDataBp10.current);
      })
      .catch((err) => console.log(err));
  };
  //Request to get data of DeviceB and processing the same
  const getDataC = async (request) => {
    console.log("FROM C");
    await axios(requestC)
      .then((res) => {
        dataRefC.current = res.data;
        //converting the data into array of array with 2 element for rendering graph for the value pm1
        deviceDataCp1.current = dataRefC.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p1];
          });
        //converting the data into array of array with 2 element for rendering graph for the value pm25
        deviceDataCp25.current = dataRefC.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p25];
          });
        //converting the data into array of array with 2 element for rendering graph for the value pm10
        deviceDataCp10.current = dataRefC.current
          .sort((a, b) => a - b)
          .map((items) => {
            let temp = dateConverter(items.t);
            return [temp, items.p10];
          });
        //Setting the data to null so that remove previous values
        dataRefC.current = null;
        //Issuing reload after data processing so that the graph can be updated
        if (reloadC === false) {
          setReloadC(true);
        }
      })
      .catch((err) => console.log(err));
  };

  //loading data for deviceA,deviceB,deviceC
  useEffect(() => {
    getDataA();
    getDataB();
    getDataC();
  }, []);
  //Setting high chart option for diplaying pm1 comparision for three location
  const pmOne = {
    chart: {
      type: "spline",
      backgroundColor: "rgba(0,0,0,0)",
      height: (6 / 20) * 100 + "%",
    },
    colors: ["#00ccff", "#00cc33", "#ffbb1a"],
    title: {
      text: "pm1 Comparison",
    },
    yAxis: {
      title: {
        text: "pm",
      },
      Range: true,
    },
    xAxis: {
      title: {
        text: "time",
      },
      type: "datetime",

      labels: {
        format: "{value:%H:%M}",
      },
    },
    series: [
      {
        name: "deviceA",
        data: deviceDataAp1.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "deviceB",
        data: deviceDataBp1.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "deviceC",
        data: deviceDataCp1.current,
        pointInterval: 24 * 3600 * 1000,
      },
    ],
  };
  //Setting high chart option for diplaying pm25 comparision for three location
  const pmTwoFive = {
    chart: {
      type: "spline",
      backgroundColor: "rgba(0,0,0,0)",
      height: (6 / 20) * 100 + "%",
    },
    colors: ["#00ccff", "#00cc33", "#ffbb1a"],
    title: {
      text: "pm25 Comparison",
    },
    yAxis: {
      title: {
        text: "pm",
      },
    },
    xAxis: {
      title: {
        text: "time",
      },
      type: "datetime",

      labels: {
        format: "{value:%H:%M}",
      },
    },
    series: [
      {
        name: "deviceA",
        data: deviceDataAp25.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "deviceB",
        data: deviceDataBp25.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "devicec",
        data: deviceDataCp25.current,
        pointInterval: 24 * 3600 * 1000,
      },
    ],
  };
  //Setting high chart option for diplaying pm10 comparision for three location
  const pmTen = {
    chart: {
      type: "spline",
      backgroundColor: "rgba(0,0,0,0)",
      height: (6 / 20) * 100 + "%",
    },
    colors: ["#00ccff", "#00cc33", "#ffbb1a"],
    title: {
      text: "pm10 Comparison",
    },
    yAxis: {
      title: {
        text: "pm",
      },
    },
    xAxis: {
      title: {
        text: "time",
      },
      type: "datetime",

      labels: {
        format: "{value:%H:%M}",
      },
    },

    series: [
      {
        name: "deviceA",
        data: deviceDataAp10.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "deviceB",
        data: deviceDataBp10.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "devicec",
        data: deviceDataCp10.current,
        pointInterval: 24 * 3600 * 1000,
      },
    ],
  };

  //setting high chart option for displaying pm reading for a device
  const pmComparison = {
    chart: {
      type: "spline",
      backgroundColor: "rgba(0,0,0,0)",
      height: (6 / 20) * 100 + "%",
    },
    colors: ["#00ccff", "#00cc33", "#ffbb1a"],
    title: {
      text: "pm comparison data",
    },
    yAxis: {
      title: {
        text: "pm",
      },
    },
    xAxis: {
      title: {
        text: "time",
      },
      type: "datetime",

      labels: {
        format: "{value:%H:%M}",
      },
    },
    series: [
      {
        name: "pm1",
        data: deviceDataAp1.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "pm25",
        data: deviceDataAp25.current,
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: "pm10",
        data: deviceDataAp10.current,
        pointInterval: 24 * 3600 * 1000,
      },
    ],
  };

  const setLight = () => {
    setdarkMode((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <div className="buttonM">
        <button className="chartButton" onClick={setLight}>
          {darkMode ? "LightMode" : "DarkMode"}
        </button>
      </div>
      <div className={darkMode ? "Chart dark" : "Chart light"}>
        <div>
          <h3>pm1 comparison for three location</h3>
          <HighchartsReact highcharts={Highcharts} options={pmOne} />
        </div>
        <div>
          <h3>pm25 comparison for three location</h3>
          <HighchartsReact highcharts={Highcharts} options={pmTwoFive} />
        </div>
        <div>
          <h3>pm10 comparison for three location</h3>
          <HighchartsReact highcharts={Highcharts} options={pmTen} />
        </div>
        <div>
          <h3>pm comparision for single device</h3>
          <HighchartsReact highcharts={Highcharts} options={pmComparison} />
        </div>
      </div>
    </>
  );
};
export default ThreeDeviceDataChart;
