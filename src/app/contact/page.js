import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ContactForm from "./contact";

export default function page (){
    return (
        <div>
            <Navbar />
          < ContactForm />  
          <Footer />
        </div>
    )
}