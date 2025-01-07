import React from "react";

const PreviousCommittee = () => {
  const previousMembers = [
    {
      name: "Kiran Shrestha",
      role: "President",
      imgurl: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Sujata KC",
      role: "Vice President",
      imgurl: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      name: "Ramesh Adhikari",
      role: "Secretary",
      imgurl: "https://randomuser.me/api/portraits/men/30.jpg",
    },
    {
      name: "Manju Gurung",
      role: "Treasurer",
      imgurl: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      name: "Prajwal Thapa",
      role: "Executive Member",
      imgurl: "https://randomuser.me/api/portraits/men/33.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center my-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Previous <span className="text-sky-600">Committee Members (2079)</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10">
        {previousMembers.map((member, index) => (
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

export default PreviousCommittee;
