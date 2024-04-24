import React, { PureComponent, useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "../css/Graph.css";

export default function Graph() {
  const [data, setdata] = useState([]);
  const findlist = async () => {
    const response = await axios.post(
      "http://localhost:5000/auth/getsublist",
      {},
      { headers: { authtoken: localStorage.getItem("authToken") } }
    );
    const json = await response.data;
    if (json.success) {
      const list = json.sublist;
      const formatt = list.map((item) => ({
        name: item.date,
        uv: item.count,
      }));
      setdata(formatt);
    } else {
      alert(json.error);
    }
  };

  useEffect(() => {
    findlist();
    console.log(data);
  }, []);

  return (
    <div className="graph">
      <ResponsiveContainer width="90%" aspect={3}>
        <BarChart width={150} height={40} data={data} padding="30px 20px ">
          <Bar dataKey="uv" fill="white" width="30px" />
          <XAxis dataKey="name" />
          <YAxis dataKey="uv" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
