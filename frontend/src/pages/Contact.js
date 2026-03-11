import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Contact = () => {
  // Form state - keeping it simple for now
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect this to the actual backend API
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out! We will get back to you soon.');

    setFormData({ name: '', email: '', message: '' });
  };


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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="text-cyan-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about AltCred? Want to partner with us?
              We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">


            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <MessageSquare className="text-cyan-400" />
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email us</p>
                      <p className="text-white font-medium">hello@altcred.com</p>
                      <p className="text-white font-medium">support@altcred.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                      <Phone className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Call us</p>
                      <p className="text-white font-medium">+91 95467 85861</p>
                      <p className="text-gray-500 text-xs mt-1">Mon-Fri, 9am - 6pm IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    {/* <div>
                      <p className="text-gray-400 text-sm">Visit us</p>
                      <p className="text-white font-medium">
                        AltCred HQ, Tech Park,<br />
                        Bangalore, Karnataka 560001
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Maybe a map or something here later? */}
              <div className="bg-cyan-900/20 border border-cyan-500/20 rounded-2xl p-6">
                <p className="text-cyan-300 italic text-center">
                  "Financial inclusion starts with a conversation."
                </p>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </div>


    </div>
  );
};

export default Contact;
