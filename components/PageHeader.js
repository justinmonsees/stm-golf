"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import headerImg from "@/assets/golf_course_aerial.png";

const PageHeader = ({ pageTitle }) => {
  return (
    <div
      className="min-h-[300px] w-full bg-cover bg-no-repeat bg-center bg-blend-overlay bg-black/50 flex text-center flex-col justify-center"
      style={{
        backgroundImage: `url(${headerImg.src})`,
      }}
    >
      <Typography variant="h1" className="text-white uppercase">
        {pageTitle}
      </Typography>
    </div>
  );
};

export default PageHeader;
