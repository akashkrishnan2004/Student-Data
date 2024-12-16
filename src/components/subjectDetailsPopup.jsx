import React, { useState } from "react";
import "./subjectDetailsPopup.css";

function SubjectDetails({ student, onClose, onSubmit }) {
  const [marks, setMarks] = useState({
    exam: "",
    subject1: "",
    subject2: "",
    subject3: "",
  });

  // Safe access of marks input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks({ ...marks, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !marks.exam ||
      marks.subject1 <= 0 ||
      marks.subject2 <= 0 ||
      marks.subject3 <= 0
    ) {
      alert("Please provide valid inputs!");
      return;
    }

    onSubmit(student, marks);
    onClose();
  };

  return (
    <div className="subjectPopupContainer">
      <div className="subjectPopup">
        <h1>Add mark Details</h1>
        {/* Safe rendering of student name */}
        <h3>Add Marks for {student ? student.name : "Unknown Student"}</h3>
        <form onSubmit={handleSubmit} className="dataForm">
          <div className="examName">
            <label>Exam Name</label>
            <input
              type="text"
              name="exam"
              value={marks.exam}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sub1Section">
            <label>Subject 1</label>
            <input
              type="number"
              name="subject1"
              value={marks.subject1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sub2Section">
            <label>Subject 2</label>
            <input
              type="number"
              name="subject2"
              value={marks.subject2}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sub3Section">
            <label>Subject 3</label>
            <input
              type="number"
              name="subject3"
              value={marks.subject3}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submitBtn">
            Submit
          </button>

          <button className="closeBtn" onClick={onClose}>
            X
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubjectDetails;
