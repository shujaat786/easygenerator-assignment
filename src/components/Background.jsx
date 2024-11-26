import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { ReactTyped } from "react-typed";

const Background = ({ children }) => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            {/* Particle Effect */}
            <div className="absolute top-10 text-white text-4xl font-bold w-full text-center z-10">
                <ReactTyped
                    strings={['Create an Account my wife Madiha ', 'Join me  Shujaat your husband', 'Sign Up Now!']}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                />
            </div>
            <Particles
                id="tsparticles"
                className="absolute inset-0 z-0"
                init={particlesInit}
                options={{
                    background: {
                        color: { value: 'transparent' },
                    },
                    particles: {
                        number: {
                            value: 100,
                        },
                        size: {
                            value: 3,
                        },
                        move: {
                            speed: 2,
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#ffffff',
                            opacity: 0.4,
                            width: 1,
                        },
                        color: {
                            value: '#ffffff',
                        },
                    },
                }}
            />

            {/* Signup Form */}
            <div className="relative z-20">{children}</div>
        </div>
    );
};

export default Background;
