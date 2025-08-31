import { Star } from "lucide-react";

export default function Review() {
  const reviews = [
    {
      name: "Naw421",
      date: "02/01/2021",
      rating: 5,
      title: "Initially confused, now happy!",
      review: "I absolutely love using this app! I have it on my TV, and it works perfectly. While there are times when the Arabic movies or shows I want to watch aren't available, I understand it can't have everything. But with how much it offers, it's truly impressive!"
    },
    {
      name: "~Jules555~",
      date: "10/11/2018",
      rating: 5,
      title: "cool",
      review: "This app has totally revolutionized my TV watching experience! The interface is super easy to use, and the streaming quality is excellent. I can quickly find my favorite shows and channels with just a few clicks. I highly recommend it!"
    },
    {
      name: "HILOMY",
      date: "02/10/2019",
      rating: 4,
      title: "Good!",
      review: "This app has totally revolutionized my TV watching experience! The interface is super easy to use, and the streaming quality is excellent. I can quickly find my favorite shows and channels with just a few clicks. I highly recommend it!"
    },
    {
      name: "Julia",
      date: "06/05/2021",
      rating: 5,
      title: "How the app works",
      review: "I love it but ..... it keep froze every 10 minutes and I have to exit and go back again and when someone call I can still seeing my show but is no sound so again I have to exit the app and get back in again, but I love it cuz I can watch and Argentinian channel live, news, talk shows etc"
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating 
                ? 'fill-orange-400 text-orange-400' 
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-16 md:px-0 px-2">
      {/* Header */}
      <h1 className="text-3xl lg:text-5xl font-poppins font-semibold text-center text-gray-900 mb-12">
        ZumTV App Reviews
      </h1>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white !border border-gray-200 rounded-lg p-6 shadow-xl hover:shadow-md transition-shadow">
            {/* Star Rating */}
            {renderStars(review.rating)}
            
            {/* User Info */}
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-semibold text-gray-900">{review.name}</span>, {review.date}
            </div>
            
            {/* Review Title */}
            <h3 className="font-bold text-gray-900 mb-3">
              {review.title}
            </h3>
            
            {/* Review Text */}
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}