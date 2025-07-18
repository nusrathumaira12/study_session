import React from 'react';

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
  return (
    <section className=" py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
       
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          <span className="text-gray-700">Trusted by over 500 companies and millions of learners around the world </span><br />
          
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3  justify-center">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className=" transition-all duration-300"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-14 mx-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
