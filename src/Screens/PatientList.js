import React, { useState, useEffect } from 'react';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure the loading screen is visible for at least 1.5 seconds
        setTimeout(() => {
          setPatients(data);
          setLoading(false);
        }, 1500);
      } catch (err) {
        setTimeout(() => {
          setError('Failed to fetch patients');
          setLoading(false);
        }, 1500);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Patient List</h2>
      {patients.length === 0 ? (
        <div style={styles.noData}>No patients found</div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Age</th>
                <th style={styles.tableHeader}>Date</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{patient.id}</td>
                  <td style={styles.tableCell}>{patient.name}</td>
                  <td style={styles.tableCell}>{patient.age}</td>
                  <td style={styles.tableCell}>
                    {new Date(patient.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const colors = {
  tealBlue: "#008080",
  lightBlue: "#4FACB4",
  lightGray: "#F0F4F8",
  white: "#FFFFFF",
  textGray: "#4A4A4A",
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: colors.lightGray,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: colors.tealBlue,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    backgroundColor: colors.white,
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: colors.tealBlue,
    color: colors.white,
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: `1px solid ${colors.lightGray}`,
    ':hover': {
      backgroundColor: colors.lightBlue,
    },
  },
  tableCell: {
    padding: '12px',
    fontSize: '14px',
    color: colors.textGray,
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
    marginTop: '40px',
  },
  noData: {
    textAlign: 'center',
    fontSize: '16px',
    color: colors.textGray,
    marginTop: '20px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: colors.lightGray,
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #f3f3f3',
    borderTop: `6px solid ${colors.tealBlue}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add CSS animation for the spinner
const spinnerStyle = document.createElement('style');
spinnerStyle.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

export default PatientList;
