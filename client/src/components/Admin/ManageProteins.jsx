import React from "react";
import { useReducer } from "react";
import { useProteinsContext } from "../../hooks/useProteinsContext";
import { useAuthContext } from "../Sell/hooks1/useAuthContext";
import { Link } from "react-router-dom";

const ManageProteins = ({ proteins }) => {
  const { dispatch } = useProteinsContext();
  const { user } = useAuthContext();
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  const handleClick = async (proteinId) => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:9092/api/proteins/admindash/products/${proteinId}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }
      );
      forceUpdate()

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_PROTEIN", payload: json });
      }
    } catch (error) {
      console.error("Error deleting protein:", error);
    }
  };

  
 

  return (
    <div className="bg-grey-light rounded-3xl p-8 drop-shadow-md my-10">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          <th
            colSpan="8"
            className="text-lg text-primary font-semibold bg-grey mb-4 text-left"
          >
            Stored proteins
          </th>
        </tr>
        <tr>
          <th className="w-1/8">Product ID</th>
          <th className="w-1/8">Image</th>
          <th className="w-1/8">Title</th>
          <th className="w-1/8">Company</th>
          <th className="w-1/8">Description</th>
          <th className="w-1/8">Price</th>
          <th className="w-1/8">Action</th>
        </tr>
      </thead>
      <tbody>
        {proteins.map((protein) => (
          <tr key={protein._id} className="my-10">
            <td>{protein._id}</td>
            <td>
              <div className="w-32 h-36">
                <img
                  src={protein.imageSrc}
                  alt={protein.title}
                  className="rounded-t-lg w-32 h-36"
                />
              </div>
            </td>
            <td>{protein.title}</td>
            <td>{protein.company}</td>
            <td className="w-80">{protein.description}</td>
            <td>{protein.price}</td>
            <td>
              <div className="grid gap-2">
                <Link to={`/admindash/products/update/${protein._id}`}>
                <button className="px-5 py-2 text-lg text-white font-semibold rounded-full border focus:outline-none bg-grey">
                  Update
                </button>
                </Link>
                <button
                  className="px-5 py-2 text-lg text-white font-semibold rounded-full border focus:outline-none bg-red-500"
                  onClick={() => {
                    if (window.confirm("Do you want to delete this protein?")) {
                      handleClick(protein._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



  );
};

export default ManageProteins;