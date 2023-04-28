import * as React from "react";

interface HeroProps {
  title?: string;
  description?: string;
  image?: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, image }) => {
  const [loadImage, setLoadImage] = React.useState(true);

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="pb-6 font-bold text-center text-h2">{title}</h1>

        {image && (
          <div className="flex items-center justify-center sm:max-w-[500px] min-h-[350px] w-full mx-auto relative">
            <img
              src={image}
              className="object-contain w-full"
              alt="table"
              onLoad={() => setLoadImage(false)}
            />

            {loadImage && (
              <div className="absolute top-0 left-0 flex w-full h-full mb-4 bg-gray-200 animate-pulse rounded-xl" />
            )}
          </div>
        )}

        <div className="pt-8">
          <p className="text-base font-medium text-justify">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
