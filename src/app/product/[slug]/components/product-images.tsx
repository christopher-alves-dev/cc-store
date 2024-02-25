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
    <div className="flex flex-col gap-8">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 px-5">
        {imageUrls.map((image) => (
          <button
            key={image}
            className={twJoin(
              "flex h-[100px] items-center justify-center rounded-lg bg-accent",
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
