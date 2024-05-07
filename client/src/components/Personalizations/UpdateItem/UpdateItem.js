import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import TopNav from "../../topNav";
import Footer from "../../Footer";

function UpdateItem() {
  const [inputs, setInputs] = useState({
    gmail: "",
    type: "",
    wood: "",
    casetype: "",
    price: 0,
  });

  const history = useNavigate();
  const _id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/personal/${_id}`);
        const data = response.data;
        setInputs(data.personal);
        calculateTotalPrice(data.personal.type, data.personal.wood, data.personal.casetype);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [_id]);

  const calculateTotalPrice = (type, wood, casetype) => {
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

    const totalPrice = prices[type]?.[wood]?.[casetype] || 0;

    setInputs((prevInputs) => ({
      ...prevInputs,
      price: totalPrice,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (name === "type" || name === "wood" || name === "casetype") {
      calculateTotalPrice(
        name === "type" ? value : inputs.type,
        name === "wood" ? value : inputs.wood,
        name === "casetype" ? value : inputs.casetype
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      window.alert("Update successfully!");
      history("/myitem");
    });
  };

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5050/personal/${_id}`, {
        gmail: String(inputs.gmail),
        type: String(inputs.type),
        wood: String(inputs.wood),
        casetype: String(inputs.casetype),
        price: String(inputs.price),
      });
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div>
      <TopNav />
      <div className="fom_main">
        <form onSubmit={handleSubmit} className="from_nw">
          <label className="form_box_item_lable">gmail</label>
          <br />
          <input
            className="form_box_item_input"
            type="email"
            required
            value={inputs.gmail}
            onChange={handleChange}
            name="gmail"
          />
          <br />
          <label className="form_box_item_lable">item type</label>
          <br />
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
          <br />
          <label className="form_box_item_lable">choose the preferred wood</label>
          <br />
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
          <br />
          <label className="form_box_item_lable">choose the case type</label>
          <br />
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
          <br />
          <label className="form_box_item_lable">Total</label>
          <br />
          <input
            className="form_box_item_input"
            type="text"
            readOnly
            value={inputs.price}
            name="price"
          />
          <br />
          <button type="submit" className="admin_form_cneter_btn">
            Update Request
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateItem;
