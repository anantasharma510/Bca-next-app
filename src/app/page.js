import Image from "next/image";
import Navbar from "./components/navbar";
import HomePageSection from "./components/home";
import ThreeSlider from "./components/threeslider";
import Footer from "./components/footer";

export default function Home() {
  return (
   <div>
    <Navbar />
  <HomePageSection />

   </div>
  );
}
