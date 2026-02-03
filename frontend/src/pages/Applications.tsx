import { useEffect, useState } from "react";
import { getApplications, type Application } from "../api/applications";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const { logout } = useAuth();

    useEffect(() => {
        async function loadApplications() {
            try {
                const applicationsData = await getApplications();
                setApplications(applicationsData)
            } catch {
                setError("Failed to load applications");
            } finally {
                setLoading(false);
            }
        }

        loadApplications();
 
    }, [location.state]);

    if(loading) {
        return <p>Loading applications...</p>;
    }

    if(error) {
        return <p style={{ color: "red"}}>{error}</p>;
    }

    return (
        <>
        <div style={{ padding: "2rem" }}>
            <h1>My Applications</h1>

            <button
                onClick={() => {
                    logout();
                    navigate("/login")
                }}
                style={{ marginRight: "1rem" }}
            >
                Logout
            </button>
            <button 
                onClick={() => navigate("/applications/new")}
                style={{ marginBottom: "1rem" }}
            >
                Add New Application
            </button>

            <table>
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Applied</th>
                </tr>
                </thead>
                <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                    <td>{app.companyName}</td>
                    <td>{app.roleTitle}</td>
                    <td>{app.status}</td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
  );
}