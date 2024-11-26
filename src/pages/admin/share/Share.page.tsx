import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button, TextInput, Textarea, Card } from "flowbite-react";
import {
  FaWhatsapp,
  FaFacebookSquare,
  FaInstagram,
  FaDownload,
  FaLink,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

const SharePage: React.FC = () => {
  const [baseURL, setBaseURL] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(
    `🏠🚚 Discover Stress-Free Relocation with SHIFTER.COM! 🏠🚚

    Are you planning to move to a new home? Let SHIFTER.COM make your house shifting experience smooth, hassle-free, and affordable! Our professional team ensures your belongings are packed, moved, and unpacked with care. Whether it's a local move or a long-distance relocation, we've got you covered!
    
    
    `
  );
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentURL = window.location.href; // Full current URL
    const baseURL = `${window.location.protocol}//${window.location.host}`; // Base URL
    console.log(baseURL);
    setBaseURL(baseURL);
    setUrl(currentURL);
  }, []);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "qr-code.png"; // Specify the file name
        link.click();
      }
    }
  };

  const copyToClipboard = () => {
    const textToCopy = `${content}\n${baseURL}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
    //   alert("Content preview copied to clipboard!");
    toast.info("Content preview copied to clipboard!");
    });
    
  };

  const handleShare = (platform: string) => {
    const encodedURL = encodeURIComponent(url);
    const encodedContent = encodeURIComponent(content);

    let shareURL = "";
    switch (platform) {
      case "whatsapp":
        shareURL = `https://wa.me/?text=${encodedContent}%20${encodedURL}`;
        break;
      case "twitter":
        shareURL = `https://twitter.com/intent/tweet?text=${encodedContent}&url=${encodedURL}`;
        break;
      case "facebook":
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
        break;
      case "instagram":
        alert(
          "Instagram sharing via web is not supported. Use the mobile app."
        );
        return;
      default:
        return;
    }

    window.open(shareURL, "_blank");
  };

  return (
    <div className="min-h-screen mb-20 lg:mb-0 p-4">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Share Your Page
        </h1>
        <div className="space-y-4">
          <div>
            <TextInput
              id="url"
              type="text"
              value={baseURL}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the URL to share"
            />
          </div>
          <div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a catchy message to share"
              rows={3}
            />
          </div>
        </div>
        <div className="my-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            QR Code Preview
          </h3>
          <div
            ref={qrCodeRef}
            className="inline-block p-4 bg-white shadow rounded-lg"
          >
            <QRCodeCanvas value={baseURL} size={128} />
          </div>
          <div className="flex justify-center my-2">
            <Button onClick={downloadQRCode} color="primary">
              <FaDownload className="mr-2 h-4 w-4" />
              <span>Download QR Code</span>
            </Button>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Content Preview
          </h3>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">{content}</p>
            <a
              href={baseURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              {baseURL}
            </a>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              onClick={copyToClipboard}
              color="indigo"
              className="flex items-center space-x-2"
            >
              <FaLink className="mr-2 h-4 w-4" />
              <span>Copy Content</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            color="green"
            onClick={() => handleShare("whatsapp")}
            className="flex items-center justify-center space-x-2"
          >
            <FaWhatsapp className="mr-2 h-4 w-4" />
            <span>Share on WhatsApp</span>
          </Button>
          <Button
            color="blue"
            onClick={() => handleShare("twitter")}
            className="flex items-center justify-center space-x-2"
          >
            <FaXTwitter className="mr-2 h-4 w-4" />
            <span>Share on Twitter</span>
          </Button>
          <Button
            color="blue"
            onClick={() => handleShare("facebook")}
            className="flex items-center justify-center space-x-2"
          >
            <FaFacebookSquare className="mr-2 h-4 w-4" />
            <span>Share on Facebook</span>
          </Button>
          <Button
            color="pink"
            onClick={() => handleShare("instagram")}
            className="flex items-center justify-center space-x-2"
          >
            <FaInstagram className="mr-2 h-4 w-4" />
            <span>Share on Instagram</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SharePage;
