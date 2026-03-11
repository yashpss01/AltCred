import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function ComingSoon() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden flex flex-col">
            <Head>
                <title>Coming Soon | AltCred</title>
            </Head>

            <Navbar />

            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-cyan-500/5 rounded-full blur-[100px]" />
            </div>

            <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl w-full text-center"
                >
                    
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-cyan-500/20"
                        >
                            <Clock className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6">
                            Coming Soon
                        </h1>

                        <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto">
                            We're working hard to bring you this feature.
                            AltCred is currently in development, and we're rolling out new capabilities every week.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/">
                                <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 group w-full sm:w-auto justify-center">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back to Home
                                </button>
                            </Link>

                            <button className="px-8 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-200 border border-white/10 backdrop-blur-sm w-full sm:w-auto">
                                Join Waitlist
                            </button>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
