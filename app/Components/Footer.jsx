import {
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Globe,
  DollarSign,
  Apple,
  Monitor,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, color: "bg-blue-600 hover:bg-blue-700" },
    { icon: Youtube, color: "bg-red-600 hover:bg-red-700" },
    { icon: Linkedin, color: "bg-blue-700 hover:bg-blue-800" },
    { icon: Twitter, color: "bg-orange-500 hover:bg-orange-600" },
  ];

  const servicesLinks = [
    "About Us",
    "Contacts",
    "Privacy Policy",
    "Terms of Service",
  ];

  return (
    <footer className=" bg-prime font-poppins text-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className=" ">
              <img src="/logo.png" className="w-[120px]" alt="" />
            </div>

            <p className="text-white/90 mb-6 leading-relaxed">
              ZumTV is a IPTV player that allows users to stream content by
              loading M3U Playlist URLs or Xtream Codes API from various IPTV
              providers.{" "}
            </p>

            {/* Social Media Icons */}
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contacts</h3>
            <div className="space-y-4 text-white/90">
              <div>
                <div className="font-semibold mb-1">Phone:</div>
                <div className="text-sm">+33644655404</div>
              </div>

              <div>
                <div className="font-semibold mb-1">Email:</div>
                <div className="text-sm">zumtvofficial1@gmail.com</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <div className="space-y-3">
              {servicesLinks.map((service, index) => (
                <div key={index}>
                  <a
                    href="#"
                    className="text-white/90 hover:text-white transition-colors text-sm block"
                  >
                    {service}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Download App</h3>
            <div className="flex gap-4 mb-6">
              {/* Platform Icons */}
              <a
                href="https://apps.apple.com/pk/app/smarters-player-lite/id1628995509"
                target="_blank"
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
              >
                <img
                  src="https://img.icons8.com/?size=60&id=L1ws9zn2uD01&format=png&color=000000"
                  alt="playstore"
                />
              </a>

              <a
                href="https://apps.apple.com/pk/app/smarters-player-lite/id1628995509"
                target="_blank"
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
              >
                <img
                  src="https://img.icons8.com/?size=60&id=fKXXelWgP1B6&format=png&color=000000"
                  alt="ios"
                />
              </a>
              <a
                href="https://www.filehorse.com/download-iptv-smarters-pro/download/"
                target="_blank"
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
              >
                <img
                  src="https://img.icons8.com/?size=60&id=TuXN3JNUBGOT&format=png&color=000000"
                  alt="ios"
                />
              </a>
              <a
                href="https://www.filehorse.com/download-iptv-smarters-pro/download/"
                target="_blank"
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
              >
                <img
                  src="https://img.icons8.com/?size=60&id=122959&format=png&color=000000"
                  alt="ios"
                />
              </a>
            </div>
            <h3 className="text-xl font-semibold mb-6">Socials</h3>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={index}
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-colors`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
