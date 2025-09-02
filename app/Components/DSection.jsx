"use client";
import React, { useState, useRef, useEffect } from "react";
import { 
  LoaderCircle,
} from 'lucide-react';
export default function Dsection() {
  const [downloadOptions, setDownloadOptions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Helper function to get platform display text
  const getPlatformDisplayText = (platform) => {
    const displayTexts = {
      windows: { prefix: "Download For", name: "Windows" },
      mac: { prefix: "Download For", name: "Mac" },
      android: { prefix: "Available on", name: "Google Play" },
      ios: { prefix: "Download", name: "IOS App" },
      apk: { prefix: "DIRECT DOWNLOAD", name: ".APK FILE" }
    };
    return displayTexts[platform.toLowerCase()] || { prefix: "Download", name: platform };
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
            displayText: getPlatformDisplayText(download.platform)
          }));

          setDownloadOptions(transformedOptions);
        } else {
          // Fallback to default options if API fails
          setDownloadOptions([
            {
              platform: "Windows",
              icon: "https://img.icons8.com/?size=60&id=TuXN3JNUBGOT&format=png&color=000000",
              downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
              displayText: { prefix: "Download For", name: "Windows" }
            },
            {
              platform: "Mac", 
              icon: "https://img.icons8.com/?size=60&id=122959&format=png&color=000000",
              downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
              displayText: { prefix: "Download For", name: "Mac" }
            },
            {
              platform: "Android",
              icon: "https://img.icons8.com/?size=60&id=L1ws9zn2uD01&format=png&color=000000", 
              downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509",
              displayText: { prefix: "Available on", name: "Google Play" }
            },
            {
              platform: "iOS",
              icon: "https://img.icons8.com/?size=60&id=fKXXelWgP1B6&format=png&color=000000",
              downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509", 
              displayText: { prefix: "Download", name: "IOS App" }
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching downloads:", error);
        // Fallback to default options
        setDownloadOptions([
          {
            platform: "Windows",
            icon: "https://img.icons8.com/?size=60&id=TuXN3JNUBGOT&format=png&color=000000",
            downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
            displayText: { prefix: "Download For", name: "Windows" }
          },
          {
            platform: "Mac",
            icon: "https://img.icons8.com/?size=60&id=122959&format=png&color=000000", 
            downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/",
            displayText: { prefix: "Download For", name: "Mac" }
          },
          {
            platform: "Android",
            icon: "https://img.icons8.com/?size=60&id=L1ws9zn2uD01&format=png&color=000000",
            downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509",
            displayText: { prefix: "Available on", name: "Google Play" }
          },
          {
            platform: "iOS", 
            icon: "https://img.icons8.com/?size=60&id=fKXXelWgP1B6&format=png&color=000000",
            downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509",
            displayText: { prefix: "Download", name: "IOS App" }
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  // Handle download button click
  const handleDownload = (downloadUrl) => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div id="download" className="font-poppins">
        <div className="container mx-auto py-8 md:px-0 px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 mb-8">
              Download ZumTV APP
            </h2>
            <div className="text-gray-600"><LoaderCircle className="animate-spin mx-auto"/></div>
          </div>
        </div>
      </div>
    );
  }

  // Separate APK and other platforms
  const apkOption = downloadOptions.find(option => option.platform.toLowerCase() === 'apk');
  const otherOptions = downloadOptions.filter(option => option.platform.toLowerCase() !== 'apk');

  return (
    <div id="download" className="font-poppins">
      <div className="container mx-auto py-8 md:px-0 px-2">
        {/* Download Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 mb-8">
            Download ZumTV APP
          </h2>

          {/* Download Buttons */}
          <div className="flex flex-col items-center gap-6">
            {/* APK Download - Featured (if available) */}
            {apkOption && (
              <button 
                onClick={() => handleDownload(apkOption.downloadUrl)}
                className="bg-prime cursor-pointer text-white px-8 py-4 rounded-lg flex items-center gap-4 hover:bg-prime2 transition-colors shadow-lg"
              >
                <img src={apkOption.icon} alt="" />
                <div className="text-left">
                  <div className="text-sm font-semibold">
                    {apkOption.displayText?.prefix || "DIRECT DOWNLOAD"}
                  </div>
                  <div className="text-lg font-bold">
                    {apkOption.displayText?.name || ".APK FILE"}
                  </div>
                </div>
              </button>
            )}

            {/* Other Download Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <button 
                onClick={() => handleDownload("https://www.filehorse.com/download-iptv-smarters-pro/download/")}
                className="bg-prime cursor-pointer text-white px-8 py-4 rounded-lg flex items-center gap-4 hover:bg-prime2 transition-colors shadow-lg"
              >
                <img
                  src="https://img.icons8.com/?size=60&id=Qn4GH3u6CYo5&format=png&color=000000"
                  alt=""
                />
                <div className="text-left">
                  <div className="text-sm font-semibold">DIRECT DOWNLOAD</div>
                  <div className="text-lg font-bold">.APK FILE</div>
                </div>
              </button>
              {otherOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleDownload(option.downloadUrl)}
                  className="bg-prime cursor-pointer text-white px-6 py-4 rounded-lg flex items-center gap-4 hover:bg-prime2 transition-colors"
                >
                  <img src={option.icon} alt="" />
                  <div className="text-left">
                    <div className="text-sm">
                      {option.displayText?.prefix || "Download"}
                    </div>
                    <div className="text-lg font-semibold">
                      {option.displayText?.name || option.platform}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* If no APK in API but we want to show it separately, show fallback APK */}
            {/* {!apkOption && (

            )} */}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 py-8 bg-gray-50 md:grid-cols-3 gap-8 mb-16">
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