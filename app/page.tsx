import MotionBG from "../components/motionBackground/MotionBG";

export default function Home() {
  return (
    <>
      <div className="h-screen relative overflow-hidden">
        {/* <MotionBG /> */}
        <section className="absolute top-0 left-0 z-10 h-screen flex flex-col max-w-5xl justify-center text-white px-[7%] ml-[2%]">
          <p className="text-2xl text-gray-200 mb-4">Hello, This is</p>
          <p className="text-6xl md:text-7xl font-bold mb-6">Faizan Ahmed</p>
          <div className="text-2xl md:text-3xl font-medium mb-6">
            <p className="m-0 p-0">And, I am&nbsp;a developer</p>
          </div>
          <button
            className="inline-block bg-[#1e3551] text-white text-[28px] font-normal px-10 py-4 mt-6 rounded-md border-2 border-[#1e3551] transition-all duration-300 ease-in-out hover:bg-[#18273c] hover:border-[#18273c] hover:-translate-y-1 active:bg-[#1e3551] active:border-[#1e3551] active:scale-90 w-fit sm:text-[20px] sm:px-6 sm:py-3"
          >
            Hire me
          </button>
        </section>
      </div>
      <div className="h-screen">Hello</div>
      <div className="h-screen">Hello</div>
    </>
  );
}
