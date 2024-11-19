import React from "react";
import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  keywords: string; // New prop for keywords
  hashtags: string; // New prop for hashtags
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, imageUrl, url, keywords, hashtags }) => {
  return (
    <Helmet>
      {/* Title and Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Keywords for SEO */}
      <meta name="keywords" content={keywords} /> {/* Add keywords */}

      {/* Open Graph tags for Facebook, WhatsApp, LinkedIn */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Hashtags for social media (Twitter and Instagram) */}
      <meta name="twitter:hashtags" content={hashtags} /> {/* Add hashtags */}
      
      {/* WhatsApp (uses Open Graph) */}
      <meta property="og:image:secure_url" content={imageUrl} />
    </Helmet>
  );
};

export default MetaTags;
