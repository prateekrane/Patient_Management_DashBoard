import React, { useState, useRef } from "react";
import { Save } from "lucide-react"; // Imported only used icon
import axios from "axios";
import Lottie from "react-lottie";
import successAnimation from "../assests/successAnimation.json";

const UploadPrescription = () => {
    const [patientForm, setPatientForm] = useState({
        patientId: "",
        name: "",
        prescription: null,
    });
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) { // Check for file size limit (2 MB)
            alert("File size exceeds 2MB. Please upload a smaller file.");
            fileInputRef.current.value = null; // Reset file input
        } else {
            setPatientForm((prevForm) => ({
                ...prevForm,
                prescription: file,
            }));
        }
    };

    const handleUploadClick = async () => {
        const { patientId, name, prescription } = patientForm;

        if (!patientId || !name || !prescription) {
            alert("Please fill in all fields and upload a valid PDF file.");
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append("prescription", prescription);
        formData.append("id", patientId);
        formData.append("name", name);

        try {
            const response = await axios.post("http://localhost:5000/api/patients/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200 || response.status === 201) {
                setUploadSuccess(true);
                alert("PDF uploaded successfully!");
                setTimeout(() => setUploadSuccess(false), 3000); // Reset success state after 3 seconds
                setPatientForm({ patientId: "", name: "", prescription: null });
                fileInputRef.current.value = null;
            } else {
                alert(`Error: Failed to upload PDF (Status: ${response.status})`);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to upload PDF";
            alert(`Error: ${message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.inputGroup}>
                    <label htmlFor="patientId" style={styles.label}>Patient ID:</label>
                    <input
                        type="text"
                        id="patientId"
                        name="patientId"
                        value={patientForm.patientId}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="name" style={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={patientForm.name}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="prescription" style={styles.label}>Upload Prescription (PDF):</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={styles.input}
                        required
                    />
                </div>

                {uploadSuccess && (
                    <div style={styles.animationContainer}>
                        <Lottie options={{ animationData: successAnimation, loop: false }} height={100} width={100} />
                        <p style={styles.successText}>Upload Successful!</p>
                    </div>
                )}

                <button
                    type="button"
                    style={{
                        ...styles.uploadPrescriptionButton,
                        backgroundColor: isUploading ? "#a2d2ff" : styles.uploadPrescriptionButton.backgroundColor,
                    }}
                    onClick={handleUploadClick}
                    disabled={isUploading}
                >
                    <Save style={{ marginRight: "10px" }} />
                    {isUploading ? "Uploading..." : "Upload Prescription"}
                </button>
            </div>
        </>
    );
};

const styles = {
    container: {
        backgroundColor: "#F0F4F8",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    label: {
        fontSize: "16px",
        color: "#4A4A4A",
        marginBottom: "5px",
        display: "block",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #D1D1D1",
        fontSize: "14px",
    },
    uploadPrescriptionButton: {
        padding: "12px 24px",
        backgroundColor: "#4FACB4",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
    },
    animationContainer: {
        marginTop: "20px",
        textAlign: "center",
    },
    successText: {
        fontSize: "18px",
        color: "#4FACB4",
        marginTop: "10px",
    },
};

export default UploadPrescription;
