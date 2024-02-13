import React from "react";

type ColorMapWrapperProps = {
  label: string;
  children: React.ReactNode;
};

export default function ColorMapWrapper({ label, children }: ColorMapWrapperProps) {
  return (
    <div className="flex flex-col items-center mx-4 my-2">
      <div className="text-center mb-2">
        {label}
      </div>

      <div className="bg-black py-2">
        {children}
      </div>
    </div>
  );
}
