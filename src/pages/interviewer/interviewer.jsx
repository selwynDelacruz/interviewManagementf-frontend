import React, { useState, useEffect } from 'react';
import styles from './interviewer.module.css';
import logo from '../../assets/logo.jpeg';
import { applicantService } from '../../data/applicantService';

export default function InterviewerView() {
  const [activeTab, setActiveTab] = useState('applicants');
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data = await applicantService.getAllApplicants();
      setApplicants(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={logo} alt="Beastlink University" />
          <h1>Beastlink University</h1>
        </div>
        <nav className={styles.nav}>
          <button>Dashboard</button>
          <button>Schedule List</button>
          <button>Settings and profile</button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.searchContainer}>
            <select className={styles.filterSelect}>
              <option value="">Add filter</option>
            </select>
            <div className={styles.searchBox}>
              <input type="search" placeholder="Search Courses" />
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.notificationBtn}>🔔</button>
            <button className={styles.logoutBtn}>Log out</button>
          </div>
        </header>

        <section className={styles.content}>
          <div className={styles.panelHeader}>
            <h2>Panel: Kiko Pangiliman</h2>
          </div>

          <div className={styles.tabs}>
            <button 
              className={activeTab === 'applicants' ? styles.activeTab : ''}
              onClick={() => setActiveTab('applicants')}
            >
              All Applicants ({applicants.length})
            </button>
            <button 
              className={activeTab === 'progress' ? styles.activeTab : ''}
              onClick={() => setActiveTab('progress')}
            >
              Interview Progress
            </button>
            <button 
              className={activeTab === 'scores' ? styles.activeTab : ''}
              onClick={() => setActiveTab('scores')}
            >
              Scores
            </button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.applicantsTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>Applicant No.</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Program</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>
                      <input type="radio" name="selectedApplicant" />
                    </td>
                    <td>{applicant.id}</td>
                    <td>{applicant.lastName}</td>
                    <td>{applicant.firstName}</td>
                    <td>{applicant.middleName}</td>
                    <td>{applicant.program}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
