import React from 'react';

const Goals = () => {
    return (
        <section class="bg-base-200 py-16 px-6">
        <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      
        
          <div class="lg:col-span-1">
            <h2 class="text-3xl font-bold mb-8">Learning focused on your goals</h2>
            <div class="grid grid-cols-1  gap-6">
      
           
              <div class="bg-white p-6 -mt-3 rounded-lg shadow">
                <div class="mb-4 text-3xl">🛠️</div>
                <h3 class="text-lg font-semibold mb-2 dark:text-gray-900">Hands-on training</h3>
                <p class="text-gray-600">Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.</p>
              </div>
      
     
              <div class="bg-white p-6 rounded-lg shadow border-2 border-blue-600">
                <div class="mb-4 text-3xl">📜</div>
                <h3 class="text-lg font-semibold mb-2 text-blue-600">Certification prep</h3>
                <p class="text-gray-600">Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.</p>
              </div>
      
       
              <div class="bg-white p-6 rounded-lg shadow">
                <div class="mb-4 text-3xl">📈</div>
                <h3 class="text-lg font-semibold mb-2 dark:text-gray-900">
                  Insights and analytics 
                  <span class="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Enterprise Plan</span>
                </h3>
                <p class="text-gray-600">Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.</p>
              </div>
      
           
              <div class="bg-white p-6  -pb-6 rounded-lg shadow">
                <div class="mb-4 text-3xl">⚙️</div>
                <h3 class="text-lg font-semibold mb-2 dark:text-gray-900">
                  Customizable content 
                  <span class="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Enterprise Plan</span>
                </h3>
                <p class="text-gray-600">Create tailored learning paths for team and organization goals and even host your own content and resources.</p>
              </div>
            </div>
          </div>
      
         
          <div data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500" className="bg-white p-4 pt-6 pb-10 rounded-2xl shadow-xl  border border-blue-500 hover:shadow-2xl transition-shadow duration-300 mt-10 group">
  <h3 className="text-2xl font-bold pb-6 text-blue-700 group-hover:text-blue-800 transition-colors duration-200">
    Certification Preparation
  </h3>
  <p className="text-gray-700 mb-6 leading-relaxed">
    Get hands-on guidance and collaborative support as you prepare for in-demand web development and cloud certifications. Join tutor-led sessions, access curated resources, and build real-world projects that align with top tech credentials.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-600 mb-2">⚛️ Meta Front-End Developer Certificate</h4>
      <p className="text-sm text-gray-600">
        Master React, JavaScript, and UI best practices through project-based sessions designed to align with Meta’s front-end certification path.
      </p>
    </div>

    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-600 mb-2">🟢 Node.js Developer Certification (OpenJS)</h4>
      <p className="text-sm text-gray-600">
        Learn backend development using Node.js and Express, prepare for OpenJS Foundation certification with API building workshops and peer-reviewed assignments.
      </p>
    </div>

    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-600 mb-2">☁️ AWS Certified Developer – Associate</h4>
      <p className="text-sm text-gray-600">
        Understand how to deploy full-stack applications on AWS using EC2, S3, and Lambda. Join sessions that simulate real-world deployment scenarios.
      </p>
    </div>

    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-600 mb-2">🧠 Google Cloud Associate Cloud Engineer</h4>
      <p className="text-sm text-gray-600">
        Explore cloud architecture, hosting, and GCP services relevant for full-stack applications. Practice with guided cloud-based project labs.
      </p>
    </div>

    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-600 mb-2">☕ Oracle Certified Java Programmer</h4>
      <p className="text-sm text-gray-600">
        Strengthen your Java fundamentals with tutor-led sessions, exam-aligned exercises, and real-world OOP projects.
      </p>
    </div>

    <div className="p-4 bg-blue-50  rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-600 mb-2">📦 MongoDB Developer Certification</h4>
      <p className="text-sm text-gray-600">
        Learn to model and manage data for modern applications using MongoDB. Practice schema design, aggregation, and indexing with live coding help.
      </p>
    </div>
  </div>
</div>

      
        </div>
      </section>
      

    );
};

export default Goals;