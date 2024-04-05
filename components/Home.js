"use client";

import { useState } from "react";
import Image from "next/image";
import React from "react";
import HeroSection from "@/components/HeroSection";
import fairwayImg from "@/assets/golf_fairway.png";
import golferImg from "@/assets/golfer_sandtrap.png";
import { Button } from "@material-tailwind/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home({ initItems, initEventInfo }) {
  const [eventInfo, setEventInfo] = useState(initEventInfo);
  const [itemInfo, setItemInfo] = useState(initItems);

  return (
    <React.Fragment>
      <Header />
      <HeroSection initItemInfo={initItems} initEventInfo={initEventInfo} />

      <section className="grid gid-cols-1 sm:grid-cols-2">
        <div className="bg-white text-black m-auto grid p-4">
          <h2 className="uppercase text-5xl font-bold pb-5">Event Details</h2>

          <p>
            Join us for a fun day on the golf course! <br />
            Golf registration includes:
          </p>

          <ul className="list-disc list-inside my-4">
            <li>Light breakfast at registration</li>
            <li>18 holes of golf</li>
            <li>Lunch on the golf course</li>
            <li>Open bar</li>
            <li>Buffet dinner/dessert</li>
            <li>Golf raffles/prizes</li>
            <li>Golf outing giveaway</li>
          </ul>

          <Button
            variant="outlined"
            color="black"
            className="justify-self-center"
          >
            Register Now
          </Button>
        </div>

        <Image
          className="hidden sm:block h-full w-full object-cover"
          src={golferImg.src}
          width={300}
          height={300}
          alt="golfer in sandtrap"
        ></Image>
      </section>

      <section
        style={{
          backgroundImage: `url(${fairwayImg.src})`,
          alt: "golf course fairway",
        }}
        className=" bg-no-repeat bg-center bg-cover bg-blend-overlay bg-white/85 flex flex-col items-center justify-center p-4"
      >
        <h2 className="uppercase text-5xl font-bold pb-5">Sponsors</h2>
        <p className="md:w-[50%] text-center pb-5">
          Thank you to all of our sponsors! <br /> Check out our past sponsors
          who have made this event a great success and please consider making a
          donation and sponsoring this year’s golf outing!{" "}
        </p>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto px-5 gap-4">
          <Button
            variant="outlined"
            color="black"
            className="justify-self-center"
          >
            Past Sponsors
          </Button>
          <Button
            variant="outlined"
            color="black"
            className="justify-self-center"
          >
            Become a Sponsor
          </Button>
        </div>
      </section>

      <section className="flex flex-col w-full bg-stm-red p-4 items-center justify-center">
        <h2 className="text-4xl text-white pb-5 text-center">
          Interested in helping on the golf commitee?
        </h2>
        <p className="md:w-[60%] text-white text-center px-10">
          This event is planned and coordinated by volunteers. We are always
          looking for new members to help with fundraising, planning, and
          facilitating on the day of the outing.
        </p>
      </section>

      <Footer />
    </React.Fragment>
  );
}
