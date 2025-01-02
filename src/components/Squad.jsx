import React, { useEffect, useRef, useState } from 'react'
import AnimatedTitle from './AnimatedTitle';
import Navbar from './Navbar';
import { squadMen, squadWomen } from '../data/squad'
import { BiSolidCricketBall } from 'react-icons/bi';
import { GiCommercialAirplane, GiCricketBat } from 'react-icons/gi';
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
    const [squadType, setSquadType] = useState('men');
    const [squadData, setSquadData] = useState(squadMen);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const IconComponent = (prop) => {
        if (prop === 'bb') {
            return <BiSolidCricketBall className='w-8' />;
        } else if (prop === 'bt') {
            return <GiCricketBat className='w-8 -ml-1' />;
        } else if (prop === 'wk') {
            return <GiWinterGloves className='w-8 -ml-1' />;
        }
        else if (prop === 'al') {
            return <div className='flex'><GiCricketBat className='w-8 -mr-4 -ml-1' /><BiSolidCricketBall className='w-8' /></div>
        }
        return null; // Return null if no match
    };

    const squadSelect = (type) => {

        setSquadType(type);
        const data = type === 'men' ? squadMen : squadWomen;
        setSquadData(data);
        console.log(type, squadData);
    }
    return (
        <div className='w-full min-h-screen px-4 py-6 md:px-8 md:py-12 mt-24 relative'>
            <img src="img/banner-bg.webp" alt="banner" className='fixed w-full h-screen object-cover object-left top-0 left-0 right-0 bottom-0 z-0 opacity-75' />
            <div className='relative !z-50'>
                <Navbar />
                <AnimatedTitle
                    title="Meet challengers <br /> For IPL 2025"
                    containerClass="z-[30] special-font sm:!text-red-700 text-blue-50 !md:text-[6.2rem] w-full font-zentry !text-3xl !font-black !leading-[.9]"
                />
                <div className='w-full z-40 justify-center items-center flex my-8 gap-8 text-xl font-general font-bold '>
                    <div className={squadType === 'men' ? 'underline uppercase decoration-red-700 bg-white rounded-md px-4 py-1 cursor-pointer text-sm md:text-lg' : 'text-black uppercase bg-white rounded-md px-4 py-1 cursor-pointer text-sm md:text-lg'} onClick={() => squadSelect('men')}>Men</div>
                    <div className={squadType === 'women' ? 'underline uppercase decoration-red-700 bg-white rounded-md px-4 py-1 cursor-pointer text-sm md:text-lg' : 'text-black uppercase bg-white rounded-md px-4 py-1 cursor-pointer text-sm md:text-lg'} onClick={() => squadSelect('women')}>Women</div>
                </div>
                <div className='z-40 p-4 my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                        squadData?.map((data) => (
                            <div key={data.id} >
                                <BentoTilt className="bento-tilt_3">
                                    <div className=' border-[12px] border-red-700 w-full bg-white relative cursor-pointer'>
                                        {
                                            data.isOverseas && (
                                                <div className='px-3 py-2 plane-clip-path bg-red-700 absolute top-0 right-0'>
                                                    <GiCommercialAirplane className="text-gold" />
                                                </div>
                                            )
                                        }

                                        <img
                                            className='w-full object-cover object-center'
                                            src={data.image}
                                            alt={data.name}
                                        />
                                        <div className='w-full h-full px-4 py-2 bg-red-700 border border-red-700 flex flex-col gap-2'>
                                            <span className='text-center font-general uppercase font-semibold md:text-lg text-sm'>
                                                {data.name}
                                            </span>
                                            <div className='text-center uppercase  md:sm text-xs text-blue-50 flex items-center justify-center'>
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
        </div>
    )
}

export default Squad