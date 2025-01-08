import Footer from "../components/footer";
import Navbar from "../components/navbar";
import AboutUs from "./about";

export default function page(){
    return (
        <div className="page">
            <Navbar />
<AboutUs/>
<Footer />
        </div>
    )
}