import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>School Dashboard</h1>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h2>Students</h2>
          <p>1,240 enrolled</p>
        </div>
        <div className={styles.card}>
          <h2>Teachers</h2>
          <p>85 active</p>
        </div>
        <div className={styles.card}>
          <h2>Attendance</h2>
          <p>93% today</p>
        </div>
        <div className={styles.card}>
          <h2>Reports</h2>
          <p>12 pending</p>
        </div>
      </div>
    </div>
  );
}
