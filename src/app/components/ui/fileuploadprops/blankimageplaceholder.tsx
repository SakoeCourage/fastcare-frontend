"use client";
import React from "react";

interface BlankImagePlaceholderProps {
  onImageUpload: () => void;
  isDragging: boolean;
  dragProps?: Record<string, any>;
  placeholder?: string;
  handleOnFileChange: (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>)=> void
}

export function BlankImagePlaceholder({
  onImageUpload,
  isDragging,
  dragProps,
  placeholder,
  handleOnFileChange
}: BlankImagePlaceholderProps) {
  return (<div className=" grid place-items-center  w-full">
    {/* <div className="md:">

    </div> */}
    <div
      onDrop={handleOnFileChange}
      onClick={onImageUpload}
      {...dragProps}
      className={` active:bg-gray-50 aspect-square mx-auto  min-h-44 min-w-44  w-1/2 lg:w-1/3  h-full  cursor-pointer ${isDragging && "opacity-50"
        }`}>
      <nav className="border-2 rounded-md overflow-hidden flex items-center justify-center h-full w-full  aspect-square  ">
        <nav
          className={`flex flex-col text-gray-700 items-center gap-2 ${isDragging && " pointer-events-none"
            }`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 34 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.0002 0C7.81683 0 0.333496 7.48333 0.333496 16.6667C0.333496 25.85 7.81683 33.3333 17.0002 33.3333C26.1835 33.3333 33.6668 25.85 33.6668 16.6667C33.6668 7.48333 26.1835 0 17.0002 0ZM23.6668 17.9167H18.2502V23.3333C18.2502 24.0167 17.6835 24.5833 17.0002 24.5833C16.3168 24.5833 15.7502 24.0167 15.7502 23.3333V17.9167H10.3335C9.65016 17.9167 9.0835 17.35 9.0835 16.6667C9.0835 15.9833 9.65016 15.4167 10.3335 15.4167H15.7502V10C15.7502 9.31667 16.3168 8.75 17.0002 8.75C17.6835 8.75 18.2502 9.31667 18.2502 10V15.4167H23.6668C24.3502 15.4167 24.9168 15.9833 24.9168 16.6667C24.9168 17.35 24.3502 17.9167 23.6668 17.9167Z"
              fill="currentColor"

            />
          </svg>
          <span className="font-medium  text-center">
            {isDragging ? "Drop files here" : placeholder}
          </span>
        </nav>
      </nav>
    </div>
    {/* <div>

    </div> */}
  </div>
  );
}

