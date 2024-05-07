import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:5050/additem";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function PersonalizationsHome() {
  const [additem, setAdditem] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setAdditem(data.additem));
  }, []);
  return (
    <div>
      <div className="item_list">
        {additem.map((additem, index) => (
          <div className="box_item">
            <div key={index}>
              <img src={additem.imgurl} alt="imgurl" className="img_additem" />
              <div></div>
              <p>
                <b>Type:</b>
                {additem.type}
              </p>
              <p>
                <b>Wood Type</b>
                {additem.wood}
              </p>
              <p>
                <b>Case Type</b>
                {additem.casetype}
              </p>
              <p className="pric">Rs.{additem.price}.00</p>

              <button
                type="submit"
                onClick={() => (window.location.href = "/requestitem")}
                className="admin_form_cneter_btn"
              >
                Modify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalizationsHome;
