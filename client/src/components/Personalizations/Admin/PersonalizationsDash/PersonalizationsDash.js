import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:5050/personal";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function PersonalizationsDash() {
  //fetch data
  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setPersonal(data.personal));
  }, []);
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.personal.filter((personal) =>
        Object.values(personal).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setPersonal(filtered);
      setNoResults(filtered.length === 0);
    });
  };
  return (
    <div>
      <div className="fulbofy">
        <div className="btn_set">
          <div>
            <tr>
              <td className="">
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  name="search"
                  className="serch_inpt"
                  placeholder="Search Here..."
                ></input>
              </td>

              <td>
                <button onClick={handleSearch} className="booknow_btn">
                  Search
                </button>
              </td>
            </tr>
          </div>
          <button className="booknow_btn" onClick={handlePrint}>
            Generate Report
          </button>
        </div>
        <div className="bok_box_admin" ref={ComponentsRef}>
          <h1 className="topic_personal">
            Customers Request
            <span className="sub_topic_personal"> Details..!</span>
          </h1>
          <br></br>
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
                      to={`/admindash/addstatus/${personal._id}`}
                      className="booknow_btn"
                    >
                      Add Status
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default PersonalizationsDash;
