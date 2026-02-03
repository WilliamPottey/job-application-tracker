import { apiFetch } from "./client";

export type Application = {
    id: number;
    companyName: string;
    roleTitle: string;
    status: string;
    createdAt: string;
}

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