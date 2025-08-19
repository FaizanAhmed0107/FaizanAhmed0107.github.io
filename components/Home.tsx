"use client";

import MotionBG from "./motionBackground/MotionBG";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import ActionButtons from "./ActionButtons";

interface HomeProps {
    data: {
        roles?: string[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
}

export default function Home({ data }: HomeProps) {
    const roles: string[] = data.punctuation_roles || [];

    return (
        <div className="h-screen relative overflow-hidden bg-gray-900">
            <MotionBG />
            <section className="absolute top-0 left-0 z-10 h-screen flex flex-col max-w-5xl justify-center text-white px-[7%] ml-[2%]" id="home">
                <p className="text-2xl text-gray-300 mb-4">Hello, This is</p>
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                        {data.name}
                    </span>
                </h1>
                <div className="text-2xl md:text-3xl font-medium mb-6 h-10">
                    <p className="m-0 p-0 text-gray-300">And, I am a&nbsp;
                        <span className="text-green-300">
                            <ReactTyped
                                strings={roles}
                                typeSpeed={60}
                                backSpeed={50}
                                loop
                            />
                        </span>
                    </p>
                </div>
                <ActionButtons data={data} />
                <div className="flex flex-row gap-5 mt-10 w-full">
                    <Link target="_blank" rel="noopener noreferrer" href={data.github}
                        className="rounded-full p-3 w-max bg-gray-800/50 border border-gray-700 text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-cyan-500/20 hover:text-cyan-300 active:translate-y-0.5">
                        <FaGithub className="text-2xl" />
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" href={data.linkedin}
                        className="rounded-full p-3 w-max bg-gray-800/50 border border-gray-700 text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-cyan-500/20 hover:text-cyan-300 active:translate-y-0.5">
                        <FaLinkedin className="text-2xl" />
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" href={data.leetcode}
                        className="rounded-full p-3 w-max bg-gray-800/50 border border-gray-700 text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-cyan-500/20 hover:text-cyan-300 active:translate-y-0.5">
                        <SiLeetcode className="text-2xl" />
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" href={data.hackerrank}
                        className="rounded-full p-3 w-max bg-gray-800/50 border border-gray-700 text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-cyan-500/20 hover:text-cyan-300 active:translate-y-0.5">
                        <FaHackerrank className="text-2xl" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
