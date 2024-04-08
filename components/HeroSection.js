"use client";

import React from "react";
import heroImg from "@/assets/hero-bg.png";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import Link from "next/link";
import Image from "next/image";
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
    <section className="h-full relative">
      <Image
        src={heroImg}
        alt="image of golf course"
        id="hero-img"
        sizes="100vw"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "-1",
        }}
      />
      <div className="sm:min-h-screen w-full bg-blend-overlay bg-black/50 flex text-center flex-col">
        <div className="mt-[90px] sm:mt-auto mb-[90px] sm:mb-0">
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
              <Link href={"register"}>Register Now</Link>
            </Button>
            <Button
              variant="outlined"
              color="white"
              className="text-white border-white"
            >
              <Link href={"donate"}>Become a Sponsor</Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 w-full mt-auto gap-y-3 gap-x-3 p-3">
          <InfoCard
            infoIcon={faCalendarDays}
            infoText={new Date(eventInfo.event_date).toLocaleDateString(
              "en-us",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
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
    </section>
  );
};

export default HeroSection;
