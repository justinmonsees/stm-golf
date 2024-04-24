"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import { Typography } from "@material-tailwind/react";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="h-screen flex flex-col">
      <PageHeader pageTitle={"Thank You"} />
      <Typography
        variant="h3"
        className="text-center my-auto mx-30 font-normal"
      >
        Thank you for registering for the St. Thomas More Annual Golf Outing.
        <br />
        <br />
        We look forward to seeing you at the event!
      </Typography>

      <Footer />
    </div>
  );
};

export default page;
