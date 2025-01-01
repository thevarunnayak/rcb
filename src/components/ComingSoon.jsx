import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import NavBar from './Navbar'

const ComingSoon = () => {
    return (
        <div className='relative min-h-screen w-screen overflow-x-hidden flex justify-center items-center'>
            <NavBar />
            <AnimatedTitle
                title="<b>Coming<br />Soon</b>"
                containerClass="special-font  w-full font-zentry  !text-black !leading-[.9]"
            />
        </div>
    )
}

export default ComingSoon