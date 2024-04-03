"use client";
import Image from "next/image";
import React, { useState } from "react";
import { twJoin } from "tailwind-merge";

type Props = {
  name: string;
  imageUrls: string[];
};

export default function ProductImages({ imageUrls, name }: Props) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
  };

  return (
    <div className="flex flex-col gap-8 lg:relative lg:flex-1">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent lg:h-full lg:rounded-lg">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 px-5 lg:absolute lg:bottom-0 lg:pb-5 lg:pl-5">
        {imageUrls.map((image) => (
          <button
            key={image}
            className={twJoin(
              "flex h-[100px] items-center justify-center rounded-lg lg:h-[77px] lg:w-[77px] lg:bg-black",
              image === currentImage && "border-2 border-solid border-primary",
            )}
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
