import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_wmazs6h',
      'template_wmwk189',
      form.current,
      'rOWtj3fE3oYFGUrdR'
    )
      .then(() => {
        setIsSent(true);
        setLoading(false);
        form.current.reset();
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setLoading(false);
      });
  };

  // Section zoom animation
  const sectionZoom = {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: 'easeInOut' },
    viewport: { once: true, amount: 0.3 }
  };

  const hoverStyle = 'hover:shadow-xl hover:-translate-y-5 transition-all duration-500';

  return (
    <div className="pb-20 px-4 pt-5 bg-base-200 flex flex-col items-center rounded-lg">
      <h2 className="text-3xl font-bold  mb-15 mt-10 dark:text-white"><span className='text-blue-500'>Contact</span> Us</h2>

      <motion.div
        {...sectionZoom}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 pt-5 rounded-lg"
      >
       
        <div className={`bg-blue-500 text-white p-10 rounded shadow-md ${hoverStyle}`}>
          <h3 className="text-xl font-semibold mb-4"> Contact Details</h3>
         
          <p><strong>Address:</strong> Dhaka, Bangladesh</p>

          <p className="flex items-center gap-2 mt-2">
            <FaPhone className="text-white" />
            <a href="tel:+8801934576443" className="text-white hover:underline">
              +8801934576443
            </a>
          </p>

          <p className="flex items-center gap-2 mt-2">
            <FaWhatsapp className="text-white" />
            <a
              href="https://wa.me/8801798078234"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              +8801798078234
            </a>
          </p>

          <p className="flex items-center gap-2 mt-2">
            <FaEnvelope className="text-white" />
            <a
              href="mailto:nusrathum31@gmail.com"
              className="text-white hover:underline"
            >
              nusrathum31@gmail.com
            </a>
          </p>
        </div>

       
        <div className={`bg-white p-10 dark:bg-white rounded shadow-md ${hoverStyle}`}>
          <h3 className="text-xl font-semibold mb-4 dark:text-black">Send Us a Message</h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-4 dark:text-black">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-2 border rounded dark:text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="btn btn-outline text-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Email'}
            </button>
          </form>

          {isSent && (
            <p className="text-blue-600 font-medium mt-2">Message sent successfully!</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
