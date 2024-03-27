import React, { useCallback, useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import PlayButton from "@/components/PlayButton";
import useInfoModalStore from "@/hooks/useInfoStore";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(visible ? true : false);

  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);
  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              poster={data?.thumbnailUrl}
              autoPlay
              muted
              loop
              src={data?.videoUrl}
              className="w-full brightness-[60%] object-cover h-full"
            />

            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row gap-8 justify-between w-full h-full">
              <div className="flex flex-col w-[70%] h-full">
                <div className="flex flex-row items-center gap-3">
                  <p className="text-green-400 font-semibold text-lg">
                    67% Match
                  </p>
                  <p className="text-gray-300 text-lg">{data?.year}</p>
                  <p className="text-gray-300 text-lg">{data?.duration}</p>
                </div>
                <p className="text-white text-lg w-auto mb-7">{data?.rating}</p>

                <p className="text-white text-base">{data?.description}</p>
              </div>
              <div className="w-[30%] h-full flex flex-col gap-3 justify-start items-start">
                <div className="text-white  text-base">
                  <span className="text-gray-200 font-bold">Cast: </span>
                  {data?.cast}
                </div>
                <div className="text-white  text-base">
                  <span className="text-gray-200 font-bold">Genre: </span>
                  {data?.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
