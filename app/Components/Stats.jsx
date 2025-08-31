import { Tv, Film, Play, Star } from "lucide-react";

export default function Stats() {
  const features = [
    {
      icon: Tv,
      title: "Live TV",
      description: "15,000+ Live channels of almost all countries of the world.",
      bgColor: "bg-blue-500"
    },
    {
      icon: Film,
      title: "Movies",
      description: "60,000+ movie channels and videos on demand.",
      bgColor: "bg-blue-500"
    },
    {
      icon: Play,
      title: "TV Series",
      description: "Best TV Series & Tv Shows of 2024 and All Time.",
      bgColor: "bg-blue-500"
    },
    {
      icon: Star,
      title: "Sports",
      description: "All Premium Sports Channels and PPV events.",
      bgColor: "bg-blue-500"
    }
  ];

  return (
    <div className="container mx-auto py-8 my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index}
              className="bg-white shadow-xl hover:-translate-y-3 transition-all duration-300 ease-in-out rounded-lg font-poppins p-6  hover:shadow-md  "
            >
              <div className={`bg-prime w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}