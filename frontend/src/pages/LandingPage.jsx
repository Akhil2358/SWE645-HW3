import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <section className="page page-center">
      <div className="landing-card">
        <h1 className="landing-title">Welcome to the Student Survey Portal</h1>
        <p className="landing-subtitle">
          Share your campus visit experience and help us improve teaching,
          facilities, and student life.
        </p>

        <div className="landing-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/survey/new")}
          >
            Fill Out Survey
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/surveys")}
          >
            View Submitted Data
          </button>
        </div>

        <div className="landing-grid">
          <div className="info-card">
            <h3>Fast</h3>
            <p>Complete the form in under two minutes with a clean layout.</p>
          </div>
          <div className="info-card">
            <h3>Transparent</h3>
            <p>See all surveys (read-only) and how feedback is collected.</p>
          </div>
          <div className="info-card">
            <h3>Actionable</h3>
            <p>Your answers feed into real course and campus improvements.</p>
          </div>
          <div className="info-card">
            <h3>Team Mates Information</h3>
            <p>Akkineni Venkata Akhil  , Tarun datta gondi  ,Varshitha goduguluri   </p>
          </div>
        </div>
      </div>
    </section>
  );
}
