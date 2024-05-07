import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
function AddItem() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    imgurl: "",
    type: "",
    wood: "",
    casetype: "",
    price: 0, // Initialize price as a number
  });

  useEffect(() => {
    calculateTotalPrice();
  }, [inputs.type, inputs.wood, inputs.casetype]); // Run the calculation whenever inputs change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const calculateTotalPrice = () => {
    // Define prices for different types of items, woods, and case types
    const prices = {
      yakbera: {
        ehela: {
          "nromal case": 19000,
          "sponged case": 20000,
        },
        kohomba: {
          "nromal case": 16000,
          "sponged case": 17000,
        },
      },
      "geta bera": {
        ehela: {
          "nromal case": 18000,
          "sponged case": 19000,
        },
        kohomba: {
          "nromal case": 21000,
          "sponged case": 22000,
        },
      },
      jamye: {
        ehela: {
          "nromal case": 15000,
          "sponged case": 16000,
        },
        kohomba: {
          "nromal case": 26000,
          "sponged case": 27000,
        },
      },
    };

    // Get the price based on selected inputs
    const totalPrice =
      prices[inputs.type]?.[inputs.wood]?.[inputs.casetype] || 0;

    // Update the price in the state
    setInputs((prevInputs) => ({
      ...prevInputs,
      price: totalPrice,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Item Added Successfully!");
    window.location.reload();
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5050/additem", {
      imgurl: inputs.imgurl,
      type: inputs.type,
      wood: inputs.wood,
      casetype: inputs.casetype,
      price: inputs.price,
    });
  };
  return (
    <div>
      <div className="fom_main">
        <div>
          <form onSubmit={handleSubmit} className="from_nw">
            <label className="form_box_item_lable">imgurl</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              required
              value={inputs.imgurl}
              onChange={handleChange}
              name="imgurl"
            />
            <br></br>
            <label className="form_box_item_lable">item type</label>
            <br></br>
            <select
              className="form_box_item_input"
              value={inputs.type}
              onChange={handleChange}
              name="type"
              required
            >
              <option value="">Select item type</option>
              <option value="yakbera">yakbera</option>
              <option value="geta bera">geta bera</option>
              <option value="jamye">jamye</option>
            </select>
            <br></br>
            <label className="form_box_item_lable">
              choose the preferred wood
            </label>
            <br></br>
            <select
              className="form_box_item_input"
              value={inputs.wood}
              onChange={handleChange}
              name="wood"
              required
            >
              <option value="">choose the preferred wood</option>
              <option value="ehela">ehela</option>
              <option value="kohomba">kohomba</option>
            </select>
            <br></br>
            <label className="form_box_item_lable">choose the case type</label>
            <br></br>
            <select
              className="form_box_item_input"
              value={inputs.casetype}
              onChange={handleChange}
              name="casetype"
              required
            >
              <option value="">choose the case type</option>
              <option value="nromal case">nromal case</option>
              <option value="sponged case">sponged case</option>
            </select>
            <br></br>
            <label className="form_box_item_lable">Total</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              readOnly
              value={inputs.price}
              name="price"
            />
            <br></br>
            <button type="submit" className="admin_form_cneter_btn">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
