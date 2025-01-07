import React, { Suspense } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Link from "next/link";

const Teams = React.lazy(() => import("./teams"));

export default function Page() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading Teams...</div>}>
        <Teams />
      </Suspense>
      <div className="text-center mt-10">
        <p className="text-gray-700 text-lg">
          Looking for the <span className="text-sky-600 font-semibold">Previous Committee 2079?</span>
        </p>
        <a
          href="team/preivousteams"
          className="text-sky-700 font-bold hover:text-sky-500 underline mt-2 block"
        >
          Click here to view previous committee members
        </a>
      </div>
      <Footer />
    </div>
  );
}
