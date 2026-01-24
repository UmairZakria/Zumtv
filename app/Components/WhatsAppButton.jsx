import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "33644655404"; // WhatsApp number without +
  const message = "Hello! I'm interested in learning more about ZumTV.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-[9999] transition-transform bg-green-500 hover:scale-110 rounded-full  duration-300 ease-in-out"
      title="Chat with us on WhatsApp"
    >
       <img src='https://img.icons8.com/?size=68&id=iHyuCoDsohLG&format=png&color=FFFFFF' className='w-[36px] lg:w-auto rounded-full'  alt="" />
    </a>
  );
}

export default WhatsAppButton;
