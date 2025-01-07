const ThreeSlider = () => {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {/* Card 1: About Us */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-4 text-sm font-medium text-gray-600">About Us</div>
            <h1 className="text-2xl font-bold text-gray-900">
              Unlock the potential of your academic journey with{" "}
              <a href="#" className="text-blue-500 hover:underline">
                the Association of BCA Students
              </a>.
            </h1>
            <p className="mt-4 text-gray-600">
              Our platform is designed to be your comprehensive resource hub,
              where students and faculty can effortlessly access vital
              information, stay current with important announcements, and engage
              in various association activities.
            </p>
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
              Engage with Us
              <span>&#8594;</span>
            </button>
          </div>
  
          {/* Card 2: Stay Updated */}
          <div className="relative p-6 bg-white rounded-lg shadow-lg">
            <div className="absolute top-4 right-4 text-sm font-medium text-gray-600">
              Term Timetables
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🤖</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">Stay Updated</h2>
              <p className="mt-2 text-gray-600">
                Access important updates that affect your academic life.
              </p>
            </div>
          </div>
  
          {/* Card 3: Blog Insights */}
          <div className="relative p-6 bg-white rounded-lg shadow-lg">
            <div className="absolute top-4 left-4 text-sm font-medium text-gray-600">
              Blog Insights
            </div>
            <div className="text-center">
              <img
                src="/images/child-learning.jpg"
                alt="Learning"
                className="rounded-lg w-full h-32 object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-800">Learn from Peers</h2>
              <p className="mt-2 text-gray-600">
                Engage with articles crafted by fellow students and faculty.
              </p>
            </div>
          </div>
        </section>
  
        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center">
            &#8592;
          </button>
          <button className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center">
            &#8594;
          </button>
        </div>
      </div>
    );
  };
  
  export default ThreeSlider;
  