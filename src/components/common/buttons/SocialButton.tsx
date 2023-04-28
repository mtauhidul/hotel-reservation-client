import * as React from "react";

interface SocialButtonProps {
  src?: string;
  title?: string;
  url?: string;
}

const SocialButton = ({ src, title, url }: SocialButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center col-span-3 px-2 py-5 transition-all duration-300 ease-in-out border-2 rounded-full shadow-xl sm:col-span-1 hover:scale-105 border-slate-200 text-inherit"
    >
      <img src={src} alt={title} className="object-contain w-auto h-24" />
      <p className="mt-2 text-base font-semibold sm:text-lg text-primary">
        {title}
      </p>
    </a>
  );
};

export default SocialButton;
