import { motion } from 'framer-motion';
import { Award, Activity, UserCheck, Zap, Eye, BarChart3, Shield, Code } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';

const Features = () => {
  const features = [
    {
      icon: <Award />,
      title: 'Behaviour-Based Credit Score',
      description: 'Move beyond outdated CIBIL-only models.',
      details: 'AltCred evaluates UPI patterns, digital payments, income habits, and more — creating a 360° behavioural profile of every customer.',
    },
  
    {
      icon: <UserCheck />,
      title: 'First-Time Borrower Scoring',
      description: 'No loan history? No problem.',
      details: 'AltCred identifies creditworthiness for students, gig workers, new employees, freelancers, and first-time borrowers. Unlocks a huge untapped market.',
    },
    {
      icon: <Zap />,
      title: 'Instant Verification & Onboarding',
      description: 'Reduce onboarding time from days to minutes.',
      details: 'Automated KYC, transaction pattern scanning, digital profile building, and instant fraud checks. Smoothest customer onboarding in the lending ecosystem.',
    },
    {
      icon: <Eye />,
      title: 'Transparent, Bias-Free Evaluation',
      description: 'Eliminates human, location, and background bias.',
      details: 'AltCred scoring is based only on real behaviour, not personal identity. Fair evaluation for everyone.',
    },

    {
      icon: <Shield />,
      title: 'Secure & Compliant by Design',
      description: 'Bank-level security and compliance.',
      details: 'Bank-level encryption, no sensitive data leakage, 100% compliant with RBI guidelines, and transparent data usage. Trustworthy infrastructure.',
    },
    {
      icon: <Code />,
      title: 'API-First Integration',
      description: 'Plug-in and start scoring instantly.',
      details: 'Integrate AltCred scoring engine with banking systems, loan apps, BNPL platforms, and fintech backends seamlessly.',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const staggerDelay = (index) => ({ delay: index * 0.1 });

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
      <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              AltCred <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Features</span>
            </h1>
            <p className="text-2xl text-gray-300">
              Designed for lenders. Built for inclusion. Powered by AI.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={staggerDelay(index)}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group relative"
              >
                <div className="p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 h-full">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-6 p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl"
                  >
                    <div className="text-cyan-400 w-10 h-10">{feature.icon}</div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {index + 1}. {feature.title}
                  </h3>
                  <p className="text-cyan-400 text-lg mb-4 font-semibold">{feature.description}</p>
                  <p className="text-gray-300 leading-relaxed">{feature.details}</p>

                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-20 text-center">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/40 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to transform your lending process?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Experience the power of alternative credit scoring
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = '/financial-assessment')}
                className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xl rounded-lg font-bold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
