"use client";

import Image from "next/image";

interface ImageMDXProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageMDX({
  src,
  alt,
  width = 800,
  height = 400,
  className,
}: ImageMDXProps) {
  return (
    <div className="relative my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-lg mx-auto w-full h-[400px] object-cover ${className ?? ""}`}
        quality={80}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
    </div>
  );
}
