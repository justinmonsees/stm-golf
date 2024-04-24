"use client";

import React from "react";

import PageHeader from "@/components/PageHeader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Typography, Card } from "@material-tailwind/react";

const PastSponsors = () => {
  return (
    <div className=" flex flex-col h-screen">
      <Header />
      <PageHeader pageTitle={"Past Sponsors"} />

      <section className="p-4 bg-gray-200 h-full">
        <Card className="p-4 my-auto mx-10 h-full justify-center ">
          <Typography className="text-center mb-6" variant="h2">
            Coming Soon
          </Typography>
        </Card>

        {/* <Card className="p-4">
          <Typography className="text-center mb-6" variant="h2">
            Corporate Sponsors
          </Typography>

          <ul className="sm:columns-2 lg:columns-3 px-10 text-lg">
            <li>Corporate Sponsor 1</li>

          </ul>
        </Card>
        */}
      </section>

      <Footer />
    </div>
  );
};

export default PastSponsors;
