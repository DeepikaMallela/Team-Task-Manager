import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
 "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop')",
    backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      ></div>

      {/* Main Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "500px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "10px",
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          Team Task Manager
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            lineHeight: "30px",
            marginBottom: "30px",
          }}
        >
          Manage projects and tasks efficiently with secure
          role-based access and real-time task tracking.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <Link to="/login">
            <button
              style={{
                padding: "12px 35px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button
              style={{
                padding: "12px 35px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Signup
            </button>
          </Link>
        </div>

        {/* Features */}
        <div>
          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            Features
          </h2>

          <ul
            style={{
              lineHeight: "35px",
              fontSize: "18px",
            }}
          >
            <li>JWT Authentication</li>
            <li>Role-Based Access Control</li>
            <li>Task Assignment</li>
            <li>Dashboard Analytics</li>
            <li>Task Status Updates</li>
            <li>Professional Dashboard UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;