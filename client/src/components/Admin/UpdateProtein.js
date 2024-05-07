import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function UpdateProtein() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProteinDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9092/api/proteins/admindash/products/${id}`);
        if (response.ok) {
          const json = await response.json();
          setTitle(json.title);
          setCompany(json.company);
          setDescription(json.description);
          setImageSrc(json.imageSrc);
          setPrice(json.price);
        } else {
          setError("Error fetching Protein details");
        }
      } catch (error) {
        console.error("Error fetching Protein details:", error);
        setError("Error fetching Protein details");
      }
    };

    fetchProteinDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const updatedProtein = {
      title,
      company,
      description,
      imageSrc,
      price,
    };

    try {
      const response = await fetch(
        `http://localhost:9092/api/proteins/admindash/products/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedProtein),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        // Redirect to the book list page after a successful update
        navigate("/admindash/products");
      }
    } catch (error) {
      console.error("Error updating Protein:", error);
      setError("Error updating Protein");
    }
  };
  return (
    <div className="ml-80 max-w-96">
      <div className="bg-grey-light rounded-3xl p-8 drop-shadow-md">
        <h3 className="text-lg text-primary mb-4 font-semibold bg-grey">
          Update Protein
        </h3>
        <form
          className="grid "
          onSubmit={handleSubmit}
        >
          <div className="grid">
            <label>Title : </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={`rounded-full p-2 px-5 mb-4 border border-gray-300`}
            />
          </div>

          <div className="grid">
        <label>Company : </label>
        <input
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            className={`rounded-full p-2 px-5 mb-4 border border-gray-300`}
        /></div>


        <div className="grid">
        <label>Description : </label>
        <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={`rounded-full p-2 px-5 mb-4 border border-gray-300`}
        /></div>

        <div className="grid">
        <label>Image Src : </label>
        <input
            type="text"
            onChange={(e) => setImageSrc(e.target.value)}
            value={imageSrc}
            className={`rounded-full p-2 px-5 mb-4 border border-gray-300`}
        /></div>

        <div className="grid">
        <label>Price : </label>
        <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className={`rounded-full p-2 px-5 mb-4 border border-gray-300 w-28`}
        /></div>

          <button className="px-5 py-2 text-lg text-white font-semibold rounded-full border focus:outline-none bg-primary">
            Update Protein
          </button>
          {error && <div className="error ">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default UpdateProtein;