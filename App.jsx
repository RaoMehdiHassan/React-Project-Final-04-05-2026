// ================= IMPORTS =================
import "./App.css";
import React, { useState, useEffect } from "react";

// React Router (for page navigation)
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";


// ================= MAIN APP =================
function App() {
  return (
    // Router wraps entire app (enables navigation)
    <Router>

      {/* ===== NAVBAR ===== */}
      <nav>
        <h2>Student Course Management System</h2>

        {/* Links for navigation */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/courses">Courses</Link> |{" "}
        <Link to="/add-student">Add Student</Link> |{" "}
        <Link to="/students">Students</Link>
      </nav>

      {/* ===== ROUTES (PAGES) ===== */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/students" element={<Students />} />
      </Routes>

    </Router>
  );
}


// ================= HOME PAGE =================
function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This system helps manage student courses.</p>
    </div>
  );
}


// ================= COURSES PAGE =================
function Courses() {

  // List of courses (static data)
  const courses = [
    { id: 1, name: "React JS", duration: "2 Months", instructor: "Rao" },
    { id: 2, name: "JavaScript", duration: "1.5 Months", instructor: "Asma" },
    { id: 3, name: "Python", duration: "3 Months", instructor: "Mahdi" }
  ];

  return (
    <div >
      <h2>Courses</h2>

      {/* Loop through courses and show CourseCard */}
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}


// ================= COURSE CARD COMPONENT =================
function CourseCard({ course }) {

  // useState to track enroll count
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: "1px solid black", margin: 10, padding: 10 }}>
      
      {/* Display course data using props */}
      <h3>{course.name}</h3>
      <p>Duration: {course.duration}</p>
      <p>Instructor: {course.instructor}</p>

      {/* Button increases count */}
      <button onClick={() => setCount(count + 1)}>
        Enroll
      </button>

      {/* Show updated count */}
      <p>Enrolled Students: {count}</p>

      {/* Link to details page */}
      <Link to={`/course/${course.id}`}>View Details</Link>
    </div>
  );
}


// ================= COURSE DETAILS PAGE =================
function CourseDetails() {

  // Get course ID from URL
  const { id } = useParams();

  // Same course data (for demo)
  const courses = [
    { id: 1, name: "React JS", duration: "2 Months", instructor: "Rao" },
    { id: 2, name: "JavaScript", duration: "1.5 Months", instructor: "Asma" },
    { id: 3, name: "Python", duration: "3 Months", instructor: "Mahdi" }
  ];

  // Find course by ID
  const course = courses.find((c) => c.id === id);

  // If not found
  if (!course) return <p>Course not found</p>;

  return (
    <div>
      <h2>{course.name}</h2>
      <p>Duration: {course.duration}</p>
      <p>Instructor: {course.instructor}</p>
    </div>
  );
}


// ================= ADD STUDENT FORM =================
function StudentForm() {

  // Store form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  // Store submitted data
  const [submitted, setSubmitted] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload

    setSubmitted(form); // save data

    // clear form
    setForm({
      name: "",
      email: "",
      course: ""
    });
  };

  return (
    <div>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>

        {/* Name input */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Name"
          required
        />
        <br />

        {/* Email input */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
        <br />

        {/* Course dropdown */}
        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          <option>React JS</option>
          <option>JavaScript</option>
          <option>Python</option>
        </select>

        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Show submitted data */}
      {submitted && (
        <div>
          <h3>Student Data:</h3>
          <p>Name: {submitted.name}</p>
          <p>Email: {submitted.email}</p>
          <p>Course: {submitted.course}</p>
        </div>
      )}
    </div>
  );
}


// ================= STUDENTS PAGE (API) =================
function Students() {

  // State for data
  const [students, setStudents] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // useEffect runs once when page loads
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching data");
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Show loading
  if (loading) return <p>Loading...</p>;

  // Show error
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Students (API Data)</h2>

      {/* Display student names */}
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}


// ================= EXPORT =================
export default App;