import React from 'react';
import Banner from '../Banner/Banner';
import ApprovedSessions from '../ApprovedSessions/ApprovedSessions';
import Sponsors from '../Sponsors/Sponsors';
import Goals from '../Goals/Goals';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <ApprovedSessions></ApprovedSessions>
           <Sponsors></Sponsors>
           <Goals></Goals>
        </div>
    );
};

export default Home;