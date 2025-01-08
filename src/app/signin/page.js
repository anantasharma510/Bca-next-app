import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SignIn from "./signin";


export default function page(){
    return (
        <div className="page">
            <Navbar/>
            <SignIn/>
          <Footer />
        </div>
    )
}