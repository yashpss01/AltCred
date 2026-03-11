'use client';

import "../styles/globals.css";
import DottedBackground from '../components/DottedBackground.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import Footer from '../components/Footer.jsx';

export default function App({ Component, pageProps }) {
    return (
        // <div style={{ cursor: 'none' }}>
        <div>
            <DottedBackground />
            {/* <CustomCursor /> */}
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}
