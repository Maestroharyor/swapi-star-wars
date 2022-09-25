import React from "react";
import { Skeleton } from "antd";
import { FaCircleNotch } from "react-icons/fa";

type Props = {};

const CharacterLoadingSkeleton = (props: Props) => {
  return (
    <div className="flex flex-col gap-10 py-10 items-center justify-center">
      <div className=" rounded-full w-[50px] h-[50px] bg-yellow-500 flex items-center justify-center  text-3xl transition duration-300 ease-in-out  animate-bounce">
        <FaCircleNotch className="animate-spin" />
      </div>
      <Skeleton active />
      <Skeleton active />
    </div>
  );
};

export default CharacterLoadingSkeleton;
