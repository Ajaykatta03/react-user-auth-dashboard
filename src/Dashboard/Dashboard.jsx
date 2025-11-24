import React from "react";

export default function Dashboard() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData || !userData.message) {
        return <div className="dashboard-empty">No user data found. Please login.</div>;
    }
    const data = userData.message;
    return (
        <div className="dashboard-container">
            <h2 className="mb-4">Dashboard</h2>
            <table className="table table-bordered dashboard-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Country Row ID</th>
                        <th>Email ID</th>
                        <th>Mobile Number</th>
                        <th>Referral Row ID</th>
                        <th>Referral Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.full_name || "-"}</td>
                        <td>{data.username || "-"}</td>
                        <td>{data.country_row_id || "-"}</td>
                        <td>{data.email_id || "-"}</td>
                        <td>{data.mobile_number || "-"}</td>
                        <td>{data.referral_row_id || "-"}</td>
                        <td>{data.referral_username || "-"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
