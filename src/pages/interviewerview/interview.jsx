import React, { useState, useEffect } from 'react';
import styles from './interview.module.css';
import { applicantService } from '../../data/applicant-service';
import { scheduleService } from '../../data/scheduleService';
import { interviewerService } from '../../data/interviewer-service';
import logo from '../../assets/logo.jpeg';

export default function InterviewSchedule() {
  const [activeTab, setActiveTab] = useState('applicants');
  const [applicants, setApplicants] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedScores, setSelectedScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModalitySelect, setShowModalitySelect] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [editSchedule, setEditSchedule] = useState(null);
  const [showScoreEdit, setShowScoreEdit] = useState(false);
  const [interviewer, setInterviewer] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    if (activeTab === 'progress') {
      fetchSchedules();
      fetchInterviewer(); // Add this
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'scores') {
      fetchScores();
    }
  }, [activeTab]);

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

  const fetchSchedules = async () => {
    try {
      const data = await scheduleService.getAllSchedules();
      console.log('Fetched schedules:', data); // For debugging
      setSchedules(data.data || []); // Access the data property from the response
    } catch (err) {
      console.error('Error fetching schedules:', err); // For debugging
      setError(err.message);
    }
  };

  const fetchInterviewer = async () => {
    try {
      // Assuming you have the interviewer's ID, replace '1' with actual ID
      const data = await interviewerService.getInterviewerById(1); 
      console.log('Fetched interviewer:', data);
      setInterviewer(data);
    } catch (err) {
      console.error('Error fetching interviewer:', err);
      setError(err.message);
    }
  };

  const fetchScores = async () => {
    try {
      const data = await applicantService.getAllScores();
      console.log('Fetched scores:', data); // For debugging
      setScores(data.data || []); // Access the data property from the response
    } catch (err) {
      console.error('Error fetching scores:', err); // For debugging
      setError(err.message);
    }
  };

  const handleModalitySelect = (applicantId) => {
    setSelectedApplicant(applicantId);
    setShowModalitySelect(true);
  };

  const handleScheduleInterview = async (modality) => {
    try {
      await applicantService.createInterviewSchedule({
        applicant_id: selectedApplicant,
        modality: modality
      });
      setShowModalitySelect(false);
      fetchApplicants(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (schedule) => {
    setEditSchedule(schedule);
    // Add your edit modal logic here
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await scheduleService.deleteSchedule(id);
        fetchSchedules(); // Refresh the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleScoreSelect = (applicantId) => {
    setSelectedScores(prev => {
      if (prev.includes(applicantId)) {
        return prev.filter(id => id !== applicantId);
      }
      return [...prev, applicantId];
    });
  };

  const handleEditScores = () => {
    if (selectedScores.length === 0) {
      alert('Please select applicants to edit scores');
      return;
    }
    setShowScoreEdit(true);
  };

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
              <option value="program">Program</option>
              <option value="status">Status</option>
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
          <div className={styles.contentHeader}>
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

          {showModalitySelect && (
            <div className={styles.modalitySelect}>
              <h3>Select Modality</h3>
              <button onClick={() => handleScheduleInterview('face-to-face')}>
                Face-to-Face
              </button>
              <button onClick={() => handleScheduleInterview('online')}>
                Online Meeting
              </button>
              <button onClick={() => setShowModalitySelect(false)}>
                Cancel
              </button>
            </div>
          )}

          {activeTab === 'applicants' ? (
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
                      <input 
                        type="radio" 
                        name="selectedApplicant"
                        onChange={() => handleModalitySelect(applicant.id)}
                      />
                    </td>
                    <td>{applicant.id}</td>
                    <td>{applicant.last_name}</td>
                    <td>{applicant.first_name}</td>
                    <td>{applicant.middle_name}</td>
                    <td>{applicant.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : activeTab === 'progress' ? (
            <table className={styles.applicantsTable}>
              <thead>
                <tr>
                  <th>Applicant ID</th>
                  <th>Applicant Name</th>
                  <th>Program</th>
                  <th>Interview Progress</th>
                  <th>Time Slot</th>
                  <th>Interviewer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.applicant_id}</td>
                    <td>{`${schedule.applicant?.first_name} ${schedule.applicant?.last_name}`}</td>
                    <td>{schedule.applicant?.department}</td>
                    <td>{schedule.modality}</td>
                    <td>{new Date(schedule.scheduled_at).toLocaleString()}</td>
                    <td>{interviewer ? `${interviewer.first_name} ${interviewer.last_name}` : 'Loading...'}</td>
                    <td>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEdit(schedule)}
                      >
                        Edit
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDelete(schedule.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : activeTab === 'scores' ? (
            <table className={styles.applicantsTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>Applicant No.</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Interview Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr key={score.applicant_id}>
                    <td>
                      <input 
                        type="checkbox"
                        checked={selectedScores.includes(score.applicant_id)}
                        onChange={() => handleScoreSelect(score.applicant_id)}
                      />
                    </td>
                    <td>{score.applicant_id}</td>
                    <td>{score.applicant?.last_name}</td>
                    <td>{score.applicant?.first_name}</td>
                    <td>{score.applicant?.middle_name}</td>
                    <td>{score.score}/100</td>
                    <td>
                      <span className={`${styles.status} ${styles[score.status?.toLowerCase()]}`}>
                        {score.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEditScores(score.applicant_id)}
                      >
                        Edit Score
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </section>
      </main>
    </div>
  );
}
