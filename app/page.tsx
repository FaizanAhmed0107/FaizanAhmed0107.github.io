import MotionBG from "../components/motionBackground/MotionBG";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <MotionBG />
        <section className="absolute top-0 left-0 z-10 h-screen flex flex-col max-w-5xl justify-center text-text px-[7%] ml-[2%]">
          <p className="text-2xl text-gray-200 mb-4">Hello, This is</p>
          <p className="text-6xl md:text-7xl font-bold mb-6">Faizan Ahmed</p>
          <div className="text-2xl md:text-3xl font-medium mb-6">
            <p className="m-0 p-0">And, I am&nbsp;a developer</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-7.5">
            <Button variant="secondary" className="text-base p-6 w-max text-text transition-transform duration-300 hover:-translate-y-1 cursor-pointer active:translate-y-0.5">View My Work</Button>
            <Button className="text-base p-6 w-max text-background transition-transform duration-300 hover:-translate-y-1 cursor-pointer active:translate-y-0.5">Download Resume</Button>
          </div>
          <div className="flex flex-row gap-5 mt-10 w-full">
            <Link href="/" className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
              <FaGithub className="text-2xl" />
            </Link>
            <Link href="/" className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
              <FaLinkedin className="text-2xl" />
            </Link>
            <Link href="/" className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
              <SiLeetcode className="text-2xl" />
            </Link>
            <Link href="/" className="rounded-full p-2 w-max bg-card-front transition duration-300 hover:-translate-y-1 hover:brightness-80 active:translate-y-0.5">
              <FaHackerrank className="text-2xl" />
            </Link>
          </div>
        </section>
      </div>
      <div className="h-screen">Hello</div>
      <div className="h-screen">Hello</div>
    </>
  );
}
