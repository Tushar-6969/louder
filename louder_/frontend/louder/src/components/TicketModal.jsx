import { useState } from "react";
import api from "../api/axios";

const TicketModal = ({ event, onClose }) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!consent) return alert("Please give consent");
    if (!email) return alert("Please enter your email");

    try {
      setLoading(true);

      await api.post("/leads", {
        email,
        eventId: event._id,
        consent,
      });

      window.location.href = event.originalUrl;
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog-custom">
        <div className="modal-content p-4">
          <h5 className="mb-3">{event.title}</h5>

          <p className="text-muted small">
            Enter your email to continue to ticket booking.
          </p>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="consentCheck"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="consentCheck">
              I agree to receive updates about events
            </label>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
