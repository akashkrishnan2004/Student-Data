import React, { useState, useEffect } from "react";
import "./studentDetails.css";
import StudentDataPopup from "./studentDataPopup";
import SubjectDetails from "./subjectDetailsPopup";
import StudentSubjectDetails from "./SubjectDetails";

function StudentsDetails() {
  const [isOpen, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showMarksFor, setShowMarksFor] = useState(null);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const names = JSON.parse(localStorage.getItem("names")) || [];
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const stuIds = JSON.parse(localStorage.getItem("stuIds")) || [];

    const loadedStudents = names.map((name, index) => ({
      name,
      class: classes[index],
      stuId: stuIds[index],
    }));

    setStudents(loadedStudents);
    const storedMarks = JSON.parse(localStorage.getItem("marks")) || [];
    setMarks(storedMarks);
  }, []);

  const togglePopup = () => {
    setOpen(!isOpen);
  };

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    togglePopup();
  };

  const handleNameClick = (student) => {
    setShowMarksFor((prev) => (prev === student.stuId ? null : student.stuId));
  };

  const handleMarkBtnClick = (student) => {
    setSelectedStudent(student);
  };

  const handleMarksSubmit = (student, newMarks) => {
    const updatedStudents = students.map((stu) =>
      stu.stuId === student.stuId ? { ...stu, marks: newMarks } : stu
    );
    setStudents(updatedStudents);

    const existingMarks = JSON.parse(localStorage.getItem("marks")) || [];
    existingMarks.push({ ...newMarks, stuId: student.stuId });
    localStorage.setItem("marks", JSON.stringify(existingMarks));
    setMarks(existingMarks); // Update state to refresh marks table

    setSelectedStudent(null);
  };

  const totalStudents = students.length;
  const totalPass = students.filter((student) => student.stuId % 2 === 0).length; // Example: Even student IDs are considered "pass"
  const totalFail = totalStudents - totalPass;

  return (
    <div className="main-container">
      <h1>Student Details</h1>
      <div className="left-side">
        {isOpen && <StudentDataPopup oc={togglePopup} onSubmit={addStudent} />}
        {selectedStudent && (
          <SubjectDetails
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
            onSubmit={handleMarksSubmit}
          />
        )}
        <table className="studentTable">
          <thead>
            <tr>
              {/* <th colSpan="1">Total students: {totalStudents}</th> */}
              <th colSpan="4">
                <button className="addBtn" onClick={togglePopup}>
                  Add Students
                </button>
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Class</th>npm run dev
              <th>Student ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No students added yet.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.stuId}>
                  <td
                    onClick={() => handleNameClick(student)}
                    style={{ cursor: "pointer", }}
                  >
                    {student.name}
                  </td>
                  <td>{student.class}</td>
                  <td>{student.stuId}</td>
                  <td>
                    <button
                      className="markBtn"
                      onClick={() => handleMarkBtnClick(student)}
                    >
                      Add Mark
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="right-side">
        {showMarksFor && (
          <StudentSubjectDetails studentId={showMarksFor} marks={marks} />
        )}
      </div>
    </div>
  );
}

export default StudentsDetails;
