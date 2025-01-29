import React from "react";

const TechResearchInnovation = () => {
  const techTeam = [
    {
      name: "Ananta Sharma",
      role: "President",
      imgurl: "https://lh3.googleusercontent.com/a/ACg8ocLUFKeNkoZjY4WoABPxIx6Qerognk2aPd-DX1daO39R89c3oBS2=s96-c",
    },
    {
      name: "Echhya Bhattrai",
      role: "Software Developer",
      imgurl: "https://randomuser.me/api/portraits/women/40.jpg",
    },
    {
      name: "Om parsad poudel",
      role: "AI Specialist",
      imgurl: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      name: "Darshana Aryal",
      role: "Data Analyst",
      imgurl: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Samarpan kc",
      role: "Cloud Engineer",
      imgurl: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
      name: "Kisor sharma subedi",
      role: "Cybersecurity Expert",
      imgurl: "https://i.pinimg.com/originals/fa/de/85/fade857bca64ba9f4dc017d59a9c6e7c.jpg",
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
