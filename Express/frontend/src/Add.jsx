import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();

  const [txt1, setTxt1] = useState("");
  const [txt2, setTxt2] = useState("");
  const [txt3, setTxt3] = useState("");

  const saveData = () => {
    const myobj = {
      pname: txt1,
      pprice: Number(txt2),
      pdetails: txt3,
    };

    axios
      .post("http://127.0.0.1:3000/addData", myobj)
      .then((res) => {
        console.log(res.data);

        alert(res.data.message);

        // Clear input fields
        setTxt1("");
        setTxt2("");
        setTxt3("");

        // Redirect to Display page
        navigate("/display");
      })
      .catch((err) => {
        console.log(err);

        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("Something went wrong!");
        }
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Product</h1>

      <div>
        <label>Product Name:</label>
        <br />
        <input
          type="text"
          value={txt1}
          onChange={(e) => setTxt1(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Product Price:</label>
        <br />
        <input
          type="number"
          value={txt2}
          onChange={(e) => setTxt2(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Product Details:</label>
        <br />
        <input
          type="text"
          value={txt3}
          onChange={(e) => setTxt3(e.target.value)}
        />
      </div>

      <br />

      <button onClick={saveData}>Save Data</button>
    </div>
  );
}

export default Add;
