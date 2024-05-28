"use client";

import { useState, useRef } from "react";

interface ModalVideoProps {
  thumb: string;
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  video: string;
  videoWidth: number;
  videoHeight: number;
}

export default function ModalVideo({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}: ModalVideoProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      {/* Миниатюра видео */}
      <div>
        <div
          className="relative flex justify-center mb-8"
          data-aos="zoom-y-out"
          data-aos-delay="450"
        >
          <div className="flex flex-col justify-center">
            <img
              src={thumb}
              width={thumbWidth}
              height={thumbHeight}
              alt={thumbAlt}
              style={{ cursor: "pointer" }}
              onClick={() => setModalOpen(true)}
            />
            <svg
              className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
              width="768"
              height="432"
              viewBox="0 0 768 432"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="hero-ill-a"
                >
                  <stop stopColor="#FFF" offset="0%" />
                  <stop stopColor="#EAEAEA" offset="77.402%" />
                  <stop stopColor="#DFDFDF" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="99.24%"
                  id="hero-ill-b"
                >
                  <stop stopColor="#FFF" offset="0%" />
                  <stop stopColor="#EAEAEA" offset="48.57%" />
                  <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <circle
                  fillOpacity=".04"
                  fill="url(#hero-ill-a)"
                  cx="384"
                  cy="216"
                  r="128"
                />
                <circle
                  fillOpacity=".16"
                  fill="url(#hero-ill-b)"
                  cx="384"
                  cy="216"
                  r="96"
                />
                <g fillRule="nonzero">
                  <use fill="#000" xlinkHref="#hero-ill-d" />
                  <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                </g>
              </g>
            </svg>
          </div>
          <button
            className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <svg
              className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
              <path d="M10 17l6-5-6-5z" />
            </svg>
            <span className="ml-3">Instructions</span>
          </button>
        </div>
      </div>
      {/* Конец: Миниатюра видео */}

      {modalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-75 transition-opacity">
          {/* Модальное окно */}
          <div
            className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
            onClick={() => setModalOpen(false)}
          >
            <div className="max-w-6xl mx-auto h-full flex items-center">
              <div className="w-full max-h-full aspect-video bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  width={videoWidth}
                  height={videoHeight}
                  loop
                  controls
                  onClick={(e) => e.stopPropagation()}
                >
                  <source src={video} type="video/mp4" />
                  Ваш браузер не поддерживает тег видео.
                </video>
              </div>
            </div>
          </div>
          {/* Конец: Модальное окно */}
        </div>
      )}
    </div>
  );
}
