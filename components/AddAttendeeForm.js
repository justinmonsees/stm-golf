import React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Tabs,
  TabsBody,
  TabPanel,
  TabsHeader,
  Tab,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  attendeeType: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  email: z.string().email(),
});

const AddAttendeeForm = ({ isFormOpen, formHandler, setAttendees, items }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      attendeeType: items.find((item) => item.name === "Golfer").item_id,
    },
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [numAttendees, setNumAttendees] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 525);
  }, [isFormVisible]);

  const addAttendee = (data) => {
    const attendeeType = items.find(
      (item) => item.item_id === data.attendeeType
    ).name;
    const attendeeCost = items.find(
      (item) => item.item_id === data.attendeeType
    ).cost;

    console.log("ATTENDEE COST: ", attendeeCost);

    setAttendees((curAttendees) => [
      ...curAttendees,
      {
        ID: uuidv4(),
        EventType: attendeeType,
        FirstName: data.firstName,
        LastName: data.lastName,
        PhoneNumber: data.phoneNumber,
        Email: data.email,
        Cost: attendeeCost,
      },
    ]);
  };

  const onSubmit = (data) => {
    reset();
    addAttendee(data);
    formHandler();
  };

  const handleAddAttendee = (data) => {
    addAttendee(data);
    reset();
    setIsFormVisible(() => false);
    setNumAttendees((prevVal) => prevVal + 1);
  };

  const handleCloseForm = () => {
    reset();
    formHandler();
  };

  const variants = {
    enter: {
      x: 500,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: -500,
      opacity: 0,
    },
  };

  return (
    <Dialog
      open={isFormOpen}
      handler={formHandler}
      size="sm"
      className="overflow-hidden"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader className="p-6">
          <Typography variant="h2">Add Attendee #{numAttendees}</Typography>
          <FontAwesomeIcon
            className="h-10 w-10 ml-auto text-stm-red"
            icon={faXmark}
            onClick={handleCloseForm}
          />
        </DialogHeader>
        <AnimatePresence initial={false}>
          {isFormVisible && (
            <motion.div
              key={numAttendees}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  duration: 0.5,
                },
                opacity: { duration: 0.5 },
              }}
            >
              <Card className="h-full gap-4 p-4 ">
                <Controller
                  control={control}
                  name={"attendeeType"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Attendee Type"
                      color="stm-red"
                      className="mb-2"
                    >
                      {items.map((item) => (
                        <Option key={`${item.item_id}`} value={item.item_id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                <div className="text-xs text-red-500"></div>

                <Input
                  label={`First Name`}
                  color="stm-red"
                  {...register(`firstName`, { required: true })}
                />
                <div className="text-xs text-red-500">
                  {errors.firstName && errors.firstName.message}
                </div>
                <Input
                  label={`Last Name`}
                  color="stm-red"
                  {...register(`lastName`)}
                />
                <div className="text-xs text-red-500">
                  {errors.lastName && errors.lastName.message}
                </div>
                <Input
                  label={`Phone Number`}
                  color="stm-red"
                  {...register(`phoneNumber`)}
                />
                <div className="text-xs text-red-500">
                  {errors.phoneNumber && errors.phoneNumber.message}
                </div>
                <Input
                  label={`Email Address`}
                  color="stm-red"
                  {...register(`email`)}
                />
                <div className="text-xs text-red-500">
                  {errors.email && errors.email.message}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        <CardFooter className="flex justify-between">
          <Button
            variant="outlined"
            color="stm-red"
            onClick={handleSubmit(handleAddAttendee)}
          >
            Add Attendee
          </Button>
          <Button variant="outlined" color="stm-red" type="submit">
            Save
          </Button>
        </CardFooter>
      </form>
    </Dialog>
  );
};

export default AddAttendeeForm;
