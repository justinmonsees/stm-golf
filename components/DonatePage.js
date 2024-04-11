"use client";

import React from "react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Header from "@/components/Header";
import Image from "next/image";

import { useForm, Controller } from "react-hook-form";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  Option,
  Input,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSponsors } from "@/utils/actions";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  companyName: z.string(),
  prefix: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  email: z.string().email(),
  address1: z.string().min(1),
  address2: z.string(),
  city: z.string().min(1),
  state: z.string().min(1).max(2),
  zip: z.string().min(1).max(10),
});

const DonatePage = ({ items }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen((prevVal) => !prevVal);

  const prefixes = ["Mr.", "Mrs.", "Ms."];

  const [curPanel, setCurPanel] = useState(0);

  const handleNext = () => setCurPanel(() => 1);

  const handlePrev = () => setCurPanel(() => 0);

  //register sponsorships
  const registerSponsorships = () => {
    const sponsorshipArr = items.map((item) => ({
      sponsorshipItemID: item.item_id,
      quantity: 0,
    }));

    return sponsorshipArr;
  };

  const [sponsorships, setSponsorships] = useState(registerSponsorships);

  const increaseSponsorship = (sponsorshipID) => {
    setSponsorships((prevVal) => [
      ...prevVal.filter((item) => item.sponsorshipItemID !== sponsorshipID),
      {
        sponsorshipItemID: sponsorshipID,
        quantity:
          prevVal.find((item) => item.sponsorshipItemID === sponsorshipID)
            .quantity + 1,
      },
    ]);
  };

  const decreaseSponsorship = (sponsorshipID) => {
    setSponsorships((prevVal) => [
      ...prevVal.filter((item) => item.sponsorshipItemID !== sponsorshipID),
      {
        sponsorshipItemID: sponsorshipID,
        quantity:
          prevVal.find((item) => item.sponsorshipItemID === sponsorshipID)
            .quantity - 1,
      },
    ]);
  };

  const addSponsor = (data) => {
    console.log("add sponsor");
    const donationInfo = {
      sponsor: data,
      donations: sponsorships,
    };

    checkoutSponsors(donationInfo);
  };

  return (
    <React.Fragment>
      <Header />

      <PageHeader pageTitle={"Make a Donation"} />
      <section className="px-5 sm:px-40 py-10 ">
        <form onSubmit={handleSubmit(addSponsor)}>
          <div id="carousel" className="overflow-hidden">
            <div
              id="carousel-panels"
              className=" flex transition-transform ease-out duration-500 "
              style={{ transform: `translateX(-${curPanel * 100}%)` }}
            >
              <Card id="panel1" className="w-full flex-shrink-0 border-2">
                <CardBody>
                  <Typography
                    variant="h2"
                    className="text-stm-red  border-stm-red border-b mb-4"
                  >
                    Select Sponsorship(s)
                  </Typography>
                  <div
                    id="inner-panel1"
                    className="flex flex-wrap gap-4 align-middle items-center justify-center"
                  >
                    {items.map((item) => {
                      return (
                        <Card
                          key={item.item_id}
                          className={`w-full sm:w-[175px] border-stm-red overflow-hidden ${
                            sponsorships.find(
                              (sponsorship) =>
                                sponsorship.sponsorshipItemID === item.item_id
                            ).quantity > 0
                              ? "border-stm-red"
                              : ""
                          }`}
                        >
                          <div className="bg-stm-red h-full w-full text-center content-center">
                            <Typography
                              variant="h6"
                              className="text-white text-sm uppercase p-2"
                            >
                              {item.name}
                            </Typography>
                          </div>
                          <div
                            id="card-body"
                            className="flex flex-row sm:flex-col items-center gap-2 my-2 justify-between px-7 sm:px-0"
                          >
                            <Image
                              src={`/sponsorship/${item.item_image}`}
                              width={75}
                              height={75}
                              className="hidden sm:block"
                            />

                            <Typography
                              variant="paragraph"
                              className="text-3xl  text-stm-red font-bold"
                            >
                              ${item.cost}
                            </Typography>

                            <div className="flex flex-row items-center justify-center gap-3 w-auto sm:w-full p-0">
                              <IconButton
                                variant="outlined"
                                color="stm-red"
                                size="sm"
                                onClick={() =>
                                  decreaseSponsorship(item.item_id)
                                }
                                disabled={
                                  sponsorships.find(
                                    (sponsorship) =>
                                      sponsorship.sponsorshipItemID ===
                                      item.item_id
                                  ).quantity === 0
                                }
                                className="h-5 w-5 rounded-sm"
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </IconButton>
                              <div className="text-center text-black font-bold text-xl">
                                {
                                  sponsorships.find(
                                    (sponsorship) =>
                                      sponsorship.sponsorshipItemID ===
                                      item.item_id
                                  ).quantity
                                }
                              </div>
                              <IconButton
                                variant="outlined"
                                color="stm-red"
                                size="sm"
                                onClick={() =>
                                  increaseSponsorship(item.item_id)
                                }
                                className="h-5 w-5 rounded-sm"
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </IconButton>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
              <Card id="panel2" className="w-full flex-shrink-0 border-2">
                <CardBody>
                  <Typography
                    variant="h2"
                    className="text-stm-red border-stm-red border-b mb-4"
                  >
                    Sponsor Information
                  </Typography>

                  <div className="my-4">
                    <Input
                      label={`Company Name`}
                      color="stm-red"
                      {...register(`companyName`)}
                    />

                    <div className="text-xs text-red-500">
                      {errors.companyName && errors.companyName.message}
                    </div>
                  </div>

                  <div className="my-4 grid xs:grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <Controller
                      control={control}
                      name={"prefix"}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Prefix"
                          color="stm-red"
                          className="mb-3"
                        >
                          {prefixes.map((prefix, index) => (
                            <Option key={`${index}`} value={prefix}>
                              {prefix}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    <div>
                      <Input
                        label={`First Name`}
                        color="stm-red"
                        {...register(`firstName`)}
                      />
                      <div className="text-xs text-red-500">
                        {errors.firstName && errors.firstName.message}
                      </div>
                    </div>
                    <div>
                      <Input
                        label={`Last Name`}
                        color="stm-red"
                        {...register(`lastName`)}
                      />
                      <div className="text-xs text-red-500">
                        {errors.lastName && errors.lastName.message}
                      </div>
                    </div>
                  </div>

                  <div className="my-4 grid xs:grid-cols-1 md:grid-cols-2 items-center gap-4">
                    <div>
                      <Input
                        label={`Phone Number`}
                        color="stm-red"
                        {...register(`phoneNumber`)}
                      />
                      <div className="text-xs text-red-500"></div>
                    </div>
                    <div>
                      <Input
                        label={`Email`}
                        color="stm-red"
                        {...register(`email`)}
                      />
                      <div className="text-xs text-red-500"></div>
                    </div>
                  </div>

                  <div className="my-4">
                    <Input
                      label={`Address 1`}
                      color="stm-red"
                      {...register(`address1`)}
                    />
                    <div className="text-xs text-red-500"></div>
                  </div>

                  <div className="my-4">
                    <Input
                      label={`Address 2`}
                      color="stm-red"
                      {...register(`address2`)}
                    />
                    <div className="text-xs text-red-500"></div>
                  </div>

                  <div className="my-4 grid xs:grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <div>
                      <Input
                        label={`City`}
                        color="stm-red"
                        {...register(`city`)}
                      />
                      <div className="text-xs text-red-500"></div>
                    </div>
                    <div>
                      <Input
                        label={`State`}
                        color="stm-red"
                        {...register(`state`)}
                      />
                      <div className="text-xs text-red-500"></div>
                    </div>
                    <div>
                      <Input
                        label={`Zip`}
                        color="stm-red"
                        {...register(`zip`)}
                      />
                      <div className="text-xs text-red-500"></div>
                    </div>
                  </div>
                  <Button
                    color="stm-red"
                    variant="outlined"
                    size="lg"
                    onClick={handleDialogOpen}
                  >
                    Checkout
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>

          {/*This is for the Dialog Box Segment*/}
          <Dialog open={isDialogOpen} handler={handleDialogOpen}>
            <DialogHeader className="justify-center border-b border-stm-red">
              <Typography variant="h2" className="text-center text-stm-red">
                Donation Confirmation
              </Typography>
            </DialogHeader>
            <DialogBody className="text-black text-center text-2xl font-normal m-3 flex flex-col items-center">
              <table className="text-left text-2xl border-separate border-spacing-4">
                {sponsorships.map((sponsorship) => {
                  return sponsorship.quantity > 0 ? (
                    <tr>
                      <td>
                        {
                          items.find(
                            (item) =>
                              item.item_id === sponsorship.sponsorshipItemID
                          ).name
                        }
                      </td>
                      <td>x{sponsorship.quantity}</td>
                      <td>
                        $
                        {
                          items.find(
                            (item) =>
                              item.item_id === sponsorship.sponsorshipItemID
                          ).cost
                        }
                      </td>
                      <td>
                        $
                        {sponsorship.quantity *
                          items.find(
                            (item) =>
                              item.item_id === sponsorship.sponsorshipItemID
                          ).cost}
                      </td>
                    </tr>
                  ) : (
                    ""
                  );
                })}
                <tr>
                  <td colSpan="3" className="text-right">
                    Total
                  </td>
                  <td>
                    $
                    {sponsorships.reduce(
                      (acc, sponsorship) =>
                        acc +
                        sponsorship.quantity *
                          items.find(
                            (item) =>
                              item.item_id === sponsorship.sponsorshipItemID
                          ).cost,
                      0
                    )}
                  </td>
                </tr>
                <td colSpan="3"></td>
                <td className="text-md">**Plus credit card fee</td>
              </table>
              <Typography variant="paragraph" className="text-left text-2xl">
                You will now be redirected to our payment provider to complete
                your registration.
                <br />
                <br />
                Please click the confirm button to proceed.
              </Typography>
            </DialogBody>
            <DialogFooter className="gap-4">
              <Button variant="outlined" color="red" onClick={handleDialogOpen}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="green"
                onClick={handleSubmit(addSponsor)}
              >
                Confirm
              </Button>
            </DialogFooter>
          </Dialog>
          <div id="carousel-nav" className="flex w-full mt-4">
            <Button
              color="stm-red"
              variant="outlined"
              size="lg"
              onClick={handlePrev}
              className={curPanel === 0 ? "hidden" : ""}
            >
              Prev
            </Button>
            <Button
              color="stm-red"
              variant="outlined"
              size="lg"
              onClick={handleNext}
              disabled={sponsorships.every((item) => item.quantity === 0)}
              className={`${curPanel === 1 ? "hidden" : ""} ml-auto`}
            >
              Next
            </Button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default DonatePage;
