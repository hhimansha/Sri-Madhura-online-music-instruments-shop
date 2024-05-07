// AddProducts.js
import React, { useEffect, useState, useReducer } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useProteinsContext } from "../../hooks/useProteinsContext";
import ManageProteins from "./ManageProteins";

function AddProducts() {
  const { dispatch } = useProteinsContext();
  const { user } = useAuthContext();

  const [proteins, setProteins] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [category, setCategory] = useState(""); // Added category state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const protein = { title, company, imageSrc, description, price, category }; // Include category in the protein object

    const response = await fetch(
      "http://localhost:9092/api/proteins/admindash/products",
      {
        method: "POST",
        body: JSON.stringify(protein),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    forceUpdate();

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setCompany("");
      setDescription("");
      setImageSrc("");
      setPrice("");
      setCategory(""); // Clear category input after successful submission
      setEmptyFields([]);
      dispatch({ type: "CREATE_PROTEIN", payload: json });
    }
  };

  useEffect(() => {
    const fetchProteins = async () => {
      try {
        const response = await fetch("http://localhost:9092/api/proteins/");
        forceUpdate();
        if (response.ok) {
          const json = await response.json();
          setProteins(json);
        }
      } catch (error) {
        console.error("Error fetching proteins:", error);
      }
    };

    fetchProteins();
  }, [reducerValue]);

  return (
    <div className="ml-80 max-w-fit">
      <div className="bg-grey-light rounded-3xl p-8 drop-shadow-md">
        <h3 className="text-lg text-primary mb-4 font-semibold bg-grey">
          Add a New Instrument
        </h3>
        <form
          className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4"
          onSubmit={handleSubmit}
        >
          <div className="mr-5 grid">
            <label>Title :</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={`rounded-full p-2 px-5 mb-4 border border-gray-300 ${
                emptyFields && emptyFields.includes("title") ? "error" : ""
              }`}
            />
          </div>

          <div className="mr-5 grid">
            <label>Company :</label>
            <input
              type="text"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
              className={`rounded-full p-2 px-5 mb-4 border border-gray-300 ${
                emptyFields && emptyFields.includes("company") ? "error" : ""
              }`}
            />
          </div>

          <div className="mr-5 grid">
            <label>Description :</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={`rounded-full p-2 px-5 mb-4 border border-gray-300 ${
                emptyFields && emptyFields.includes("description")
                  ? "error"
                  : ""
              }`}
            />
          </div>

          <div className="mr-5 grid">
            <label>Image Src :</label>
            <input
              type="text"
              onChange={(e) => setImageSrc(e.target.value)}
              value={imageSrc}
              className={`rounded-full p-2 px-5 mb-4 border border-gray-300 ${
                emptyFields && emptyFields.includes("imageSrc") ? "error" : ""
              }`}
            />
          </div>

          <div className="mr-5 grid">
            <label>Select Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`rounded-full p-2 px-5 mb-4 border border-gray-300 ${
                emptyFields && emptyFields.includes("category") ? "error" : ""
              }`}
            >
              <option value="">Select category</option>
              <option value="woodwings">wood wings</option>
              <option value="String">Strings</option>
              <option value="Electrics">Electrics</option>
            </select>
          </div>

          <div className="mr-5 grid">
            <label>Price :</label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className={`rounded-full p-2 px-5 mb-4 border border-gray-300 w-28 ${
                emptyFields && emptyFields.includes("price") ? "error" : ""
              }`}
            />
          </div>

          <button className="col-span-1 px-5 py-2 text-lg text-white font-semibold rounded-full border focus:outline-none bg-primary">
            Add Instrument
          </button>
          {error && <div className="error ">{error}</div>}
        </form>
      </div>

      <ManageProteins proteins={proteins} />
    </div>
  );
}

export default AddProducts;
