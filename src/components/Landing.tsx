import React from 'react'
import Hero from './Hero'
import About from './About'
import NavBar from './Navbar'
import Features from './Features'
import Contact from './Contact'
import Footer from './Footer'
const Landing = () => {
    return (
        <div>
            <NavBar />
            <Hero />
            <About />
            <Features />
            <Contact />
            <Footer />
        </div>
    )
}

export default Landing