import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useViewSeriesStore from "@/hooks/useViewSeriesStore";
import SeriesCard from "./SeriesCard";
import { ViewModalProps } from "@/types";

const SeriesViewModal = ({ visible, onClose }: ViewModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(visible ? true : false);
  const { data, title } = useViewSeriesStore();

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
    <div className="z-[60000] transition duration-300 w-auto h-auto bg-black bg-opacity-80 flex justify-center items-start pt-[50px] overflow-x-hidden overflow-y-auto fixed inset-0 rounded-xl">
      <div className="relative w-[1400px] h-[95vh] rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md px-3 lg:px-10`}
        >
          <div className="relative h-auto">
            <div className="sticky top-0 bg-zinc-900 z-50">
              <div
                onClick={handleClose}
                className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full flex items-center justify-center"
              >
                <XMarkIcon className="text-white w-6" />
              </div>
              <div className="h-[120px] flex justify-center items-center text-white text-xl lg:text-4xl">
                {title}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-auto h-auto px-3 lg:px-10 pb-[100px] overflow-y-auto max-h-[calc(100vh-250px)]">
              {data?.map((series) => (
                <SeriesCard key={series.id} data={series} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesViewModal;