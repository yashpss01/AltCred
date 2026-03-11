import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Eye, Lightbulb, TrendingUp, Shield, Users, Zap, Check } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';

const About = () => {
  const traditionalReasons = [
    'Old loan history',
    'Bank statements',
    'CIBIL-dependent records',
  ];

  const alternativeReasons = [
    'UPI payments',
    'Rent behavior',
    'Digital bill payments',
    'Income stability',
    'Real-time spending patterns',
  ];
  const behavioralSignals = [
    'Cashflow patterns',
    'Bill payment history',
    'Monthly spending discipline',
    'Earning consistency',
    'Digital reliability',
  ];

  const benefitCards = [
    { icon: <Shield />, text: 'Lenders reduce risk' },
    { icon: <Users />, text: 'Borrowers get fair opportunities' },
    { icon: <Zap />, text: 'Fintechs onboard faster' },
  ];

  const partnerOrganizations = [
    'Banks',
    'NBFCs',
    'Digital lenders',
    'BNPL platforms',
    'Fintech apps needing real-time scoring',
    'Companies offering salary advances',
  ];

  const companyPromises = [
    'Bias-free credit evaluation',
    'Transparent scoring rules',
    'User-first experience',
    'Secure, encrypted data processing',
  ];

  const visionPoints = [
    'No one is rejected just because they never took a loan.',
    'Young earners get equal opportunities.',
    'Financial inclusion is powered by intelligence, not outdated systems.',
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
            <h1 className="text-6xl font-bold text-white mb-8">
              About <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">AltCred</span>
            </h1>
            <p className="text-2xl text-gray-300 leading-relaxed max-w-5xl mx-auto">
              Millions of people use UPI, earn regularly, pay bills, and manage money responsibly — yet
              still remain "unscored" or "invisible" to traditional credit systems.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-cyan-400 mt-8"
            >
            AltCred solves this.
            </motion.p>
          </motion.div>

          <motion.section {...fadeInUp} className="mb-24">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src="/Screenshot_2025-11-30_at_12.24.33_PM-removebg-preview.png"
                    alt="AltCred Mission"
                    width={500}
                    height={400}
                    className="object-contain w-full h-full"
                  />
                </div>
              </motion.div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-12">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-12 h-12 text-cyan-400" />
                  <h2 className="text-4xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  Give every individual a financial identity that truly reflects their real-life behaviour.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section {...fadeInUp} className="mb-24">
            <h2 className="text-5xl font-bold text-white mb-12">Why We Exist</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-10"
              >
                <h3 className="text-2xl font-bold text-gray-400 mb-8">Traditional credit scoring focuses on:</h3>
                <div className="space-y-4">
                  {traditionalReasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={staggerDelay(index)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-lg text-gray-400">{reason}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-10"
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-8">But what about:</h3>
                <div className="space-y-4">
                  {alternativeReasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={staggerDelay(index)}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-cyan-400" />
                      <span className="text-lg text-gray-200">{reason}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl text-center text-cyan-400 mt-12 font-semibold"
            >
            These tell a truer financial story — and AltCred uses them.
            </motion.p>
          </motion.section>

          <motion.section {...fadeInUp} className="mb-24">
            <h2 className="text-5xl font-bold text-white mb-12">What We Do</h2>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-12 mb-8">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                AltCred analyzes <span className="text-cyan-400 font-bold">100+ behavioural and transactional signals</span> such as:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {behavioralSignals.map((signal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={staggerDelay(index)}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-cyan-400" />
                      <span className="text-lg text-gray-200">{signal}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/40 rounded-2xl p-10"
            >
              <p className="text-xl text-gray-200 leading-relaxed">
                Using these signals, our AI engine builds a{' '}
                <span className="text-cyan-400 font-bold">dynamic, behaviour-based credit score</span> that
                updates in real time — not once a year.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {benefitCards.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={staggerDelay(index)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl text-center hover:border-cyan-500/50 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4 p-4 bg-cyan-500/20 rounded-full"
                  >
                    <div className="text-cyan-400 w-8 h-8">{benefit.icon}</div>
                  </motion.div>
                  <p className="text-lg text-gray-200">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeInUp} className="mb-24">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-12">
              <div className="flex items-center gap-4 mb-8">
                <Eye className="w-12 h-12 text-cyan-400" />
                <h2 className="text-4xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-2xl text-gray-200 mb-8">A world where:</p>
              <div className="space-y-6">
                {visionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={staggerDelay(index)}
                    className="flex items-start gap-4"
                  >
                    <Lightbulb className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-xl text-gray-200">{point}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl text-cyan-400 font-bold mt-10"
              >
            AltCred is building the future of credit — smarter, fairer, and designed for everyone.
              </motion.p>
            </div>
          </motion.section>

          <motion.section {...fadeInUp} className="mb-24">
            <h2 className="text-5xl font-bold text-white mb-12">Who We Work With</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerOrganizations.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={staggerDelay(index)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-cyan-400" />
                    <span className="text-lg text-gray-200">{partner}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeInUp} className="mb-16">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/40 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-10">Our Promise</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {companyPromises.map((promise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={staggerDelay(index)}
                    className="flex items-center gap-4"
                  >
                    <Check className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                    <span className="text-xl text-gray-200">{promise}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              AltCred isn't just a scoring platform.
            </h3>
            <p className="text-3xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent font-bold">
            It's a movement towards financial inclusion and trust.
          </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
