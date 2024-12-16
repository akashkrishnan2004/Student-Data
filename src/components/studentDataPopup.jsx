import React, { useState } from "react";
import "./studentDataPopup.css";

function StudentDataPopup({ oc, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    class: "",
    stuId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!form.name || form.class <= 0 || form.stuId <= 0) {
      alert("Please provide valid inputs!");
      return;
    }

    // Retrieve existing data for each field
    const names = JSON.parse(localStorage.getItem("names")) || [];
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const stuIds = JSON.parse(localStorage.getItem("stuIds")) || [];

    // Add new entries to each field's array
    names.push(form.name);
    classes.push(form.class);
    stuIds.push(form.stuId);

    // Save updated data back to localStorage
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("classes", JSON.stringify(classes));
    localStorage.setItem("stuIds", JSON.stringify(stuIds));

    // Clear form fields
    setForm({
      name: "",
      class: "",
      stuId: "",
    });

    // Optionally, notify parent component
    onSubmit({
      name: form.name,
      class: form.class,
      stuId: form.stuId,
    });
  };

  return (
    <div className="popupContainer">
      <div className="popup">
        <h1>Add student details </h1>
        <button className="closeBtn" onClick={oc}>
          X
        </button>

        <form onSubmit={handleAddItem} className="dataForm">
          <div className="nameSection">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="classSection">
            <label htmlFor="class">Class</label>
            <input
              type="number"
              name="class"
              value={form.class}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="idSection">
            <label htmlFor="stuId">Student Id</label>
            <input
              type="number"
              name="stuId"
              value={form.stuId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="submitSection">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentDataPopup;
