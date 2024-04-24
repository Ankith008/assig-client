import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Sign.css";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const url = "https://assig-back.onrender.com";
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    apikey: "",
  });

  const [view, setView] = useState(false);
  const [plan, setPlan] = useState("");
  const [typeselection, setTypeselection] = useState(false);

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleplanclick = (plan) => {
    setPlan(plan);
    setView(!view);
  };

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

  useEffect(() => {
    if (view) {
      document.querySelector("form").style.display = "none";
      document.querySelector(".box").style.display = "flex";
    } else {
      document.querySelector("form").style.display = "block";
      document.querySelector(".box").style.display = "none";
    }
  }, [view]);

  const handlsubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, apikey } = data;

    if (plan === "") {
      alert("Please select a plan");
      return;
    }
    const response = await axios.post(
      `${url}/auth/register`,
      {
        name: name,
        email: email,
        password: password,
        apikey: apikey,
        subpack: plan,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    const json = response.data;
    if (json.success) {
      navigate("/home");
      localStorage.setItem("authToken", json.authToken);
    } else {
      alert("User Not Registered");
    }
  };

  useEffect(() => {
    if (typeselection) {
      document.querySelector(".changing").innerHTML = "Signup";
    } else {
      document.querySelector(".changing").innerHTML = "Login";
    }
  }, [typeselection]);

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    const response = await axios.post(
      `${url}/auth/login`,
      { email: email, password: password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = response.data;
    if (json.success) {
      navigate("/home");
      localStorage.setItem("authToken", json.authToken);
    } else {
      alert("User Not Logged In");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <p className="changing" onClick={() => setTypeselection(!typeselection)}>
        Signup
      </p>
      {!typeselection && (
        <div className="signup">
          <form onSubmit={handlsubmit} className="outer">
            <h1>Sign Up</h1>
            <input
              type="text"
              onChange={onchange}
              placeholder="Username"
              name="name"
              required
              autoComplete="off"
            />
            <input
              type="email"
              onChange={onchange}
              placeholder="Email"
              name="email"
              required
              autoComplete="off"
            />
            <input
              type="password"
              onChange={onchange}
              placeholder="Password"
              name="password"
              required
              autoComplete="off"
            />
            <input
              type="text"
              onChange={onchange}
              placeholder="APIKey"
              name="apikey"
              required
              autoComplete="off"
            />
            <p className="view" onClick={() => setView(!view)}>
              View Plans
            </p>
            <button type="submit">Sign Up</button>
          </form>
          <div className="box">
            {view &&
              plans.map((plan) => (
                <div
                  key={plan.id}
                  className="plan"
                  onClick={() => handleplanclick(plan.validity)}
                >
                  <p className="planname">{plan.name}</p>
                  <p className="planprice">${plan.price}</p>

                  {plan.features.map((feature, index) => (
                    <p key={index}>{feature}</p>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
      {typeselection && (
        <div className="signup">
          <form onSubmit={handlelogin} className="outer">
            <h1>Login</h1>
            <input
              type="email"
              onChange={onchange}
              placeholder="Email"
              name="email"
              required
              autoComplete="off"
            />
            <input
              type="password"
              onChange={onchange}
              placeholder="Password"
              name="password"
              required
              autoComplete="off"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
}
