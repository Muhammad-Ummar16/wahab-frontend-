import React from 'react';
import Hero from './Hero';
import About from './About';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Certificates from './Certificates';
import Contact from './Contact';

const Home = () => {
    return (
        <div className="bg-transparent">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
        </div>
    );
};

export default Home;
