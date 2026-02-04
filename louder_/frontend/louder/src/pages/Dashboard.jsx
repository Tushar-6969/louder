import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/events/dashboard") // ✅ FIXED
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("Dashboard fetch failed", err);
        alert("Not authorized");
      })
      .finally(() => setLoading(false));
  }, []);

  const importEvent = async (id) => {
    try {
      await api.post(`/events/${id}/import`);
      setEvents((prev) =>
        prev.map((e) =>
          e._id === id ? { ...e, status: "imported" } : e
        )
      );
      alert("✅ Event imported");
    } catch (err) {
      console.error("Import failed", err);
      alert("❌ Import failed (auth issue)");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📅 Events Dashboard</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((e) => (
                <tr key={e._id}>
                  <td>{e.title}</td>

                  <td>
                    <span
                      className={`badge ${
                        e.status === "imported"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => importEvent(e._id)}
                      disabled={e.status === "imported"}
                    >
                      {e.status === "imported" ? "Imported" : "Import"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
