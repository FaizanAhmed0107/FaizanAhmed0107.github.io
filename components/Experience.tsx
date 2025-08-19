'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Cpu } from 'lucide-react';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface ExperienceItem {
    id: number;
    role: string;
    organization: string;
    duration: string;
    location: string;
    description: string[];
}

const ExperienceSection = ({ data }: Props) => {

    const experienceData: ExperienceItem[] = data.experiences;

    const timelineVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <section id="experience" className="relative bg-gray-900 text-white pt-0 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* --- Background glowing blobs --- */}
            <div className="absolute top-1/4 -left-12 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse" />
            <div className="absolute bottom-1/4 -right-12 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000" />

            <div className="relative max-w-4xl mx-auto z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                            Professional Experience
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-gray-400 text-lg">
                        A timeline of my professional journey and key contributions in the field.
                    </p>
                </motion.div>

                <motion.div
                    className="relative"
                    variants={timelineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-700/50 transform -translate-x-1/2 hidden md:block" />
                    <div className="absolute left-6 top-0 w-0.5 h-full bg-gray-700/50 md:hidden" />


                    {experienceData.map((item, index) => {
                        const isRightSide = index % 2 === 0;

                        const contentCard = (
                            <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg shadow-xl ${!isRightSide ? 'md:text-right' : ''}`}>
                                <div className={`flex items-center text-sm text-gray-400 mb-3 ${!isRightSide ? 'md:justify-end' : ''}`}>
                                    <Calendar size={14} className="mr-2" /> {item.duration}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                                <div className={`flex items-center text-md text-green-300 mb-4 ${!isRightSide ? 'md:justify-end' : ''}`}>
                                    <MapPin size={16} className="mr-2" /> {item.organization}
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    {item.description.map((point, i) => (
                                        <li key={i} className={`flex items-start ${!isRightSide ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                            <Cpu size={16} className={`text-green-400 mt-1 flex-shrink-0 ${!isRightSide ? 'ml-3' : 'mr-3'}`} />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );

                        const centerIcon = (
                            <div className="z-10 flex items-center justify-center w-12 h-12 bg-gray-800 border-2 border-cyan-400 rounded-full shadow-lg">
                                <Briefcase className="text-cyan-300" />
                            </div>
                        );

                        return (
                            <motion.div key={item.id} className="relative w-full mb-8" variants={itemVariants}>
                                {/* DESKTOP LAYOUT */}
                                <div className="hidden md:flex justify-between items-center w-full">
                                    <div className="w-5/12">
                                        {!isRightSide ? contentCard : <div />}
                                    </div>
                                    {centerIcon}
                                    <div className="w-5/12">
                                        {isRightSide ? contentCard : <div />}
                                    </div>
                                </div>
                                {/* MOBILE LAYOUT */}
                                <div className="md:hidden flex items-start">
                                    <div className="absolute left-6 transform -translate-x-1/2">
                                        {centerIcon}
                                    </div>
                                    <div className="pl-16 w-full">
                                        {contentCard}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <style jsx global>{`
                /* Your existing global styles remain unchanged */
            `}</style>
        </section>
    );
};

export default ExperienceSection;
