import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const url = "https://assig-back.onrender.com";
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [subpack, setSubpack] = useState(false);
  const plans = [
    {
      id: 1,
      name: "Free",
      price: 0,
      validity: 3,
      features: ["Unlimited Requests", "For 3 Days"],
    },
    {
      id: 2,
      name: "Pro",
      price: 5,
      validity: 5,
      features: ["Unlimited Requests", "For 5 Days"],
    },
    {
      id: 3,
      name: "Ultra",
      price: 10,
      validity: 10,
      features: ["Unlimited Requests", "For 10 Days"],
    },
  ];
  const [subDate, setSubDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [datesLeft, setDatesLeft] = useState("");

  useEffect(() => {
    const data = new Date();
    const currentdate = `${data.getFullYear()}-${
      data.getMonth() + 1
    }-${data.getDate()}`;
    const newdate = new Date(expDate);
    const expdate = `${newdate.getFullYear()}-${
      newdate.getMonth() + 1
    }-${newdate.getDate()}`;
    const date1 = new Date(currentdate);
    const date2 = new Date(expdate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDatesLeft(diffDays);
  }, [expDate]);

  const handlecreateclick = async () => {
    try {
      const value = document.querySelector(".inputcre").value;
      if (value === "") {
        alert("Please enter the api key");
        return;
      }
      const response = await axios.post(
        `${url}/auth/createapikey`,
        {
          apikey: value,
        },
        {
          headers: {
            authtoken: localStorage.getItem("authToken"),
          },
        }
      );
      const json = await response.data;
      if (json.success) {
        document.querySelector(".inputcreate").style.display = "none";
        alert("Api Key created successfully");
      } else {
        document.querySelector(".inputcreate").style.display = "none";
        alert(json.error);
      }
    } catch (error) {
      alert("Error in creating the api key");
    }
  };
  const handleinitialclick = () => {
    document.querySelector(".inputcreate").style.display = "block";
  };
  const handlesendreq = () => {
    document.querySelector(".inputcreate2").style.display = "block";
  };
  const handlebuttonclick = () => {
    handlecreateclick();
  };
  const handledelete = async () => {
    try {
      const response = await axios.post(
        `${url}/auth/deleteapikey`,
        {},
        { headers: { authtoken: localStorage.getItem("authToken") } }
      );
      const json = await response.data;
      if (json.success) {
        alert("Api Key deleted successfully");
      } else {
        alert(json.error);
      }
    } catch (error) {
      alert("Error in deleting the api key");
    }
  };
  const handlecopy = async () => {
    try {
      const response = await axios.post(
        `${url}/auth/getapikey`,
        {},
        { headers: { authtoken: localStorage.getItem("authToken") } }
      );
      const json = await response.data;
      if (json.success) {
        navigator.clipboard.writeText(json.apikey);
        alert("Api Key copied successfully");
      } else {
        alert(json.error);
      }
    } catch (error) {
      alert("Error in getting the api key");
    }
  };
  const handleplanclicka = async (value) => {
    const response = await axios.post(
      `${url}/auth/updatesubpack`,
      {
        subpack: value,
      },
      { headers: { authtoken: localStorage.getItem("authToken") } }
    );
    const json = await response.data;
    if (json.success) {
      setView(false);
      alert("Subscription updated successfully");
    } else {
      setView(false);
      alert(json.error);
    }
  };
  const handlesendbutton = async () => {
    const value = document.querySelector(".inputcre2").value;
    const response = await axios.post(
      `${url}/auth/sendrequest`,
      {
        apikey: value,
      },
      {
        headers: { authtoken: localStorage.getItem("authToken") },
      }
    );
    const json = await response.data;
    if (json.success) {
      document.querySelector(".inputcreate2").style.display = "none";
      alert("Request sent successfully");
    } else {
      alert(json.err);
    }
  };
  const handlesub = async () => {
    const response = await axios.post(
      `${url}/auth/getsubpack`,
      {},
      { headers: { authtoken: localStorage.getItem("authToken") } }
    );
    const json = await response.data;
    if (json.success) {
      setSubpack(true);
      setSubDate(json.subDate);
      setExpDate(json.expDate);
    } else {
      alert(json.error);
    }
  };
  return (
    <div>
      {!view && (
        <div className="options">
          <p className="opt" onClick={handlesub}>
            Subscribe Detail
          </p>
          <p className="opt" onClick={handleinitialclick}>
            Crete New Api Key
          </p>
          <p className="opt" onClick={handledelete}>
            Delete Old Api Key
          </p>
          <p className="opt" onClick={handlecopy}>
            Copy the Api Key
          </p>
          <p className="opt" onClick={() => setView(true)}>
            Renew the Subscription
          </p>
          <p className="opt" onClick={handlesendreq}>
            Send the Request
          </p>
          <p className="opt" onClick={() => navigate("/graph")}>
            View the Graph
          </p>
        </div>
      )}
      <div className="inputcreate">
        <input
          type="text"
          className="inputcre"
          placeholder="Enter the Api Key"
        />
        <button onClick={handlebuttonclick}>Create</button>
      </div>
      <div className="inputcreate2">
        <input
          type="text"
          className="inputcre2"
          placeholder="Enter the Api Key"
        />
        <button onClick={handlesendbutton}>Send</button>
      </div>
      <div className="box">
        {view &&
          plans.map((plan) => (
            <div
              key={plan.id}
              className="plan"
              onClick={() => handleplanclicka(plan.validity)}
            >
              <p className="planname">{plan.name}</p>
              <p className="planprice">${plan.price}</p>

              {plan.features.map((feature, index) => (
                <p key={index}>{feature}</p>
              ))}
            </div>
          ))}
      </div>
      {subpack && (
        <div className="detail">
          <p>Subscription Date : `${subDate}`</p>
          <p>Expiry Date : `${expDate}`</p>
          <p>Dates Left : `${datesLeft}`</p>
          <button onClick={() => setSubpack(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
