import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, TrendingUp, Users, Shield, Zap, Activity } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  const features = [
    'Works for first-time borrowers',
    'High accuracy with alternative data',
    'Real-time risk profiling',
    'Transparent and bias-free scoring',
    'Faster onboarding & underwriting',
  ];

  const lenderTypes = [
    { icon: <Activity />, title: 'Banks', description: 'Expand customer base' },
    { icon: <TrendingUp />, title: 'NBFCs', description: 'Reduce risk' },
    { icon: <Users />, title: 'Fintech Partners', description: 'Fast integration' },
    { icon: <Shield />, title: 'BNPL Platforms', description: 'Smart decisions' },
  ];

  const backgroundStyle = {
    minHeight: '100vh',
    backgroundColor: '#0a0a0f',
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
    backgroundSize: '18px 18px',
    animation: 'dots-move 14s linear infinite',
    position: 'relative',
  };

  return (
    <div style={backgroundStyle}>
      <Navbar />
      <div className="relative min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white">Smarter Credit</span>
                  <br />
                  <span className="text-white">Decisions.</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                    Fair Access for Everyone.
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  AltCred is an AI-driven alternative credit scoring platform that unlocks financial
                  opportunity for the millions who are invisible to traditional credit systems.
                </motion.p>
                <motion.div
                  className="flex gap-4 mb-12 flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300"
                    >
                      Start Your Project
                    </motion.button>
                  </Link>
                  <Link href="/About">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300"
                    >
                      Let's Collaborate
                    </motion.button>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex gap-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >

                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    rotateY: [0, 10, 0],
                    rotateX: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-full h-[500px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl backdrop-blur-sm border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 flex items-center justify-center">
                    <Zap className="w-32 h-32 text-cyan-400" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl"></div>
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Using intelligent analysis of{' '}
                <span className="text-cyan-400 font-semibold">UPI behaviour</span>,{' '}
                <span className="text-cyan-400 font-semibold">transaction patterns</span>,{' '}
                <span className="text-cyan-400 font-semibold">digital footprints</span>, and{' '}
                <span className="text-cyan-400 font-semibold">earning stability</span>, AltCred
                builds a real, dynamic, behaviour-based credit score — not just a historical one.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">Why AltCred?</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                Traditional credit scoring misses millions. We measure how you live, not just what you
                borrowed.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
                >
                  <CheckCircle className="w-8 h-8 text-cyan-400 mb-4" />
                  <p className="text-lg text-gray-200">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Designed for Lenders. Built for Inclusion.
              </h2>
              <p className="text-xl text-gray-300">Banks • NBFCs • Fintech Partners • BNPL Platforms</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {lenderTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -10 }}
                  className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl text-center hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4 p-4 bg-cyan-500/20 rounded-full"
                  >
                    <div className="text-cyan-400 w-8 h-8">{type.icon}</div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-gray-400">{type.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-12"
            >
              <h3 className="text-3xl font-bold text-white mb-8">
                Offer loans confidently to customers with:
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'No credit history',
                  'Thin-file customers',
                  'Gig workers',
                  'Students & early earners',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-lg text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Credit for everyone. Intelligence for lenders.
            </h2>
            <p className="text-2xl text-cyan-400 mb-8">That's AltCred.</p>
            <Link href={isAuthenticated ? "/dashboard" : "/login"}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xl rounded-lg font-bold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>

    </div>
  );
};

export default Home;
