import styles from "./AdmissionCriteria.module.css";

export default function AdmissionCriteria() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Admission Criteria Page</h1>
      <p className={styles.description}>
        This page provides information about the admission criteria.
      </p>
    </div>
  );
}