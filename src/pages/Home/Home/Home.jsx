import React from 'react';
import Banner from '../Banner/Banner';
import ApprovedSessions from '../ApprovedSessions/ApprovedSessions';
import Sponsors from '../Sponsors/Sponsors';
import Goals from '../Goals/Goals';
import Testimonials from '../../Testimonials/Testimonials';
import AiSupport from '../../AiSupport/AiSupport';
import Contact from '../../Contact/Contact';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <ApprovedSessions></ApprovedSessions>
           <Sponsors></Sponsors>
           <Goals></Goals>
           <Testimonials></Testimonials>
           <AiSupport></AiSupport>
           <Contact></Contact>
        </div>
    );
};

export default Home;