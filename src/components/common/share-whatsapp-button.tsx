"use client";

import { WhatsappIcon } from "../icons/whatsapp-icon";

interface ShareWhatsappButtonProps {
  url: string;
  message?: string;
}

export const ShareWhatsappButton: React.FC<ShareWhatsappButtonProps> = ({
  url,
  message = "Échale un vistazo",
}) => {
  const handleShare = () => {
    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(url);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button onClick={handleShare}>
      <WhatsappIcon className="size-5 text-black dark:text-white" />
    </button>
  );
};
