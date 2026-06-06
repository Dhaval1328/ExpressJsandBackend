import React, { useEffect, useState } from "react";
import axios from "axios";

function Display() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Details</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.pname}</td>
                <td>₹ {item.pprice}</td>
                <td>{item.pdetails}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Display;
