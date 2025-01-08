'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Lightbulb, Rocket, Users } from 'lucide-react';

// Rest of your code here

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("about");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 },
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 via-purple-50 to-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Empowering BCA Students
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div className="lg:w-1/2 sticky top-8" {...fadeIn}>
            <div className="overflow-hidden shadow-lg rounded-xl">
              <Image
                src="/tri.jpg?height=400&width=600" 
                alt="College Building"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-6 bg-white bg-opacity-90 backdrop-blur-sm absolute bottom-0 left-0 right-0">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Association of BCA Students</h3>
                <p className="text-gray-600">Fostering excellence in technology and innovation</p>
              </div>
            </div>
          </motion.div>
          <div className="lg:w-1/2 space-y-8">
            <div className="w-full">
              <div className="grid w-full grid-cols-2 mb-8">
                <button
                  onClick={() => handleTabChange("about")}
                  className={`text-lg p-2 ${activeTab === "about" ? "font-bold border-b-2 border-blue-500" : ""}`}
                >
                  About Us
                </button>
                <button
                  onClick={() => handleTabChange("tech-research-innovation")}
                  className={`text-lg p-2 ${activeTab === "tech-research-innovation" ? "font-bold border-b-2 border-blue-500" : ""}`}
                >
                  Tech Research & Innovation
                </button>
              </div>

              {activeTab === "about" && (
                <motion.div className="space-y-6" {...fadeIn}>
                  <div className="overflow-hidden">
                    <div className="p-6 space-y-4">
                      <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
                        <Users className="w-8 h-8 text-blue-500" />
                        Our Mission
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        The Association of BCA Students is dedicated to fostering a vibrant community of aspiring IT professionals. We provide a platform for growth, collaboration, and excellence in the field of Computer Applications.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        {["Promoting academic excellence and professional development",
                          "Organizing workshops, seminars, and tech events",
                          "Building a strong network of students and industry professionals",
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "tech-research-innovation" && (
                <motion.div className="space-y-6" {...fadeIn}>
                  <div className="overflow-hidden">
                    <div className="p-6 space-y-4">
                      <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
                        <Rocket className="w-8 h-8 text-purple-500" />
                        Tech Research & Innovation
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Our Tech Research & Innovation initiative is at the forefront of technological advancements, combining cutting-edge research with innovative solutions. We foster a culture of inquiry, creativity, and entrepreneurship among BCA students.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        {["Conducting research seminars and innovation workshops",
                          "Organizing hackathons and tech challenges",
                          "Facilitating student research projects and startups",
                          "Hosting tech talks with industry experts and innovators",
                          "Annual research symposium and innovation showcase",
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100">
                <div className="flex items-center gap-4">
                  <Lightbulb className="w-10 h-10 text-yellow-500" />
                  <p className="text-gray-800 font-medium text-lg">
                    Empowering BCA students to become the tech leaders of tomorrow through cutting-edge research, innovation, and community collaboration.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <button className="w-full text-lg py-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
                Join Our Community
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
