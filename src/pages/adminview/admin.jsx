import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';
import { interviewerService } from '../../data';
import logo from '../../assets/logo.jpeg';

export default function AdminView() {
  const [interviewers, setInterviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    fetchInterviewers();
  }, []);

  const fetchInterviewers = async () => {
    try {
      const data = await interviewerService.getAllInterviewers();
      setInterviewers(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    const interviewer = interviewers.find(i => i.id === id);
    setSelectedInterviewer(interviewer);
    setEditForm({
      first_name: interviewer.first_name,
      last_name: interviewer.last_name,
      email: interviewer.email,
      department: interviewer.department
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await interviewerService.updateInterviewer(selectedInterviewer.id, editForm);
      const updatedInterviewers = interviewers.map(i => 
        i.id === selectedInterviewer.id ? { ...i, ...editForm } : i
      );
      setInterviewers(updatedInterviewers);
      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
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
          <div className={styles.contentHeader}>
            <h2>Administrator</h2>
          </div>

          <div className={styles.interviewersSection}>
            <div className={styles.tabHeader}>
              <button className={styles.activeTab}>Interviewers</button>
            </div>

            <table className={styles.interviewersTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>Interviewer Name</th>
                  <th>Department</th>
                  <th>Assigned Interviews</th>
                  <th>Completed Interviews</th>
                  <th>Next Scheduled Interview</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviewers.map((interviewer) => (
                  <tr key={interviewer.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{interviewer.first_name} {interviewer.last_name}</td>
                    <td>{interviewer.department}</td>
                    <td>{interviewer.assignedInterviews}</td>
                    <td>{interviewer.completedInterviews}</td>
                    <td>
                      {interviewer.nextSchedule ? 
                        new Date(interviewer.nextSchedule).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        }) + 
                        (new Date(interviewer.nextSchedule).toDateString() === new Date().toDateString() 
                          ? ' (Today)' 
                          : ' (Tomorrow)')
                        : 'No scheduled interviews'}
                    </td>
                    <td className={styles.actions}>
                      <button 
                        className={styles.editBtn}
                        onClick={() => handleEdit(interviewer.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className={styles.viewBtn}
                        onClick={() => handleView(interviewer.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Interviewer Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className={styles.formGroup}>
                <label>First Name:</label>
                <input
                  type="text"
                  value={editForm.first_name}
                  onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={editForm.last_name}
                  onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Department:</label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}