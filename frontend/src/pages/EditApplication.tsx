import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplication, editApplication, type ApplicationStatus } from "../api/applications";


export default function EditApplication() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [companyName, setCompanyName] = useState("");
    const [roleTitle, setRoleTitle] = useState("");
    const [status, setStatus] = useState<ApplicationStatus>("APPLIED")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                if (!id) {
                    return
                }
                const application = await getApplication(Number(id));
                setCompanyName(application.companyName);
                setRoleTitle(application.roleTitle);
                setStatus(application.status);
            } catch {
                setError("Failed to load application");
            } finally {
                setLoading(false)
            }
        }

        load();
    },[id])


    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await editApplication(Number(id), {
                companyName,
                roleTitle,
                status,
            })

            navigate("/applications", {
                state: { refresh: true },
            });
            
        } catch {
            setError("Failed to update application");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: "red"}}>{error}</p>;
    }


    return (
    <>
    <div style={{ padding: "2rem"}}>
        <h1>Edit Application</h1>

        <form onSubmit={handleSubmit}>
            <input 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company"
                required
            />

            <input 
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="Role"
                required
            />

            <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
            >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interviewing</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
            </select>

            <button type="submit">Save Changes</button>
        </form>
    </div>
    </>
)
}