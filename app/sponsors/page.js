"use client";

import React from "react";

import PageHeader from "@/components/PageHeader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Typography, Card } from "@material-tailwind/react";

const PastSponsors = () => {
  return (
    <React.Fragment>
      <Header />
      <PageHeader pageTitle={"Past Sponsors"} />

      <section className="p-4 bg-gray-200">
        <Card className="p-4">
          <Typography className="text-center mb-6" variant="h2">
            Corporate Sponsors
          </Typography>

          <ul className="sm:columns-2 lg:columns-3 px-10 text-lg">
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGes Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGee Sports Bar</li>
          </ul>
        </Card>
        <Card className="p-4">
          <Typography className="text-center mb-6" variant="h2">
            Dinner Sponsors
          </Typography>

          <ul className="sm:columns-2 lg:columns-3 px-10 text-lg">
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
          </ul>
        </Card>
        <Card className="p-4">
          <Typography className="text-center mb-6" variant="h2">
            Lunch Sponsors
          </Typography>

          <ul className="sm:columns-2 lg:columns-3 px-10 text-lg">
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
          </ul>
        </Card>
        <Card className="p-4">
          <Typography className="text-center mb-6" variant="h2">
            Golf Cart Sponsors
          </Typography>

          <ul className="sm:columns-2 lg:columns-3 px-10 text-lg">
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
            <li>Billy Joel</li>
            <li>Borellis Nursery</li>
            <li>Dinosaur BBQ</li>
            <li>McGees Sports Bar</li>
          </ul>
        </Card>
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default PastSponsors;
