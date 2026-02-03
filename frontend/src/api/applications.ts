import { apiFetch } from "./client";

export type Application = {
    id: number;
    companyName: string;
    roleTitle: string;
    status: string;
    createdAt: string;
}

export type ApplicationStatus = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";


export async function getApplications(): Promise<Application[]> {
    return apiFetch("/applications")
}

export async function createApplication(data: {
    companyName: string;
    roleTitle: string;
    status: string;
}) {
    return apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function getApplication(id: number) {
    return apiFetch(`/applications/${id}`);
}

export async function editApplication(
    id: number,
    data: {
        companyName: string;
        roleTitle: string;
        status: ApplicationStatus;
    }
) {
    return apiFetch(`/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    })
}

export async function deleteApplication(id: number) {
    return apiFetch(`/applications/${id}`, {
        method: "DELETE",
    });
}