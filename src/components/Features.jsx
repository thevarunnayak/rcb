import React from "react";
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

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

export const BentoCard = ({ src, title, description, isComingSoon, isImage, buttonClick, buttonText, imageClass, cardClass, noButton }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div className={clsx("relative size-full", cardClass)}>
            {
                isImage ? (
                    <img
                        src={src}
                        alt={title}
                        className={clsx("absolute left-0 top-0 size-full", imageClass)}
                    />
                ) : (
                    <video
                        src={src}
                        loop
                        muted
                        autoPlay
                        className="absolute left-0 top-0 size-full object-cover object-center"
                    />
                )
            }

            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-60 text-xs md:text-base">{description}</p>
                    )}
                </div>

                {!noButton && (
                    isComingSoon ? (
                        <div
                            ref={hoverButtonRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                        >
                            {/* Radial gradient hover effect */}
                            <div
                                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                                style={{
                                    opacity: hoverOpacity,
                                    background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                                }}
                            />
                            <TiLocationArrow className="relative z-20" />
                            <p className="relative z-20">coming soon</p>
                        </div>
                    ) : (
                        <Button
                            id="watch-trailer"
                            title={buttonText}
                            leftIcon={<TiLocationArrow />}
                            containerClass="!bg-black flex-center gap-1 !text-blue-50"
                            onClick={buttonClick}
                        />
                    )
                )}
            </div>
        </div>
    );
};

const Features = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="font-circular-web text-lg text-blue-50">
                        Explore the Bold World of RCB
                    </p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        From the thrill of the game to the excitement of esports, experience everything that makes Royal Challengers Bangalore more than just a cricket team.
                    </p>
                </div>

                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard
                        src="img/rcb-logo-large.png"
                        title={
                            <>
                                Squad
                            </>
                        }
                        description="Meet Class of 25"
                        isComingSoon={false}
                        buttonText={"Check Squad"}
                        buttonClick={() => navigate("/squad")}
                        isImage
                        imageClass="!object-right !object-contain"
                        cardClass="!bg-red-700"
                    />
                </BentoTilt>

                <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard
                            src="img/feature-2.jpg"
                            title={
                                <>
                                    Journey
                                </>
                            }
                            description="Relive the unforgettable moments of RCB’s journey."
                            isComingSoon
                            isImage
                            imageClass="!object-top !object-cover"

                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                            src="img/feature-3.jpg"
                            title={
                                <>
                                    Fan Frenzy
                                </>
                            }
                            description="For the Bold Army! Share your moments."
                            isComingSoon
                            isImage
                            imageClass="!object-top !object-cover"
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                        <BentoCard
                            src="img/feature-4.jpg"
                            title={
                                <>
                                    Merchandise
                                </>
                            }
                            description="Gear up like a true Challenger"
                            isComingSoon
                            isImage
                            imageClass="!object-top !object-cover"
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2 border border-gold">
                        {/* <div className="flex size-full flex-col justify-between bg-black p-5 ">
                            <h1 className="bento-title special-font max-w-64 text-gold">
                                Rcb Unbox<br /> coming <br /> soon
                            </h1>

                        </div> */}
                        <BentoCard
                            src="img/unbox.jpg"
                            title={
                                <div className="text-gold">
                                    Rcb Unbox<br /> coming <br /> soon
                                </div>
                            }
                            isImage
                            noButton
                            imageClass="!object-right !object-contain"
                            cardClass="!bg-blue-900"
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <video
                            src="videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt>
                </div>
            </div>
        </section>
    )
};

export default Features;