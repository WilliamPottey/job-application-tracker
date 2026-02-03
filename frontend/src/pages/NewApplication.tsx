import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { createApplication } from "../api/applications";

export default function NewApplication() {
    const [companyName, setCompanyName] = useState("");
    const [roleTitle, setRoleTitle] = useState("");
    const [status, setStatus] = useState("APPLIED");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await createApplication({ companyName, roleTitle, status });
            navigate("/applications");
        } catch {
            setError("Failed to create new Application");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => navigate("/applications")}
            >
                Back
            </button>

            <div style={{ padding: "2rem" }}>
                <h1>Add New Application</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text"
                            placeholder="Company"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="text"
                            placeholder="Role"
                            value={roleTitle}
                            onChange={(e) => setRoleTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="APPLIED">Applied</option>
                            <option value="INTERVIEW">INTERVIEW</option>
                            <option value="OFFER">OFFER</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading? "Saving..." : "Save"}
                    </button>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                </form>
            </div>
        </>
    )
}