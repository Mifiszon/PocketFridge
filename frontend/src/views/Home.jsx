import React from 'react';

function Home() {
  return (
    <div>
      <main role="main">
        <div className="relative">
          <img src="/assets/fridge.png" alt="Food Control" className="w-full h-[900px] object-cover" />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex flex-col justify-center items-center">
            <h1 style={{fontSize: "100px"}} className="text-xl text-white font-bold text-center leading-snug">
              Your Food<br />Your Control
            </h1>
            <p className="text-white text-lg mt-4 text-center">Monitor and plan expiration dates<br /><br /> Reduce food waste</p>
            <div className="flex justify-center mt-8">
              <button
                style={{fontSize: "30px"}}
                onClick={() => window.location.href = "/register"}
                className="bg-green-600 hover:bg-green-800 text-white py-4 px-12 rounded-lg text-xl transition duration-500"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-medium mb-8">How it works?</h2>
            <p className="text-lg font-semibold mb-8">Learn how our platform helps you manage your food easily and efficiently.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
              <div className="flex flex-col items-center max-w-[150px]">
                <img src="/assets/add.png" alt="Add to list" className="w-20 h-20 mb-2" />
                <p className="font-semibold">1. Add to list</p>
                <p className="text-sm">Select the food you want to track</p>
              </div>
              <img src="/assets/arrow.png" alt="arrow" className="hidden md:inline w-10 h-10" />
              <div className="flex flex-col items-center max-w-[150px]">
                <img src="/assets/date.png" alt="Set date" className="w-20 h-20 mb-2" />
                <p className="font-semibold">2. Set expiry date</p>
                <p className="text-sm">Don’t let food sneak past you</p>
              </div>
              <img src="/assets/arrow.png" alt="arrow" className="hidden md:inline w-10 h-10" />
              <div className="flex flex-col items-center max-w-[150px]">
                <img src="/assets/notification.png" alt="Get notified" className="w-20 h-20 mb-2" />
                <p className="font-semibold">3. Get notified</p>
                <p className="text-sm">We’ll remind you in time</p>
              </div>
              <img src="/assets/arrow.png" alt="arrow" className="hidden md:inline w-10 h-10" />
              <div className="flex flex-col items-center max-w-[150px]">
                <img src="/assets/cook.png" alt="Use & save" className="w-20 h-20 mb-2" />
                <p className="font-semibold">4. Use it & save</p>
                <p className="text-sm">Eat smart and reduce waste</p>
              </div>
              <img src="/assets/arrow.png" alt="arrow" className="hidden md:inline w-10 h-10" />
              <div className="flex flex-col items-center max-w-[150px]">
                <img src="/assets/planet.png" alt="Save the planet" className="w-20 h-20 mb-2" />
                <p className="font-semibold">5. Help the planet</p>
                <p className="text-sm">Every saved product matters!</p>
              </div>
            </div>
          </div>


          <div className="text-center mt-24">
            <h2 className="text-2xl font-medium mb-8">Why us?</h2>
            <p className="text-lg font-semibold mb-8">Find out why our app stands out in helping you control food waste and make smarter choices.</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 mt-10 mb-16">
              <div className="flex flex-col items-center text-center max-w-xs">
                <img src="/assets/reminder.png" alt="Reminders" className="w-24 h-24 mb-4" />
                <p className="text-lg font-small">Smart reminders before food expires</p>
              </div>
              <div className="flex flex-col items-center text-center max-w-xs">
                <img src="/assets/plan.png" alt="Planning" className="w-24 h-24 mb-4" />
                <p className="text-lg font-small">Better meal planning and food use</p>
              </div>
              <div className="flex flex-col items-center text-center max-w-xs">
                <img src="/assets/recycle.png" alt="Reduce" className="w-24 h-24 mb-4" />
                <p className="text-lg font-small">Reduce your ecological footprint</p>
              </div>
              <div className="flex flex-col items-center text-center max-w-xs">
                <img src="/assets/save.png" alt="Save" className="w-24 h-24 mb-4" />
                <p className="text-lg font-small">Save money buying only what you need</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-24 mb-20">
            <h2 className="text-2xl font-medium mb-4">Preview</h2>
            <p className="text-lg font-semibold mb-8">Take a quick look at the features and interface of the app before signing up.</p>

            <div className="flex justify-center mb-12">
              <img src="/assets/preview.png" alt="Preview" className="rounded-lg shadow-lg max-w-full w-[600px]" />
            </div>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => window.location.href = "/register"}
                className="bg-green-600 hover:bg-green-800 text-white py-3 px-8 rounded-lg text-lg transition duration-300"
              >
                Zarejestruj się
              </button>
              <button
                onClick={() => window.location.href = "/login"}
                className="bg-gray-100 border-2 border-green-600 hover:bg-gray-900 text-green-700 py-3 px-8 rounded-lg text-lg transition duration-300"
              >
                Zaloguj się
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="container text-center py-8">
        <p>© Pocket Fridge 2025</p>
      </footer>
    </div>
  );
}

export default Home;
