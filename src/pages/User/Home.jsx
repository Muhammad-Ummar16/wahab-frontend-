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
        <main className="relative isolate z-0">  {/* isolate + low z breaks hero stacking */}
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
        </main>
    );
};

export default Home;