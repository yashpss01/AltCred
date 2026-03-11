import styles from '../styles/globals.css';

export default function WhyAltCred() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Why AltCred?</h2>
      <p className={styles.italicText}>
        Traditional credit scoring misses millions.<br/>
        We measure <em>how you live</em>, not just <em>what you borrowed</em>.
      </p>
      <ul className={styles.featureList}>
        <li>✓ Works for first-time borrowers</li>
        <li>✓ High accuracy with alternative data</li>
        <li>✓ Real-time risk profiling</li>
        <li>✓ Transparent and bias-free scoring</li>
        <li>✓ Faster onboarding & underwriting</li>
      </ul>
    </section>
  );
}

