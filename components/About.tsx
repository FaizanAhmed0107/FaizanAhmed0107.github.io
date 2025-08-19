'use client';

import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Folder, File } from 'lucide-react';
import { motion, useInView, useAnimation, Variants, useMotionValue, animate } from 'framer-motion';

interface Props {
    data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
}

interface UserSkills {
    Languages: string[];
    Frontend: string[];
    Backend: string[];
    "Tools & Databases": string[];
}

interface UserLinks {
    github: string;
    linkedin: string;
    email: string;
}

interface Education {
    degree: string;
    university: string;
    duration: string;
    cgpa: string;
}

interface StatusCheck {
    command: string;
    output: string[];
}

interface UserData {
    name: string;
    role: string;
    bio: string;
    skills: UserSkills;
    links: UserLinks;
    education: Education;
    status: StatusCheck;
}

interface CommandProps {
    cmd: string;
    children: React.ReactNode;
}

interface TerminalWindowProps {
    title: string;
    children: React.ReactNode;
}

interface CursorProps {
    delay?: string;
}

const Command: React.FC<CommandProps> = ({ cmd, children }) => (
    <div className="mb-2">
        <p className="flex items-center flex-wrap">
            <span className="text-green-400">user@portfolio:</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-300">$ {cmd}</span>
        </p>
        <div className="pl-2">{children}</div>
    </div>
);

const Cursor: React.FC<CursorProps> = ({ delay = '0s' }) => (
    <span
        className="bg-green-400 w-2 h-4 inline-block animate-blink ml-1"
        style={{ animationDelay: delay }}
    />
);

const TerminalWindow: React.FC<TerminalWindowProps> = ({ title, children }) => {
    return (
        <div className="w-full h-full bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="bg-gray-800 p-3 flex items-center">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex-grow text-center text-gray-400 text-sm font-mono">
                    <p>{title}</p>
                </div>
            </div>
            <div className="p-4 md:p-6 font-mono text-sm text-gray-200 overflow-y-auto h-auto">
                {children}
            </div>
        </div>
    );
};


// Draggable wrapper component for the terminal
interface DraggableTerminalProps extends TerminalWindowProps {
    className?: string;
    variants: Variants;
}

const DraggableTerminalWindow: React.FC<DraggableTerminalProps> = ({ title, children, className, variants }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleDragEnd = () => {
        animate(x, 0, { type: 'spring', stiffness: 400, damping: 25, mass: 1 });
        animate(y, 0, { type: 'spring', stiffness: 400, damping: 25, mass: 1 });
    };

    return (
        <motion.div
            className={className}
            variants={variants}
            drag
            onDragEnd={handleDragEnd}
            style={{ x, y, cursor: 'grab' }}
            whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 50 }}
            dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 15 }}
        >
            <TerminalWindow title={title}>
                {children}
            </TerminalWindow>
        </motion.div>
    );
};


