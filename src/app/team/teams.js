import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Teams = () => {
  const teams = [
    {
      name: "Anil Vhugai",
      role: "Vice President",
      imgurl: "https://randomuser.me/api/portraits/women/31.jpg",
    },
    {
      name: "Monika Shrestha",
      role: "Secretary",
      imgurl: "https://i.ibb.co/68hhrrM/Screenshot-2024-05-16-190550.png",
    },
    {
      name: "Bishal Subedi",
      role: "Joint Secretary",
      imgurl: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Rejina Thapa Magar",
      role: "Treasurer",
      imgurl: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Binita Lamsal",
      role: "Joint Treasurer",
      imgurl: "https://randomuser.me/api/portraits/women/13.jpg",
    },
    {
      name: "Amit KC",
      role: "Executive Member",
      imgurl: "https://i.ibb.co/H4GgxNM/Screenshot-2024-05-16-191108.png",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center my-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Meet The <span className="text-sky-600">Executive Team</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10">
        <div className="bg-white hover:bg-sky-50 p-5 rounded-xl text-center transition duration-200 ease-in-out shadow-md">
          <img
            className="h-36 w-36 mx-auto rounded-full border-2 border-red-500"
            src="https://i.ibb.co/qkPkdG0/Screenshot-2024-05-15-180754.png"
            alt="Sujan Dhakal"
          />
          <h2 className="text-red-700 text-lg font-semibold">Sujan Dhakal</h2>
          <p className="text-sky-700">President</p>
        </div>
        {teams.map((member, index) => (
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
            <div className="flex justify-center space-x-4 mt-3">
              <a href="#">
                <FaFacebook className="text-blue-500 text-lg" />
              </a>
              <a href="#">
                <FaInstagram className="text-pink-500 text-lg" />
              </a>
              <a href="#">
                <FaTwitter className="text-blue-400 text-lg" />
              </a>
            </div>
          </div>
        ))}
      </div>
 
    </div>
  );
};

export default Teams;
