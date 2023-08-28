import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editDetails, saveDetails } from "../redux/action";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location?.state?.userId;
  const nameValidationRegex = /^[A-Za-z\s\-]+$/;
  const textValidationRegex = /^[A-Za-z\s]+$/;
  const [errors, setErrors] = useState({
    name: false,
    organisation: false,
    handledby: false,
    description: false,
    subevents: false,
  });
  const data = useSelector((state) => state.savingdetails.details);
  const datauserId = data.find((item) => item.id === userId);
  const [datastate, setDatastate] = useState(
    datauserId
      ? { ...datauserId }
      : {
          id: uuidv4(),
          name: "",
          dropdown: "",
          startdate: null,
          enddate: null,
          description: "",
          handledby: "",
          organisation: "",
          subevents: "",
        }
  );

  const handleInputChange = (fieldName, value) => {
    const validationRegex =
      fieldName === "name" ? nameValidationRegex : textValidationRegex;
    const isValidInput = validationRegex.test(value);
    setErrors({ ...errors, [fieldName]: !isValidInput });
    setDatastate({ ...datastate, [fieldName]: value });
  };
  const navigateTablePage = () => {
    if (datauserId) {
      dispatch(editDetails(datauserId.id,datastate));
    } else {
      dispatch(saveDetails(datastate));
    }
    navigate("/showDetails");
  };
  return (
    <div className="page-container">
      <div className="detail-container">
        <label className="form-heading">Please fill this form</label>
        <div className="first-div">
          <div className="fullname">
            <label className="name-head">Full Name</label>
            <input
              type="text"
              name="name"
              value={datastate.name}
              placeholder="enter your full name"
              className={`type-text ${errors.name ? "error" : ""}`}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {errors.name && <span className="error-message">Invalid Name</span>}
          </div>
          <div className="type-dropdown-select">
            <label className="type-head">Type dropdown</label>
            <select
              value={datastate.dropdown}
              onChange={(e) =>
                setDatastate({ ...datastate, dropdown: e.target.value })
              }
              className="form-select"
            >
              <option value="" style={{ color: "gray" }}>
                Select a type
              </option>
              <option value="sports">Sports</option>
              <option value="music">Music</option>
              <option value="general">General</option>
              <option value="children">Children</option>
              <option value="school">School</option>
            </select>
          </div>
        </div>
        <div className="second-div">
          <div className="name">
            <label className="name-head">Start date(dd-MM-yyyy)</label>
            <DatePicker
              selected={datastate.startdate}
              className="type-text"
              dateFormat="dd-MM-yyyy"
              required
              placeholderText="Select a start date"
              onChange={(date) =>
                setDatastate({ ...datastate, startdate: date })
              }
            />
          </div>
          <div className="type-dropdown">
            <label className="type-head">End date(dd-MM-YYYY)</label>
            <DatePicker
              selected={datastate.enddate}
              className="type-text"
              dateFormat="dd-MM-yyyy"
              required
              placeholderText="Select a end date"
              onChange={(date) => setDatastate({ ...datastate, enddate: date })}
            />
          </div>
        </div>
        <div className="third-div">
          <div className="name">
            <label className="name-head">Description</label>
            <input
              value={datastate.description}
              type="text"
              name="description"
              placeholder="enter description"
              className={`type-text ${errors.description ? "error" : ""}`}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            {errors.description && (
              <span className="error-message">Invalid description</span>
            )}
          </div>
          <div className="type-dropdown">
            <label className="type-head">Handled By</label>
            <input
              type="text"
              name="handledby"
              value={datastate.handledby}
              placeholder="enter handleded by"
              className={`type-text ${errors.handledby ? "error" : ""}`}
              onChange={(e) => handleInputChange("handledby", e.target.value)}
            />
            {errors.handledby && (
              <span className="error-message">Invalid handled by</span>
            )}
          </div>
        </div>
        <div className="fourth-div">
          <div className="name">
            <label className="name-head">Organisation</label>
            <input
              value={datastate.organisation}
              type="text"
              name="organisation"
              placeholder="enter Organisation"
              className={`type-text ${errors.organisation ? "error" : ""}`}
              onChange={(e) =>
                handleInputChange("organisation", e.target.value)
              }
            />
            {errors.organisation && (
              <span className="error-message">Invalid Organisation</span>
            )}
          </div>
          <div className="type-dropdown">
            <label className="type-head">Sub-events</label>
            <input
              value={datastate.subevents}
              type="text"
              name="subevents"
              placeholder="enter sub-events"
              className={`type-text ${errors.subevents ? "error" : ""}`}
              onChange={(e) => handleInputChange("subevents", e.target.value)}
            />
            {errors.subevents && (
              <span className="error-message">Invalid sub-events</span>
            )}
          </div>
        </div>

        <button type="submit" className="submit" onClick={navigateTablePage}>
          {datauserId ? "Edit" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
