"use client";

import React from "react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Header from "@/components/Header";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";

import AddAttendeeForm from "@/components/AddAttendeeForm";
import EditAttendeeForm from "@/components/EditAttendeeForm";

import { test, checkout } from "@/utils/actions";

const Register = () => {
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const handleAddFormOpen = () => setAddFormOpen((prevVal) => !prevVal);

  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [attendeeIDToEdit, setAttendeeIDToEdit] = useState();
  const handleEditFormOpen = () => setEditFormOpen((prevVal) => !prevVal);

  const TABLE_HEAD = [
    "Type",
    "First Name",
    "Last Name",
    "Phone #",
    "Email Address",
    "",
  ];

  const [attendees, setAttendees] = useState([]);

  console.log(attendees);

  const editAttendee = (attendeeID) => {
    console.log(attendeeID);
    setAttendeeIDToEdit(() => attendeeID);
    handleEditFormOpen();
  };

  const removeAttendee = (attendeeID) => {
    setAttendees((prevVal) => {
      return prevVal.filter((attendee) => attendee.ID !== attendeeID);
    });
  };

  return (
    <React.Fragment>
      <Header />

      <PageHeader pageTitle={"Register"} />

      <section className="px-20 py-10 flex flex-col">
        <Button
          variant="outlined"
          color="stm-red"
          size="md"
          onClick={handleAddFormOpen}
          className="ml-auto mb-4"
        >
          Add Attendee
        </Button>

        <Card className="overflow-hidden">
          <table>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-stm-red bg-stm-red text-left p-4"
                  >
                    <Typography
                      variant="p"
                      color="white"
                      className="font-bold text-xl leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendees.length === 0 ? (
                <tr>
                  <td className="p-4" colSpan={5}>
                    No attendees have been added to the list
                  </td>
                </tr>
              ) : (
                <></>
              )}

              {attendees.map(
                (
                  { ID, EventType, FirstName, LastName, PhoneNumber, Email },
                  index
                ) => (
                  <tr key={ID}>
                    <td className="p-4">{EventType}</td>
                    <td className="p-4">{FirstName}</td>
                    <td className="p-4">{LastName}</td>
                    <td className="p-4">{PhoneNumber}</td>
                    <td className="p-4">{Email}</td>
                    <td className="p-4 flex flex-row gap-3 justify-center">
                      <IconButton
                        variant="outlined"
                        color="stm-red"
                        onClick={() => editAttendee(ID)}
                      >
                        <FontAwesomeIcon size="2x" icon={faPencil} />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        color="stm-red"
                        onClick={() => removeAttendee(ID)}
                      >
                        <FontAwesomeIcon size="2x" icon={faXmark} />
                      </IconButton>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <AddAttendeeForm
            isFormOpen={isAddFormOpen}
            formHandler={handleAddFormOpen}
            setAttendees={setAttendees}
          />
          <EditAttendeeForm
            isFormOpen={isEditFormOpen}
            formHandler={handleEditFormOpen}
            setAttendees={setAttendees}
            attendeeID={attendeeIDToEdit}
            attendees={attendees}
          />
        </Card>

        <Button
          variant="outlined"
          color="stm-red"
          size="lg"
          className="m-auto my-4"
          onClick={() => checkout()}
        >
          Register
        </Button>
      </section>
    </React.Fragment>
  );
};

export default Register;
