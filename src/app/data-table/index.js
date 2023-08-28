import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDetails, editDetails } from "../redux/action";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Datatable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const data = useSelector((state) => state.savingdetails.details);
  const details = Object.values(data);
  console.log(details);

  const backFrom = () => {
    navigate("/");
  };
  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleDelete = (userId) => {
    dispatch(deleteDetails(userId));
  };

  const handleEdit = (userId) => {
    const itemToEdit = details.find((item) => item.id === userId);
    setEditData(itemToEdit);
    dispatch(editDetails(userId, itemToEdit));
    navigate("/", {
      state: { userId },
    });
  };
  return (
    <div className="table-container">
      <div className="table-box">
        <div className="table-data">
          <label className="tabular-data-head">Tabular Data Display</label>
          <button type="button" className="add" onClick={() => backFrom()}>
            Add
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Dropdown</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Organisation</th>
              <th>Subevents</th>
              <th>Handled By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {details?.map((item) => (
              <tr key={item.userId}>
                <td>{item.name}</td>
                <td>{item.dropdown}</td>
                <td>{item.description}</td>
                <td>{formatDate(item.startdate)}</td>
                <td>{formatDate(item.enddate)}</td>
                <td>{item.organisation}</td>
                <td>{item.subevents}</td>
                <td>{item.handledby}</td>
                <td className="button-style">
                  <button
                    onClick={() => handleEdit(item.id, { name: "New Name" })}
                    className="add"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="add">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Datatable;
