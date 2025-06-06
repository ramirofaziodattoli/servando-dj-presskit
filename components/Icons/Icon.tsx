"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { IconKey, icons, logos, LogosKeys } from "@/assets";
import SVG, { Props } from "react-inlinesvg";

export interface IconProps extends Props {
  src: IconKey | LogosKeys;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  src,
  className,
  height,
  width,
  fill,
  ...props
}) => {
  let source: string = logos[src as LogosKeys] || icons[src as IconKey];

  return (
    <SVG
      width={width}
      height={height}
      src={source}
      color={fill}
      preProcessor={(code) => {
        return code
          .replace(/fill=".*?"/g, 'fill="currentColor"')
          .replace(/stroke=".*?"/g, 'stroke="currentColor"')
          .replace(/fill=".*?"/, 'fill="none"');
      }}
      className={twMerge(
        className,
        "transition duration-500 hover:cursor-pointer"
      )}
      {...props}
    />
  );
};

export default Icon;
