import React from "react";
import "./topBar.css";

function TopBar({ students, marks }) {
  if (!Array.isArray(students)) {
    return <div className="topBar">Loading...</div>;
  }

  const totalStudents = students.length;

  // Filter students who have marks added
  const studentsWithMarks = marks.reduce((acc, mark) => {
    if (!acc.includes(mark.stuId)) {
      acc.push(mark.stuId);
    }
    return acc;
  }, []);

  const totalPass = studentsWithMarks.filter((stuId) => {
    const studentMarks = marks.filter((mark) => mark.stuId === stuId);
    const averageMarks =
      studentMarks.reduce((sum, mark) => sum + calculateRowTotal(mark), 0) /
      studentMarks.length;
    return averageMarks > 40; // Pass condition: average marks > 40
  }).length;

  const totalFail = studentsWithMarks.length - totalPass;

  return (
    <div className="topBar">
      <h1>Total students: {totalStudents}</h1>
      <h1>Pass: {totalPass}</h1>
      <h1>Fail {totalFail}</h1>
    </div>
  );
}

const calculateRowTotal = (mark) => {
  return (
    (parseFloat(mark.subject1) || 0) +
    (parseFloat(mark.subject2) || 0) +
    (parseFloat(mark.subject3) || 0)
  );
};

export default TopBar;
