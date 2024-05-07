import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopNav from "../../topNav";
import Footer from "../../Footer";

function MyItem() {
  const [personal, setPersonal] = useState([]);
  const [gmail, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Check Gmail first
      const response = await axios.get(
        `http://localhost:5050/personal?gmail=${gmail}`
      );
      console.log("Response:", response.data);
      const relevantCard = response.data.personal.filter(
        (personal) => personal.gmail === gmail
      );
      //Display Related Card
      setPersonal(relevantCard);

      if (relevantCard.length === 0) {
        alert("No  found,Plase enter valid Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  /*Delete Code */
  const deleteHandler = async (_id) => {
    //delete Confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5050/personal/${_id}`);
        window.alert("request deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting request details:", error);
      }
    }
  };
  return (
    <div>
      <TopNav />
      <div>
        <div className="from_box_chek">
          <form className="from_nw" onSubmit={handleSubmit}>
            <label className="form_box_item_lable" htmlFor="gmail">
              Enter Your Gmail
            </label>
            <br></br>
            <input
              className="form_box_item_input"
              type="email"
              id="gmail"
              name="gmail"
              value={gmail}
              onChange={handleChange}
              required
            />
            <br></br>
            <button className="admin_form_cneter_btn" type="submit">
              Check
            </button>
          </form>
        </div>
        <div className="tbl_data">
          <table className="table_details_admin">
            <thead>
              <tr className="tble_card_details_tr">
                <th className="admin_tbl_th">gmail</th>
                <th className="admin_tbl_th">type</th>
                <th className="admin_tbl_th">wood</th>
                <th className="admin_tbl_th">case type</th>
                <th className="admin_tbl_th">price</th>
                <th className="admin_tbl_th">status</th>
             
                <th className="admin_tbl_th">Actions</th>
              </tr>
            </thead>
            {personal.map((personal, index) => (
              <tbody>
                <tr key={index}>
                  <td className="admin_tbl_td">{personal.gmail}</td>
                  <td className="admin_tbl_td">{personal.type}</td>
                  <td className="admin_tbl_td">{personal.wood}</td>
                  <td className="admin_tbl_td">{personal.casetype}</td>
                  <td className="admin_tbl_td">{personal.price}</td>
                  <td className="admin_tbl_td">
                    {personal.status ? personal.status : "Not yet replied"}
                  </td>
                  <td className="admin_tbl_td">
                    <Link
                      to={`/updatemyitem/${personal._id}`}
                      className="booknow_btn"
                    >
                      Update
                    </Link>
                    <button
                      className="btn_dash_admin_dlt"
                      onClick={() => deleteHandler(personal._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyItem;
