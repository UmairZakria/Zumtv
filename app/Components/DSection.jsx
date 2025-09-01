import { Download, Play, Apple } from "lucide-react";

export default function Dsection() {
  const stats = [
    {
      number: "100M+",
      label: "Downloads",
    },
    {
      number: "400K+",
      label: "Satisfied User",
    },
    {
      number: "4.6/5",
      label: "Rating",
    },
  ];

  return (
    <div id='download' className="font-poppins ">
      <div className="container mx-auto py-8 md:px-0 px-2">
        {/* Download Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-semibold  text-gray-900 mb-8">
            Download ZumTV APP
          </h2>

          {/* Download Buttons */}
          <div className="flex flex-col items-center gap-6">
            {/* APK Download - Featured */}

            {/* Other Download Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {/* iOS App */}
              <button className="bg-prime cursor-pointer text-white px-6 py-4 rounded-lg flex items-center gap-4 hover:bg-gray-700 transition-colors">
                <img
                  src="https://img.icons8.com/?size=60&id=fKXXelWgP1B6&format=png&color=000000"
                  alt=""
                />
                <div className="text-left">
                  <div className="text-sm">Download</div>
                  <div className="text-lg font-semibold">IOS App</div>
                </div>
              </button>

              {/* Google Play */}
              <button className="bg-prime cursor-pointer text-white px-6 py-4 rounded-lg flex items-center gap-3 hover:bg-gray-700 transition-colors">
                <img
                  src="https://img.icons8.com/?size=60&id=L1ws9zn2uD01&format=png&color=000000"
                  alt=""
                />
                <div className="text-left">
                  <div className="text-sm">Available on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {/* iOS App */}
              <button className="bg-prime cursor-pointer text-white px-6 py-4 rounded-lg flex items-center gap-4 hover:bg-gray-700 transition-colors">
                <img
                  src="https://img.icons8.com/?size=60&id=TuXN3JNUBGOT&format=png&color=000000"
                  alt=""
                />
                <div className="text-left">
                  <div className="text-sm">Download For</div>
                  <div className="text-lg font-semibold">Windows</div>
                </div>
              </button>

              {/* Google Play */}
              <button className="bg-prime cursor-pointer text-white px-6 py-4 rounded-lg flex items-center gap-3 hover:bg-gray-700 transition-colors">
                <img
                  src="https://img.icons8.com/?size=60&id=122959&format=png&color=000000"
                  alt=""
                />
                <div className="text-left">
                  <div className="text-sm">Download For</div>
                  <div className="text-lg font-semibold">Mac</div>
                </div>
              </button>
            </div>
            <button className="bg-prime cursor-pointer text-white px-8 py-4 rounded-lg flex items-center gap-4 hover:bg-gray-800 transition-colors shadow-lg">
              <img
                src="https://img.icons8.com/?size=60&id=Qn4GH3u6CYo5&format=png&color=000000"
                alt=""
              />
              <div className="text-left">
                <div className="text-sm font-semibold">DIRECT DOWNLOAD</div>
                <div className="text-lg font-bold">.APK FILE</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 py-8  bg-gray-50 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-5xl font-semibold text-gray-900 mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
