import React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Card,
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

const EditAttendeeForm = ({
  isFormOpen,
  formHandler,
  setAttendees,
  attendeeID,
  attendees,
}) => {
  const attendeeIndex = attendees.findIndex(
    (attendee) => attendee.ID === attendeeID
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  setValue(
    "attendeeType",
    attendeeIndex !== -1 ? attendees[attendeeIndex].EventType : ""
  );
  setValue(
    "firstName",
    attendeeIndex !== -1 ? attendees[attendeeIndex].FirstName : ""
  );
  setValue(
    "lastName",
    attendeeIndex !== -1 ? attendees[attendeeIndex].LastName : ""
  );
  setValue(
    "phoneNumber",
    attendeeIndex !== -1 ? attendees[attendeeIndex].PhoneNumber : ""
  );
  setValue("email", attendeeIndex !== -1 ? attendees[attendeeIndex].Email : "");

  const editAttendee = (data) => {
    console.log(data);

    const editedAttendee = {
      ID: attendeeID,
      EventType: data.attendeeType,
      FirstName: data.firstName,
      LastName: data.lastName,
      PhoneNumber: data.phoneNumber,
      Email: data.email,
    };

    setAttendees((curAttendees) =>
      curAttendees.map((origAttendee, index) => {
        if (index === attendeeIndex) {
          return editedAttendee;
        } else {
          return origAttendee;
        }
      })
    );
  };

  const onSubmit = (data) => {
    reset();
    editAttendee(data);
    console.log("Data", data);
    formHandler();
  };

  const handleCloseForm = () => {
    reset();
    formHandler();
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
          <Typography variant="h2">Edit Attendee</Typography>
          <FontAwesomeIcon
            className="h-10 w-10 ml-auto text-stm-red"
            icon={faXmark}
            onClick={handleCloseForm}
          />
        </DialogHeader>

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
                <Option value="Golfer">Golfer</Option>
                <Option value="Dinner">Dinner Only</Option>
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

        <CardFooter className="flex justify-end">
          <Button
            variant="outlined"
            color="stm-red"
            className="disabled"
            type="submit"
          >
            Save
          </Button>
        </CardFooter>
      </form>
    </Dialog>
  );
};

export default EditAttendeeForm;
