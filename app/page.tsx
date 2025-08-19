import TopBar from "@/components/TopBar";
import Home from "../components/Home";
import AboutMe from "@/components/About";
import data from "@/lib/data.json";
import processData from "@/lib/processData"
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Page() {

  const processedData: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  } = processData(data);

  return (
    <>
      <TopBar />
      <Home data={processedData} />
      <AboutMe data={processedData} />
      <Projects data={processedData} />
      <Experience data={processedData} />
      <Contact data={processedData} />
    </>
  );
}
