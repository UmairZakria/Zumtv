'use client'
import {
  Youtube,
  Linkedin,
  Twitter,
  Globe,
  DollarSign,
  Apple,
  Monitor,
  Send as Facebook,
  Instagram,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [downloadOptions, setDownloadOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siteInfo, setSiteInfo] = useState({ email: '', phone: '', socials: {} });

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

  // Helper function to get platform icons
  const getPlatformIcon = (platform) => {
    const icons = {
      windows: "https://img.icons8.com/?size=60&id=TuXN3JNUBGOT&format=png&color=000000",
      mac: "https://img.icons8.com/?size=60&id=122959&format=png&color=000000",
      android: "https://img.icons8.com/?size=60&id=L1ws9zn2uD01&format=png&color=000000",
      ios: "https://img.icons8.com/?size=60&id=fKXXelWgP1B6&format=png&color=000000",
      apk: "https://img.icons8.com/?size=60&id=Qn4GH3u6CYo5&format=png&color=000000"
    };
    return icons[platform.toLowerCase()] || icons.android;
  };

  // Helper function to get platform alt text
  const getPlatformAlt = (platform) => {
    const alts = {
      windows: "windows",
      mac: "mac", 
      android: "playstore",
      ios: "ios",
      apk: "apk"
    };
    return alts[platform.toLowerCase()] || platform.toLowerCase();
  };

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await fetch("/api/downloads");
        const data = await response.json();

        if (data.status === "success" && data.data) {
          // Transform backend data to match frontend structure
          const transformedOptions = data.data.map((download) => ({
            platform: download.platform.charAt(0).toUpperCase() + download.platform.slice(1),
            icon: getPlatformIcon(download.platform),
            downloadUrl: download.downloadUrl,
            version: download.version,
            description: download.description,
            alt: getPlatformAlt(download.platform)
          }));

          setDownloadOptions(transformedOptions);
        } else {
          // Fallback to default options if API fails
          setDownloadOptions([
            {
              platform: "Android",
              icon: "https://img.icons8.com/?size=60&id=L1ws9zn2uD01&format=png&color=000000",
              downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509",
              alt: "playstore"
            },
            {
              platform: "iOS",
              icon: "https://img.icons8.com/?size=60&id=fKXXelWgP1B6&format=png&color=000000",
              downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509",
              alt: "ios"
            },
            {
              platform: "Windows",
              icon: "https://img.icons8.com/?size=60&id=TuXN3JNUBGOT&format=png&color=000000",
              downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
              alt: "windows"
            },
            {
              platform: "Mac",
              icon: "https://img.icons8.com/?size=60&id=122959&format=png&color=000000",
              downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
              alt: "mac"
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching downloads:", error);
        // Fallback to default options
        setDownloadOptions([
          {
            platform: "Android",
            icon: "https://img.icons8.com/?size=60&id=L1ws9zn2uD01&format=png&color=000000",
            downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509",
            alt: "playstore"
          },
          {
            platform: "iOS",
            icon: "https://img.icons8.com/?size=60&id=fKXXelWgP1B6&format=png&color=000000",
            downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509",
            alt: "ios"
          },
          {
            platform: "Windows",
            icon: "https://img.icons8.com/?size=60&id=TuXN3JNUBGOT&format=png&color=000000",
            downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
            alt: "windows"
          },
          {
            platform: "Mac",
            icon: "https://img.icons8.com/?size=60&id=122959&format=png&color=000000",
            downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
            alt: "mac"
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch site contact info and socials
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data) {
          setSiteInfo({
            email: data.data.siteEmail || '',
            phone: data.data.sitePhone || '',
            socials: data.data.socials || {}
          });
        }
      });

    fetchDownloads();
  }, []);

  return (
    <footer className="bg-[#000000a9] relative font-poppins text-white">
            <div className="absolute inset-0 overflow-hidden -z-1">
        <img src="/bg.jpg" alt="" className="object-cover origin-center blur-sm" />
      </div>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="">
              <img src="/logo.png" className="w-[220px]" alt="" />
            </div>

          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contacts</h3>
            <div className="space-y-4 text-white/90">
              <div>
                <div className="font-semibold mb-1">Phone:</div>
                <div className="text-sm">{siteInfo.phone || '+33644655404'}</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Email:</div>
                <div className="text-sm">{siteInfo.email || 'zumtvofficial1@gmail.com'}</div>
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
            {loading ? (
              <div className="text-white/70 text-sm mb-6">Loading...</div>
            ) : (
              <div className="flex gap-4 mb-6">
                {/* Platform Icons */}
                {downloadOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                  >
                    <img
                      src={option.icon}
                      alt={option.alt}
                      className=""
                    />
                  </a>
                ))}
              </div>
            )}
            
            <h3 className="text-xl font-semibold mb-6">Socials</h3>
            <div className="flex items-center gap-3">
              {Object.entries(siteInfo.socials).map(([key, value]) => {
                if (!value) return null;
                let IconComponent = null;
                if (key === 'facebook') IconComponent = Facebook;
                if (key === 'twitter') IconComponent = Twitter;
                if (key === 'instagram') IconComponent = Instagram;
                if (key === 'youtube') IconComponent = Youtube;
                if (key === 'linkedin') IconComponent = Linkedin;
                if (!IconComponent) return null;
                return (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-00 bg-blue-400 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
                  >
                    <IconComponent className="w-5 h-5 text-white " />
                  </a>
                );
              })}
              <a href={`https://wa.me/${siteInfo.phone || '+33644655404'}`} className="w-10 h-10 " target="_blank"><img src="https://img.icons8.com/?size=60&id=16713&format=png&color=000000" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}