const AboutSection = ({ data }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const controls = useAnimation();

    const user: UserData = {
        name: data.name,
        role: data.more,
        bio: data.about,
        skills: data.skills,
        links: {
            github: data.github,
            linkedin: data.linkedin,
            email: `mailto:${data.email}`,
        },
        education: data.education,
        status: {
            command: "ping reality",
            output: [
                "PING reality (127.0.0.1): 56 data bytes",
                "--- reality ping statistics ---",
                "4 packets transmitted, 0 received, 100% packet loss"
            ]
        }
    };


    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section id="about" className="relative bg-gray-900 text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* --- Background glowing blobs --- */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse" />
            <div className="absolute top-1/2 -right-4 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000" />

            <div className="glowing-divider" />

            <div className="relative max-w-6xl mx-auto flex flex-col items-center z-10">
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                        About Me
                    </span>
                </motion.h2>
                <motion.p
                    className="max-w-2xl mb-12 text-gray-400 text-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    A little more about me, presented in a format I&apos;m very familiar with — the command line.
                    Let&apos;s run a few commands!
                </motion.p>

                <motion.div
                    ref={ref}
                    className="w-full flex flex-wrap items-start justify-center gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <DraggableTerminalWindow className="w-full md:w-3/5 lg:w-1/2" variants={itemVariants} title="~/bio.txt">
                        <Command cmd="whoami"><p>{user.name} - {user.role}</p></Command>
                        <Command cmd="cat ./bio.txt"><p className="text-gray-300">{user.bio.replace(/'/g, "\u2019")}</p></Command>
                        <div className="flex items-center mt-2"><span className="text-green-400">user@portfolio:</span><span className="text-blue-400">~</span><span className="text-gray-300">$</span><Cursor delay="0.1s" /></div>
                    </DraggableTerminalWindow>

                    <DraggableTerminalWindow className="w-full sm:w-1/2 md:w-2/5 lg:w-1/3" variants={itemVariants} title="./connect">
                        <Command cmd="./connect">
                            <div className="flex flex-col space-y-2 mt-2">
                                <a href={user.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-400 hover:underline"><Github size={16} className="mr-2" /> GitHub</a>
                                <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-400 hover:underline"><Linkedin size={16} className="mr-2" /> LinkedIn</a>
                                <a href={user.links.email} className="flex items-center text-yellow-400 hover:underline"><Mail size={16} className="mr-2" /> Email</a>
                            </div>
                        </Command>
                        <div className="flex items-center mt-2"><span className="text-green-400">user@portfolio:</span><span className="text-blue-400">~</span><span className="text-gray-300">$</span><Cursor delay="0.4s" /></div>
                    </DraggableTerminalWindow>

                    <DraggableTerminalWindow className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5" variants={itemVariants} title="~/academics/.git">
                        <Command cmd="git log --academics">
                            <div className="font-mono text-sm">
                                <p>
                                    <span className="text-yellow-400">commit QSBkZXYgY3JhZnRpbmcgZGlnaXRhbCB0aGluZ3M=</span>
                                </p>
                                <div className="mt-4 ml-4">
                                    <p className="font-bold">{user.education.degree}</p>
                                    <p className="mt-2">{user.education.university}</p>
                                    <p>Current CGPA: {user.education.cgpa}</p>
                                    <p className="text-gray-400">{user.education.duration}</p>
                                </div>
                            </div>
                        </Command>
                        <div className="flex items-center mt-2"><span className="text-green-400">user@portfolio:</span><span className="text-blue-400">~</span><span className="text-gray-300">$</span><Cursor delay="0.2s" /></div>
                    </DraggableTerminalWindow>

                    <DraggableTerminalWindow className="w-full md:w-3/5 lg:w-1/2" variants={itemVariants} title="~/status_check">
                        <Command cmd={user.status.command}>
                            <div className="flex flex-col text-left">
                                {user.status.output.map((line, index) => (<p key={index} className="text-gray-300">{line}</p>))}
                            </div>
                        </Command>
                        <div className="flex items-center mt-2"><span className="text-green-400">user@portfolio:</span><span className="text-blue-400">~</span><span className="text-gray-300">$</span><Cursor delay="0.5s" /></div>
                    </DraggableTerminalWindow>

                    <DraggableTerminalWindow className="w-full lg:w-4/5" variants={itemVariants} title="~/skills">
                        <Command cmd="ls -R ./skills">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {Object.entries(user.skills).map(([category, skillsList]) => (
                                    <div key={category} className="mt-2">
                                        <div className="flex items-center"><Folder size={16} className="text-blue-400 mr-2" /><p className="font-bold text-blue-400">{category}/</p></div>
                                        <div className="pl-6">{skillsList.map((skill: string) => (<div key={skill} className="flex items-center"><File size={16} className="text-green-400 mr-2" /><p>{skill}</p></div>))}</div>
                                    </div>
                                ))}
                            </div>
                        </Command>
                        <div className="flex items-center mt-2"><span className="text-green-400">user@portfolio:</span><span className="text-blue-400">~</span><span className="text-gray-300">$</span><Cursor delay="0.3s" /></div>
                    </DraggableTerminalWindow>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes blink { 50% { opacity: 0; } }
                .animate-blink { animation: blink 1.2s step-end infinite; }

                .glowing-divider {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    max-width: 1000px;
                    height: 1px;
                    background-color: rgba(0, 255, 255, 0.5);
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5),
                                0 0 20px rgba(0, 255, 255, 0.3);
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    );
};

export default AboutSection;