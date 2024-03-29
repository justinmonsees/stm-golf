"use client";

import React from "react";
import heroImg from "@/assets/hero-bg.jpg";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const HeroSection = ({ initItemInfo, initEventInfo }) => {
  const itemInfo = initItemInfo;
  const eventInfo = initEventInfo;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center bg-blend-overlay bg-black/50 flex text-center flex-col"
      style={{
        backgroundImage: `url(${heroImg.src})`,
      }}
    >
      <div className="mt-auto">
        <div className="text-white relative mt-7">
          <p className="font-lobster text-2xl sm:text-3xl">18th Annual</p>
          <p className="font-noto sm:text-4xl font-light sm:leading-10 text-xl leading-tight">
            St. Thomas More <br /> Francis S. Midura <br />
            Golf Outing
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2 px-10">
          <Button
            variant="outlined"
            color="white"
            className="text-white border-white"
          >
            Register Now
          </Button>
          <Button
            variant="outlined"
            color="white"
            className="text-white border-white"
          >
            Become a Sponsor
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 w-full mt-auto gap-y-3 gap-x-3 p-3">
        <InfoCard
          infoIcon={faCalendarDays}
          infoText={new Date(eventInfo.event_date).toLocaleDateString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        ></InfoCard>

        <InfoCard
          infoIcon={faClock}
          infoText={`Registration: ${eventInfo.arrival_time}\nShotgun Start: ${eventInfo.start_time}`}
        ></InfoCard>

        <InfoCard
          infoIcon={faDollarSign}
          infoText={itemInfo
            .map((item) => `$${item.cost} Per ${item.name}`)
            .join(`\n`)}
        ></InfoCard>

        <InfoCard
          infoIcon={faLocationDot}
          infoText={`${eventInfo.venue_name}\n${eventInfo.venue_address}${
            eventInfo.venue_address2 ? eventInfo.venue_address2 : ""
          }\n${eventInfo.venue_city}, ${eventInfo.venue_state} ${
            eventInfo.venue_zip
          }`}
        ></InfoCard>
      </div>
    </div>
  );
};

export default HeroSection;
