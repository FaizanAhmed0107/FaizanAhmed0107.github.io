import TopBar from "@/components/TopBar";
import Home from "../components/Home";
import AboutMe from "@/components/About";
import data from "@/lib/data.json";
import processData from "@/lib/processData"

export default function Page() {

  let processedData: {
    [key: string]: any;
  };
  processedData = processData(data);

  return (
    <>
      <TopBar />
      <Home data={processedData} />
      <AboutMe data={processedData} />
      <div className="h-screen">Hi</div>
      <div className="h-screen">By</div>
    </>
  );
}
