import Image from "next/image";
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Left Column */}
        <div className="space-y-8 z-10">
          {/* Avatar Group */}
        

       
          <br></br>
          <br></br>
          
          <div className="space-y-6">
            <h1 className="space-y-2 text-center sm:text-left">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Stay Connected
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500">
                Enhance Your Learning
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                With Us
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Access vital resources, get the latest announcements, and discover a wide array
              of activities tailored to enhance your educational experience with the
              Association of BCA Students.
            </p>
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center gap-2 shadow-lg">
              Connect With Us Today
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
<br></br>
        {/* Right Column */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full">
  <Image
    src="/home.jpg?height=600&width=800"
    alt="Academic audience"
    width={800}
    height={600}
    className="object-cover w-full h-full"
    priority
  />


          {/* Overlay Card */}
          <div className="absolute bottom-8 right-8 bg-gray-900/80 backdrop-blur-md text-white p-6 rounded-xl max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Discover Our Offerings</h3>
            <p className="text-gray-200 text-sm mb-4 leading-relaxed">
              Explore our diverse resources and features, including notices, blogs, an AI Chatbot, and a
              secure results section.
            </p>
            <button className="border-2 border-white text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition duration-300 flex items-center gap-2 shadow-md">
              View Resources
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
