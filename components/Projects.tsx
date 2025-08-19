'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronRight, Code } from 'lucide-react';
import Image from 'next/image';

// --- TYPE DEFINITIONS ---

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// Updated Project interface with multi-image support
interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl?: string;
    images: string[]; // Changed to an array of strings
    mockupType: 'laptop' | 'mobile'; // Re-introduced to control layout
}

// --- HOOKS & HELPER COMPONENTS ---

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<(() => void) | null>(null);
    useEffect(() => { savedCallback.current = callback; }, [callback]);
    useEffect(() => {
        function tick() { if (savedCallback.current) savedCallback.current(); }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// Re-engineered window to perfectly fit the image
const MacOsWindowMockup = ({ src, alt, onMaximize }: { src: string; alt: string; onMaximize: () => void; }) => (
    <div className="rounded-lg border border-gray-700/80 bg-gray-900 shadow-xl flex flex-col overflow-hidden group w-full">
        <div className="w-full h-8 bg-gray-800 flex-shrink-0 flex items-center px-3">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <button
                    onClick={onMaximize}
                    aria-label="Maximize"
                    className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
                ></button>
            </div>
        </div>
        <div className="p-1 bg-black/30">
            <Image
                src={src}
                alt={alt}
                width={1200} // Base width for aspect ratio calculation
                height={800} // Base height for aspect ratio calculation
                style={{ width: '100%', height: 'auto', display: 'block' }} // Makes the container wrap the image
                className="transition-transform duration-500 group-hover:scale-105"
            />
        </div>
    </div>
);

// New component to handle single vs. multi-image layout
const ProjectShowcase = ({ project, onMaximize }: { project: Project; onMaximize: () => void; }) => {
    // For mobile projects, display images side-by-side
    if (project.mockupType === 'mobile') {
        return (
            <div className="flex justify-center items-start gap-4 flex-wrap mb-6">
                {project.images.map((imgSrc, index) => (
                    <div key={index} className="w-full max-w-[200px] flex-shrink-0">
                        <MacOsWindowMockup
                            src={imgSrc}
                            alt={`${project.title} screenshot ${index + 1}`}
                            onMaximize={onMaximize}
                        />
                    </div>
                ))}
            </div>
        );
    }

    // For laptop projects, display the single, larger image within a max-width container
    return (
        <div className="mb-6">
            <div className="max-w-3xl mx-auto">
                <MacOsWindowMockup
                    src={project.images?.[0]}
                    alt={project.title}
                    onMaximize={onMaximize}
                />
            </div>
        </div>
    );
};

const GitCommitJoke = () => (
    <div className="mt-auto pt-4 border-t border-gray-700/50 text-xs font-mono text-gray-500">
        <p className="flex items-center">
            <span className="text-yellow-400 mr-2">commit</span>
            <span className="text-gray-400 truncate min-w-0">ZGVidWc= : Fix bug #404</span>
        </p>
        <div className="pl-2 mt-2">
            <p>Fix a bug where users could still find happiness.</p>
            <p>Reality patched. Re-deploying universe...</p>
        </div>
    </div>
);

// --- MAIN PROJECTS SECTION COMPONENT ---

const ProjectsSection = ({ data }: Props) => {
    const projectsData: Project[] = data.projects;

    const [selectedId, setSelectedId] = useState<number | null>(projectsData[0]?.id || null);
    const [isGlitching, setIsGlitching] = useState(false);

    const REGULAR_INTERVAL = 8000;
    const USER_PAUSE_INTERVAL = 15000;
    const [intervalDelay, setIntervalDelay] = useState<number | null>(REGULAR_INTERVAL);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const selectedProject = projectsData.find(p => p.id === selectedId);

    const cycleProject = useCallback(() => {
        if (!projectsData || projectsData.length === 0) return;
        const currentIndex = projectsData.findIndex(p => p.id === selectedId);
        const nextIndex = (currentIndex + 1) % projectsData.length;
        setSelectedId(projectsData[nextIndex].id);
    }, [selectedId, projectsData]);

    useInterval(cycleProject, intervalDelay);

    const handleProjectSelect = (id: number) => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        setSelectedId(id);
        setIntervalDelay(null);
        resumeTimeoutRef.current = setTimeout(() => {
            setIntervalDelay(REGULAR_INTERVAL);
        }, USER_PAUSE_INTERVAL);
    };

    const handleMaximizeClick = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
    };

    return (
        <section id="projects" className="relative bg-gray-900 text-white pt-0 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
            <div className="blob1 absolute top-1/4 left-0 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse" />
            <div className="blob2 absolute bottom-1/4 right-0 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000" />

            <div className="relative max-w-7xl mx-auto z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                            My Projects
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-gray-400 text-lg">
                        Have a look inside my digital workshop. Here are some of my recent builds.
                    </p>
                </motion.div>

                <div
                    className={`flex flex-col md:flex-row bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl overflow-hidden min-h-[650px] ${isGlitching ? 'glitch' : ''}`}
                    onMouseEnter={() => setIntervalDelay(null)}
                    onMouseLeave={() => setIntervalDelay(REGULAR_INTERVAL)}
                >
                    <aside className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-gray-700 p-4 flex flex-col">
                        <div>
                            <div className="flex items-center mb-4">
                                <ChevronRight size={16} className="text-gray-500" />
                                <h3 className="ml-2 font-bold text-gray-300 pl-2" style={{ borderLeft: '2px solid #4B4559' }}>
                                    /projects
                                </h3>
                            </div>
                            <ul>
                                {projectsData.map(project => (
                                    <li key={project.id}>
                                        <button
                                            onClick={() => handleProjectSelect(project.id)}
                                            className={`w-full text-left flex items-center p-2 rounded-md transition-colors duration-200 ${selectedId === project.id ? 'bg-blue-500/20 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
                                        >
                                            <Code size={16} className="mr-3 text-cyan-400 flex-shrink-0" />
                                            <span className="truncate">{project.title}.run</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <GitCommitJoke />
                    </aside>

                    <main className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col">
                        <AnimatePresence mode="wait">
                            {selectedProject && (
                                <motion.div
                                    key={selectedProject.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="h-full flex flex-col"
                                >
                                    <ProjectShowcase project={selectedProject} onMaximize={handleMaximizeClick} />

                                    <div className="flex-shrink-0">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent mb-2 sm:mb-0">
                                                {selectedProject.title}
                                            </h3>
                                            <div className="flex space-x-4">
                                                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                                                    <Github size={20} className="mr-2" /> GitHub
                                                </a>
                                                {selectedProject.liveUrl && (
                                                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                                                        <ExternalLink size={20} className="mr-2" /> Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            {selectedProject.description}
                                        </p>
                                        <div>
                                            <h4 className="font-semibold text-gray-300 mb-3">// Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map(tech => (
                                                    <span key={tech} className="bg-gray-700/80 text-cyan-300 text-sm font-mono px-3 py-1 rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            <div className="glowing-divider-bottom" />

            <style jsx global>{`
                /* Your global styles (glitch, glowing-divider) remain the same */
                .glowing-divider-bottom { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%; max-width: 1000px; height: 1px; background-color: rgba(0, 255, 255, 0.5); box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3); }
                .animation-delay-4000 { animation-delay: 4s; }
                @keyframes glitch-anim { 0% { transform: skewX(0); } 25% { transform: skewX(-2deg); opacity: 0.8; } 50% { transform: skewX(2deg); } 75% { transform: skewX(-1deg); opacity: 0.9; } 100% { transform: skewX(0); } }
                .glitch { animation: glitch-anim 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
            `}</style>
        </section>
    );
};

export default ProjectsSection;