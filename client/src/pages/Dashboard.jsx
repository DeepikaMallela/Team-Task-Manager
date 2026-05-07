import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTaskHandler = async (e) => {
  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    const res = await API.post(
      "/tasks",
      {
        title: title.trim(),
        description: description.trim(),
        priority,
        status: "To Do",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    alert("Task Created Successfully");

    setTitle("");
    setDescription("");
    setPriority("Medium");

    fetchDashboard();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Task creation failed"
    );
  }
};

  const updateStatusHandler = async (taskId, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${taskId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskHandler = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchDashboard();

      alert("Task Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <button
        onClick={logoutHandler}
        style={{
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          float: "right",
          marginBottom: "20px",
          borderRadius: "6px",
        }}
      >
        Logout
      </button>

      <h1
        style={{
          marginBottom: "30px",
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        Dashboard
      </h1>

      {dashboardData && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h2>Total Tasks</h2>
              <p>{dashboardData.totalTasks}</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h2>To Do</h2>
              <p>{dashboardData.todoTasks}</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h2>In Progress</h2>
              <p>{dashboardData.inProgressTasks}</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h2>Completed</h2>
              <p>{dashboardData.completedTasks}</p>
            </div>
          </div>

          <form
            onSubmit={createTaskHandler}
            style={{
              marginTop: "40px",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Create Task
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="text"
              placeholder="Assign User ID"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                cursor: "pointer",
                display: "block",
                margin: "auto",
                borderRadius: "6px",
              }}
            >
              Create Task
            </button>
          </form>

          <div
            style={{
              marginTop: "40px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "white",
                textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              Tasks
            </h2>

            {dashboardData.tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(12px)",
                  padding: "20px",
                  borderRadius: "16px",
                  marginTop: "15px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  borderLeft:
                    task.priority === "High"
                      ? "6px solid red"
                      : task.priority === "Medium"
                      ? "6px solid orange"
                      : "6px solid green",
                }}
              >
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>

                <p>
                  <strong>Assigned To:</strong>{" "}
                  {task.assignedTo?.name}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatusHandler(
                        task._id,
                        e.target.value
                      )
                    }
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>

                  <button
                    onClick={() => deleteTaskHandler(task._id)}
                    style={{
                      marginLeft: "15px",
                      padding: "6px 12px",
                      background: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;