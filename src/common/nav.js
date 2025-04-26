import { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import IC_ArrowUp from "@/assets/images/icons/ic_gnb_arrow_up.png";
import IC_ArrowDown from "@/assets/images/icons/ic_gnb_arrow_down.png";
import IC_Video from "@/assets/images/icons/ic_gnb_video.png";
import IC_Setting from "@/assets/images/icons/ic_gnb_setting.png";
import IC_Audience from "@/assets/images/icons/ic_gnb_audience.png";

export default function Sidebar() {
  const [audienceOpen, setAudienceOpen] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selected, setSelected] = useState("Audience/Overview");
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const handleNavigation = (key, path) => {
    setSelected(key);
    router.push(path); // Next.js
    // navigate(path); // React Router
  };

  const menuItem = (label, key, path, level = 1) => (
    <div
      onClick={() => handleNavigation(key, path)}
      className={`cursor-pointer px-4 py-2 rounded-lg setitem ${
        selected === key ? "bg-gray-800 text-white seticon" : "text-white/80 hover:bg-gray-800"
      } ${level === 2 ? "pl-10" : "pl-4"}`}
    >
      <span>{label}</span>
    </div>
  );

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg transform transition-all duration-300 z-50 ${
        isHovered ? "w-65" : "w-22"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 space-y-2 h-full flex flex-col">
        <div className={`text-xl font-semibold mb-10 flex justify-start h-12 pl-4 ${isHovered ? "w-56" : "w-14"}`}>
          {isHovered ? <div>LG Channels<br/> Data Platform</div> : "LG"}
        </div>

        <div>
          <div
            onClick={() => setAudienceOpen(!audienceOpen)}
            className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
              selected.startsWith("Audience") ? "bg-[#7da09b]" : "hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Image src={IC_Audience} alt="Audience Icon"/>
              {isHovered && <span>Audience</span>}
            </div>
            {isHovered && (audienceOpen ? <Image src={IC_ArrowUp}/> : <Image src={IC_ArrowDown}/>)}
          </div>
          {isHovered && audienceOpen && (
            <div className="ml-2 mt-3 mb-3 space-y-1">
              {menuItem("Overview", "Overview", "/audience/overview", 2)}
              {menuItem("Analytics Workbench", "Analytics", "/audience/analyticsdata", 2)}
              {menuItem("Contents Pathing", "Contents", "/audience/contents", 2)}
              {menuItem("Viewer Acquisition", "Acquisition", "/audience/acquisition", 2)}
              {menuItem("Viewer Retention", "Retention", "/audience/retention", 2)}
              {menuItem("Segment Management", "Segments", "/audience/segments", 2)}
            </div>
          )}
        </div>

        <div>
          <div
            onClick={() => setVideoOpen(!videoOpen)}
            className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
              selected.startsWith("Video") ? "bg-[#7da09b]" : "hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Image src={IC_Video} alt="Video Icon"/>
              {isHovered && <span>Video</span>}
            </div>
            {isHovered && (videoOpen ? <Image src={IC_ArrowUp}/> : <Image src={IC_ArrowDown}/>)}
          </div>
          {isHovered && videoOpen && (
            <div className="ml-2 mt-3 mb-3 space-y-1">
              {menuItem("Trends", "Trends", "/video/trends", 2)}
              {menuItem("Overview", "Overview", "/video/overview", 2)}
            </div>
          )}
        </div>
        <div>
          <div className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${selected === "Settings" ? "bg-[#7da09b]" : "hover:bg-gray-800"}`}>
            <div onClick={() => handleNavigation("Settings", "/settings/settings")} className="flex items-center space-x-2">
              <Image src={IC_Setting} alt="Setting Icon"/>
              {isHovered && <span>Setting</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
