import React, { useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  FileText,
  BookOpen,
  Stethoscope,
  Save,
} from "lucide-react";
import { jsPDF } from "jspdf"; // Import jsPDF

const Dashboard = () => {
  // Color Palette
  const colors = {
    tealBlue: "#008080",
    lightBlue: "#4FACB4",
    lightGray: "#F0F4F8",
    white: "#FFFFFF",
    textGray: "#4A4A4A",
  };

  // Styles Object
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: colors.lightGray,
    },
    sidebar: {
      width: "250px",
      background: `linear-gradient(to bottom, ${colors.tealBlue}, ${colors.lightBlue})`,
      padding: "20px",
      color: colors.white,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
      color: colors.white,
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
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
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
    },
    inputLabel: {
      marginBottom: "8px",
      fontSize: "14px",
      color: colors.textGray,
    },
    inputField: {
      padding: "10px",
      border: "1px solid #E0E0E0",
      borderRadius: "8px",
      fontSize: "16px",
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
    { icon: FileText, label: "Medical Records", section: "medical-records" },
    { icon: BookOpen, label: "Prescriptions", section: "prescriptions" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPatient = (e) => {
    e.preventDefault();

    // Create PDF document using jsPDF
    const doc = new jsPDF();

    // Set title font and color
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 128, 128); // Teal Blue
    doc.rect(0, 0, 210, 30, "F"); // Draw a rectangle at the top for the header
    doc.text("Patient Registration Report", 15, 20);

    // Add spacing between sections
    const lineHeight = 10;
    let verticalPosition = 40; // Start from this vertical position

    // Set font for details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color for text

    // Patient Details Section
    doc.text(`Name: ${patientForm.name}`, 15, verticalPosition);
    verticalPosition += lineHeight;

    doc.text(`Date: ${patientForm.date}`, 15, verticalPosition);
    verticalPosition += lineHeight;

    doc.text(`Age: ${patientForm.age}`, 15, verticalPosition);
    verticalPosition += lineHeight;

    doc.text(`Diagnosis:`, 15, verticalPosition);
    verticalPosition += lineHeight;
    doc.setFontSize(12);
    doc.text(patientForm.diagnosis, 15, verticalPosition, { maxWidth: 180 });
    verticalPosition += 40; // Add more spacing after diagnosis

    doc.setFontSize(14);
    doc.text(`Prescription:`, 15, verticalPosition);
    verticalPosition += lineHeight;
    doc.setFontSize(12);
    doc.text(patientForm.prescription, 15, verticalPosition, { maxWidth: 180 });

    // Add a footer with a light gray background
    doc.setFillColor(240, 240, 240); // Light gray
    doc.rect(0, 280, 210, 20, "F"); // Light gray footer
    doc.setTextColor(100, 100, 100); // Darker gray for footer text
    doc.setFontSize(10);
    doc.text("MediTrack - Patient Report System", 15, 290);

    // Save the PDF
    doc.save(`${patientForm.name}_patient_report.pdf`);

    console.log("Patient Data Submitted:", patientForm);
    alert("Patient Record Created and PDF Generated!");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
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

      {/* Main Content */}
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
  );
};

export default Dashboard;
