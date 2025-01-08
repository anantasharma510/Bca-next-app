import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Syllabus from "./syallabus";


export default function page() {
  return (
    <main>
        <Navbar />
      <div className="">
        <Syllabus />
      </div>
      <Footer />
    </main>
  );
}
