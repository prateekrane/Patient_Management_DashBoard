import React, { useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  Stethoscope,
  Save,
  Upload
} from "lucide-react";

import { jsPDF } from "jspdf";
import axios from 'axios';
import PatientList from "./PatientList";
import UploadPrescription from "./UploadPrescription";
import SearchPatient from "./SearchPatient";

const Dashboard = () => {
  const colors = {
    tealBlue: "#008080",
    lightBlue: "#4FACB4",
    lightGray: "#F0F4F8",
    white: "#FFFFFF",
    textGray: "#4A4A4A",
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      gap: "10px"
    },
    sidebar: {
      width: "250px",
      background: `linear-gradient(to bottom, ${colors.tealBlue}, ${colors.lightBlue})`,
      padding: "20px",
      color: colors.white,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      height: "150vh"
    },
    sidebarHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
    },
    sidebarTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginLeft: "10px",
    },
    sidebarMenu: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    sidebarButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      padding: "10px",
      borderRadius: "8px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      backgroundColor: colors.white,
    },
    sidebarButtonActive: {
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    mainContent: {
      flexGrow: 1,
      padding: "30px",
      backgroundColor: colors.lightGray,
    },
    formContainer: {
      backgroundColor: colors.white,
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    formTitle: {
      fontSize: "24px",
      color: colors.tealBlue,
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: colors.tealBlue,
      color: colors.white,
      textAlign: "left",
    },
    tableCell: {
      padding: "10px",
      border: "1px solid #ddd",
    },
    searchInput: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },
    submitButton: {
      backgroundColor: colors.tealBlue,
      color: colors.white,
      padding: "12px 20px",
      border: "none",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    //  formContainer: {
    //   backgroundColor: colors.white,
    //   borderRadius: "12px",
    //   padding: "30px",
    //   boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    // }, 
    // formTitle: {
    //   fontSize: "24px",
    //   color: colors.tealBlue,
    //   display: "flex",
    //   alignItems: "center",
    //   marginBottom: "20px",
    // }, 
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    }, inputContainer: {
      display: "flex",
      flexDirection: "column",
    }, inputLabel: {
      marginBottom: "8px",
      fontSize: "14px",
      color: colors.textGray,
    }, inputField: {
      padding: "10px",
      border: "1px solid #E0E0E0",
      borderRadius: "8px",
      fontSize: "16px",
    },
    //  submitButton: {
    //   backgroundColor: colors.tealBlue,
    //   color: colors.white,
    //   padding: "12px 20px",
    //   border: "none",
    //   borderRadius: "8px",
    //   display: "flex",
    //   alignItems: "center",
    //   cursor: "pointer",
    //   transition: "background-color 0.3s ease",
    // },
    submitPrescriptionButton: {
      backgroundColor: colors.tealBlue,
      color: colors.white,
      padding: "12px 20px",
      border: "none",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginRight: "12px"
    }
  };

  const [activeSection, setActiveSection] = useState("new-patient");
  const [patientForm, setPatientForm] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    age: "",
    diagnosis: "",
    prescription: "",
  });




  const sidebarMenuItems = [
    { icon: Users, label: "Patient List", section: "patient-list" },
    { icon: UserPlus, label: "New Patient", section: "new-patient" },
    { icon: Search, label: "Search Patient", section: "search-patient" },
    { icon: Upload, label: "Upload Prescription", section: "upload-prescription" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmitPatient = async (e) => {
    e.preventDefault();

    // Prepare the patient data for API submission
    const patientData = {
      id: patientForm.patientId,
      patient_id: patientForm.patientId,
      name: patientForm.name,
      age: parseInt(patientForm.age),
      gender: patientForm.gender,
      date: patientForm.date,
      prescription: patientForm.prescription,
      diagnosis: patientForm.diagnosis
    };
    console.log(patientData);

    try {
      // Make API request to store patient data using Axios
      const response = await axios.post('http://localhost:5000/api/patients', patientData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Check if the request was successful
      if (response.status === 200 || response.status === 201) {
        const responseData = response.data;

        // Generate PDF after successful API submission
        const doc = new jsPDF();

        // Calculate center of the page
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const centerX = pageWidth / 2;
        const centerY = pageHeight / 2;

        // Add watermark with light gray color
        doc.setFontSize(60);
        doc.setTextColor(200, 200, 200); // Light gray for semi-transparent effect
        doc.text("Jeevan Jyoti Clinic", centerX, centerY, { angle: 0, align: "center" });

        // Header section
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(0, 128, 128);
        doc.rect(0, 0, 210, 30, "F");
        doc.text("Patient Report", 15, 20);

        const lineHeight = 10;
        let verticalPosition = 40;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);

        doc.text(`Patient ID: ${responseData.id || patientForm.patientId}`, 15, verticalPosition);
        verticalPosition += lineHeight;
        doc.text(`Name: ${patientForm.name}`, 15, verticalPosition);
        verticalPosition += lineHeight;
        doc.text(`Date: ${patientForm.date}`, 15, verticalPosition);
        verticalPosition += lineHeight;
        doc.text(`Age: ${patientForm.age}`, 15, verticalPosition);
        verticalPosition += lineHeight;
        doc.text(`Gender: ${patientForm.gender}`, 15, verticalPosition);
        verticalPosition += lineHeight;
        doc.text("Diagnosis:", 15, verticalPosition);
        verticalPosition += lineHeight;
        doc.setFontSize(12);
        doc.text(patientForm.diagnosis, 15, verticalPosition, { maxWidth: 180 });
        verticalPosition += 40;

        doc.setFontSize(14);
        doc.text("Prescription:", 15, verticalPosition);
        verticalPosition += lineHeight;
        doc.setFontSize(12);
        doc.text(patientForm.prescription, 15, verticalPosition, { maxWidth: 180 });

        // Footer section
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 280, 210, 20, "F");
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(10);
        doc.text("MediTrack - Patient Report System", 15, 290);

        doc.save(`${patientForm.name}_patient_report.pdf`);

        // Show success alert
        alert("Patient Record Created and Stored in Database!");

        // Reset the form fields
        setPatientForm({
          patientId: "",
          name: "",
          age: "",
          gender: "",
          date: "",
          prescription: "",
          diagnosis: ""
        });

      } else {
        // Handle unexpected status codes
        alert(`Error: Failed to create patient record (Status: ${response.status})`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(`Error: ${error.response.data.message || 'Failed to create patient record'}`);
      } else if (error.request) {
        // Request was made but no response received
        alert('No response from server. Please check your connection.');
      } else {
        // Other errors
        alert(`Error: ${error.message}`);
      }
      console.error('Submission error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <Stethoscope size={40} color="white" />
          <span style={styles.sidebarTitle}>MediTrack</span>
        </div>

        <div style={styles.sidebarMenu}>
          {sidebarMenuItems.map((item) => (
            <button
              key={item.section}
              style={{
                ...styles.sidebarButton,
                ...(activeSection === item.section
                  ? styles.sidebarButtonActive
                  : {}),
              }}
              onClick={() => setActiveSection(item.section)}
            >
              <item.icon size={20} style={{ marginRight: "10px" }} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.mainContent}>
        {activeSection === "patient-list" && (<PatientList />)}
        {activeSection === "upload-prescription" && (<UploadPrescription />)}
        {activeSection === "search-patient" && (<SearchPatient />)}
        <div style={styles.mainContent}>
          {activeSection === "new-patient" && (
            <div style={styles.formContainer}>
              <div style={styles.formTitle}>
                <UserPlus style={{ marginRight: "10px" }} />
                New Patient Registration
              </div>

              <form onSubmit={handleSubmitPatient}>
                <div style={styles.formGrid}>
                  <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Patient ID</label>
                    <input
                      type="text"
                      name="patientId"
                      value={patientForm.patientId}
                      onChange={handleInputChange}
                      style={styles.inputField}
                      placeholder="Enter patient ID"
                      required
                    />
                  </div>
                  <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Patient Name</label>
                    <input
                      type="text"
                      name="name"
                      value={patientForm.name}
                      onChange={handleInputChange}
                      style={styles.inputField}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                </div>
                <div style={{
                  ...styles.formGrid,
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px'
                }}>
                  <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={patientForm.age}
                      onChange={handleInputChange}
                      style={styles.inputField}
                      placeholder="Enter patient age"
                      required
                    />
                  </div>
                  <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Gender</label>
                    <select
                      name="gender"
                      value={patientForm.gender}
                      onChange={handleInputChange}
                      style={styles.inputField}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div style={styles.inputContainer}>
                    <label style={styles.inputLabel}>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={patientForm.date}
                      onChange={handleInputChange}
                      style={styles.inputField}
                      required
                    />
                  </div>
                </div>
                <div style={styles.inputContainer}>
                  <label style={styles.inputLabel}>Doctor's Diagnosis</label>
                  <textarea
                    name="diagnosis"
                    value={patientForm.diagnosis}
                    onChange={handleInputChange}
                    style={{
                      ...styles.inputField,
                      minHeight: "150px",
                    }}
                    placeholder="Enter detailed medical diagnosis"
                    required
                  ></textarea>
                </div>
                <div style={styles.inputContainer}>
                  <label style={styles.inputLabel}>Prescription</label>
                  <textarea
                    name="prescription"
                    value={patientForm.prescription}
                    onChange={handleInputChange}
                    style={{
                      ...styles.inputField,
                      minHeight: "150px",
                    }}
                    placeholder="Write prescribed medicines and dosage"
                    required
                  ></textarea>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >



                  <button type="submit" style={styles.submitButton}>
                    <Save style={{ marginRight: "10px" }} /> Save Patient Record
                  </button>



                </div>
              </form>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};
export default Dashboard;