import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const sponsors = [
  {
    name: 'P&G',
    logo: 'https://images.seeklogo.com/logo-png/10/1/pg-logo-png_seeklogo-105020.png',
  },
  {
    name: 'PRAN-RFL',
    logo: 'https://images.seeklogo.com/logo-png/25/1/rfl-logo-png_seeklogo-250040.png',
  },
  {
    name: 'Square Group',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Seal_of_Square_Group.svg/1200px-Seal_of_Square_Group.svg.png',
  },
  {
    name: 'ACI Limited',
    logo: 'https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2022/10/26/aci-logo.jpg',
  },
  {
    name: 'Grameenphone',
    logo: 'https://logos-world.net/wp-content/uploads/2022/07/Grameenphone-Logo.png',
  },
  {
    name: 'Walton',
    logo: 'https://images.seeklogo.com/logo-png/25/1/walton-logo-png_seeklogo-251022.png',
  },
  {
    name: 'Robi Axiata',
    logo: 'https://images.seeklogo.com/logo-png/30/1/robi-axiata-logo-png_seeklogo-303503.png',
  },
  {
    name: 'Samsung',
    logo: 'https://blog.logomyway.com/wp-content/uploads/2020/08/samsung-new-logo.jpg',
  },
];

const Sponsors = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.1,     // % of element in viewport to trigger
  });

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section className="py-14 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto text-center" ref={ref}>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-black">
            Trusted by over 500 companies and millions of learners around the world
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              className="transition-all duration-300 p-3"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-14 mx-auto object-contain  hover:grayscale-0 transition"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
