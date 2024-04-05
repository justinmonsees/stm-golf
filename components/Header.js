"use client";

import React, { useState, useEffect } from "react";
import SiteLogo from "./SiteLogo";
import {
  Tabs,
  Tab,
  TabsHeader,
  Navbar,
  Drawer,
  Button,
  Typography,
  IconButton,
  ListItem,
  List,
} from "@material-tailwind/react";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

const Header = () => {
  const links = [
    {
      title: "Home",
      location: "/",
    },
    {
      title: "Sponsors",
      location: "/sponsors",
    },
  ];

  const [navColor, setNavColor] = useState(false);

  const pathName = usePathname();
  const currLink = links.find((link) => link.location === pathName);

  const currentTab = currLink ? currLink.title : "";

  const changeNavBG = () => {
    if (window.scrollY > 50) setNavColor(true);
    else setNavColor(false);
  };

  if (typeof window != "undefined") {
    window.addEventListener("scroll", changeNavBG);
  }

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <Navbar
        fullWidth={true}
        className={`${
          navColor ? "bg-white" : "bg-transparent"
        }  top-0 fixed border-none z-[100] flex rounded-none p-5`}
      >
        <Link href="\">
          <SiteLogo fill={`${navColor ? "dark" : "light"}`} />
        </Link>

        <nav className="hidden sm:flex sm:ml-auto">
          <Tabs value={currentTab}>
            <TabsHeader
              className="bg-opacity-0 "
              indicatorProps={{
                className: `bg-transparent ${
                  navColor
                    ? "border-stm-red hover:border-stm-red"
                    : "border-white hover-border-white"
                } border-b-2 shadow-none rounded-none`,
              }}
            >
              {links.map((link, index) => (
                <Link key={index} href={link.location}>
                  <Tab
                    value={link.title}
                    className={`${
                      navColor
                        ? "text-stm-red hover:text-black"
                        : "text-white hover:text-white"
                    }  uppercase font-bold`}
                  >
                    {link.title}
                  </Tab>
                </Link>
              ))}
            </TabsHeader>
          </Tabs>
          <Button
            variant="outlined"
            color={`${navColor ? "stm-red" : "white"}`}
            className="uppercase font-bold text-base p-2"
          >
            <Link href={"/register"}>Register</Link>
          </Button>
        </nav>

        <FontAwesomeIcon
          className={`${navColor ? "text-stm-red" : "text-white"}
         h-10 w-10 sm:hidden ml-auto`}
          icon={faBars}
          onClick={openDrawer}
        />
      </Navbar>
      <Drawer
        open={open}
        onClose={closeDrawer}
        overlay={true}
        placement="top"
        size={400}
        className="p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            STM Golf Outing
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="flex flex-col items-center text-2xl">
          <List>
            {links.map((link, index) => (
              <ListItem
                key={index}
                ripple={false}
                className="justify-center text-xl font-bold"
              >
                <Link href={link.location}>{link.title}</Link>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="flex flex-col gap-2">
          <Button size="lg" variant="outlined">
            <Link href="/register">Register Now</Link>
          </Button>
          <Button size="lg">
            <Link href="/donate">Make a Donation</Link>
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
