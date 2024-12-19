import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPatient = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState([]);

    // Function to search for patients based on the searchTerm
    const searchPatients = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/patients/search?name=${searchTerm}`
            );
            setPatients(response.data); // Set the patients list in the state
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    // Use Effect to trigger search on searchTerm change
    useEffect(() => {
        if (searchTerm) {
            searchPatients(); // Call search function on term change
        } else {
            setPatients([]); // Clear patients if searchTerm is empty
        }
    }, [searchTerm]);

    // Function to download patient PDF
    const downloadPatientPDF = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/patients/${id}/pdf`,
                { responseType: "blob" } // To handle file download
            );
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `patient_${id}_prescription.pdf`; // Set filename
            a.click(); // Trigger download
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    // Function to handle Delete action
    const deletePatient = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/patients/${id}`
            );
            setPatients((prevPatients) => prevPatients.filter((p) => p.id !== id)); // Remove deleted patient from list
            alert("Patient deleted successfully!");
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Search Patient</h2>
            <input
                style={styles.searchInput}
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Age</th>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.date}</td>
                            <td style={styles.actionsCell}>
                                <button
                                    style={styles.button}
                                    onClick={() => downloadPatientPDF(patient.id)}
                                >
                                    View PDF
                                </button>
                                <button
                                    style={styles.button}
                                    onClick={() => deletePatient(patient.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    formContainer: {
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#F0F4F8", // lightGray
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    formTitle: {
        fontSize: "24px",
        marginBottom: "10px",
        color: "#008080", // tealBlue
    },
    searchInput: {
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#FFFFFF", // white
        color: "#4A4A4A", // textGray
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    tableHeader: {
        padding: "10px",
        textAlign: "left",
        backgroundColor: "#4FACB4", // lightBlue
        color: "#FFFFFF", // white
    },
    actionsCell: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        padding: "8px 16px",
        backgroundColor: "#008080", // tealBlue
        color: "#FFFFFF", // white
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#4FACB4", // lightBlue
    },
};

export default SearchPatient;
