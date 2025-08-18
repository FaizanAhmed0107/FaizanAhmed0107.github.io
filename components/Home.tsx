"use client";

import MotionBG from "./motionBackground/MotionBG";
import { Button } from "@/components/ui/button"
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
        [key: string]: any;
    };
}

export default function Home({ data }: HomeProps) {
    const roles: string[] = data.punctuation_roles || [];

    return (
        <div className="h-screen relative overflow-hidden">
            <MotionBG />
            <section className="absolute top-0 left-0 z-10 h-screen flex flex-col max-w-5xl justify-center text-text px-[7%] ml-[2%]" id="home">
                <p className="text-2xl text-gray-200 mb-4">Hello, This is</p>
                <p className="text-6xl md:text-7xl font-bold mb-6">{data.name}</p>
                <div className="text-2xl md:text-3xl font-medium mb-6">
                    <p className="m-0 p-0">And, I am&nbsp;
                        <ReactTyped
                            strings={roles}
                            typeSpeed={60}
                            backSpeed={50}
                            loop
                        /></p>
                </div>
                <ActionButtons data={data} />
                <div className="flex flex-row gap-5 mt-10 w-full">
                    <Link target="_blank" rel="noopener noreferrer" href={data.github}
                        className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
                        <FaGithub className="text-2xl" />
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" href={data.linkedin}
                        className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
                        <FaLinkedin className="text-2xl" />
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" href={data.leetcode}
                        className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
                        <SiLeetcode className="text-2xl" />
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" href={data.hackerrank}
                        className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
                        <FaHackerrank className="text-2xl" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
