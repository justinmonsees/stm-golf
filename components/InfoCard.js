"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({ infoIcon, infoText }) => {
  return (
    <div className="bg-stm-red flex lg:flex-col xs:flex-row items-center gap-4 p-2 lg:p-3 rounded-lg min-h-20">
      <FontAwesomeIcon
        className="text-white h-8 w-8 sm:h-10 sm:w-10"
        icon={infoIcon}
      />
      <Typography
        variant="paragraph"
        className="text-white text-left text-sm lg:text-base whitespace-pre-line"
      >
        {infoText}
      </Typography>
    </div>
  );
};

export default InfoCard;
