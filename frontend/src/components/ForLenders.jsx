import styles from '../styles/globals.css';

export default function ForLenders() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle} style={{ fontSize: '28px' }}>
        Designed for Lenders. Built for Inclusion.
      </h2>
      <p className={styles.lenderTagline} style={{ 
        fontSize:'16px',
        marginBottom:'20px',
        color:'#87ceeb'
      }}>
        Banks • NBFCs • Fintech Partners • BNPL Platforms
      </p>
      <p style={{fontSize: '16px',marginBottom: '10px' }}>
        Offer loans confidently to customers with:
      </p>
      <ul className={styles.featureList}>
        <li>• No credit history</li>
        <li>• Thin-file customers</li>
        <li>• Gig workers</li>
        <li>• Students & early earners</li>
      </ul>
    </section>
  );
}

