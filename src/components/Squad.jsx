import React, { useEffect, useRef, useState } from 'react'
import AnimatedTitle from './AnimatedTitle';
import Navbar from './Navbar';
import { squadMen } from '../data/squad'
import { BiSolidCricketBall } from 'react-icons/bi';
import { GiCricketBat } from 'react-icons/gi';
import { GiWinterGloves } from "react-icons/gi";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 1.5) * 5;
        const tiltY = (relativeX - 1.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

const Squad = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const IconComponent = (prop) => {
        if (prop === 'bb') {
            return <BiSolidCricketBall className='w-8' />;
        } else if (prop === 'bt') {
            return <GiCricketBat className='w-8' />;
        } else if (prop === 'wk') {
            return <GiWinterGloves className='w-8' />;
        }
        else if (prop === 'al') {
            return <div className='flex gap-[-5px]'><GiCricketBat className='w-8' /><BiSolidCricketBall className='w-8' /></div>
        }
        return null; // Return null if no match
    };
    return (
        <div className='w-full min-h-screen px-4 py-6 md:px-8 md:py-12 mt-24'>
            <Navbar />
            <AnimatedTitle
                title="<b>Meet challengers <br /> For IPL 2025</b>"
                containerClass="special-font !text-red-700 !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
            />
            <div className='border bg-blue-50 p-4 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {
                    squadMen.map((data) => (
                        <div key={data.id} >
                            <BentoTilt className="bento-tilt_3">
                                <div className=' border-[12px] border-red-700 w-full bg-blue-50'>

                                    <img
                                        className='w-full object-cover object-center'
                                        src={data.image}
                                        alt={data.name}
                                    />
                                    <div className='w-full h-full px-4 py-2 bg-red-700 border border-red-700 flex flex-col gap-2'>
                                        <span className='text-center font-general uppercase font-semibold md:text-lg text-sm'>
                                            {data.name}
                                        </span>
                                        <div className='text-center uppercase  md:text-base text-xs text-blue-50 flex gap-2 items-center justify-center'>
                                            <span>{data.type}</span> {IconComponent(data.typeKey)}
                                        </div>
                                    </div>
                                </div>
                            </BentoTilt>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Squad