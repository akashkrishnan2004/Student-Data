import React, { useEffect, useState } from "react";
import "./subjectDetails.css";

const StudentSubjectDetails = ({ studentId, marks }) => {
  const [filteredMarks, setFilteredMarks] = useState([]);

  useEffect(() => {
    const loadMarks = () => {
      const studentMarks = marks.filter((mark) => mark.stuId === studentId);
      setFilteredMarks(studentMarks);
    };

    loadMarks();
  }, [studentId, marks]);

  const calculateTotalMarks = (subject) => {
    return filteredMarks.reduce(
      (total, mark) => total + (parseFloat(mark[subject]) || 0),
      0
    );
  };

  const calculateRowTotal = (mark) => {
    return (
      (parseFloat(mark.subject1) || 0) +
      (parseFloat(mark.subject2) || 0) +
      (parseFloat(mark.subject3) || 0)
    );
  };

  const calculateRowAverage = (mark) => {
    return (calculateRowTotal(mark) / 3).toFixed(2);
  };

  const calculateTotalOfAllTotals = () => {
    return filteredMarks.reduce(
      (total, mark) => total + calculateRowTotal(mark),
      0
    );
  };

  return (
    <div>
      <h1>Mark Details</h1>
      <h4>Mark of {studentId}</h4>
      {/* <h2>Mar for {names}</h2> */}
      <table className="subjectTable">
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Subject 1</th>
            <th>Subject 2</th>
            <th>Subject 3</th>
            <th>Total Marks</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {filteredMarks.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No marks added yet.
              </td>
            </tr>
          ) : (
            <>
              {filteredMarks.map((mark, index) => (
                <tr key={index}>
                  <td>{mark.exam}</td>
                  <td>{mark.subject1}</td>
                  <td>{mark.subject2}</td>
                  <td>{mark.subject3}</td>
                  <td>{calculateRowTotal(mark)}</td>
                  <td>{calculateRowAverage(mark)}</td>
                </tr>
              ))}
              <tr className="totalMarkSection">
                <td>Total</td>
                <td>{calculateTotalMarks("subject1")}</td>
                <td>{calculateTotalMarks("subject2")}</td>
                <td>{calculateTotalMarks("subject3")}</td>
                <td>{calculateTotalOfAllTotals()}</td>
                <td>----</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSubjectDetails;
