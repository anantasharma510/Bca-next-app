import React from "react";

const TechResearchInnovation = () => {
  const techTeam = [
    {
      name: "Ankit Sharma",
      role: "Team Lead",
      imgurl: "https://randomuser.me/api/portraits/men/20.jpg",
    },
    {
      name: "Priya Kharel",
      role: "Software Developer",
      imgurl: "https://randomuser.me/api/portraits/women/40.jpg",
    },
    {
      name: "Rohan Das",
      role: "AI Specialist",
      imgurl: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      name: "Sneha Thapa",
      role: "Data Analyst",
      imgurl: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Vikas Joshi",
      role: "Cloud Engineer",
      imgurl: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
      name: "Meena Karki",
      role: "Cybersecurity Expert",
      imgurl: "https://randomuser.me/api/portraits/women/30.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center my-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Tech Research & <span className="text-sky-600">Innovations Team</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10">
        {techTeam.map((member, index) => (
          <div
            key={index}
            className="bg-white hover:bg-sky-50 p-5 rounded-xl text-center transition duration-200 ease-in-out shadow-md"
          >
            <img
              className="h-28 w-28 mx-auto rounded-full border-2 border-red-500"
              src={member.imgurl}
              alt={member.name}
            />
            <h2 className="text-red-700 text-lg font-semibold">{member.name}</h2>
            <p className="text-sky-700">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechResearchInnovation;
