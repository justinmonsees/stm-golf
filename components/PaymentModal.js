import React from "react";
import { useState } from "react";

import {
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutAttendees } from "@/utils/actions";

const schema = z.object({
  email: z.string().email(),
});

const PaymentModal = ({ isDialogOpen, handleDialogOpen, attendees }) => {
  const [type, setType] = React.useState("card");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleCardPmt = () => {
    setIsLoading(() => true);

    checkoutAttendees(attendees, type);
  };

  const handleCheckPmt = (data) => {
    setIsLoading(() => true);

    checkoutAttendees(attendees, type, data.email);
  };

  return (
    <Dialog open={isDialogOpen} handler={handleDialogOpen} size="sm">
      <DialogHeader>
        <Typography
          variant="h2"
          className="text-stm-red border-b border-stm-red"
        >
          Payment Options
        </Typography>
        <FontAwesomeIcon
          className=" h-10 w-10 ml-auto text-stm-red"
          icon={faXmark}
          onClick={handleDialogOpen}
        />
      </DialogHeader>
      <div className="h-full">
        <Tabs value={type} className="h-full">
          <TabsHeader className="relative z-0 ">
            <Tab value="card" onClick={() => setType("card")}>
              Pay with Card
            </Tab>
            <Tab value="check" onClick={() => setType("check")}>
              Pay by Check
            </Tab>
          </TabsHeader>
          <TabsBody
            className="h-[300px]"
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="card" className="h-full flex flex-col p-8">
              <Typography className="mt-5 text-center text-xl">
                By clicking the confirm button you will now be redirected to our
                payment provider to complete your registration.
              </Typography>

              <Button
                size="lg"
                className="mt-auto bg-stm-red justify-center"
                onClick={handleCardPmt}
                loading={isLoading}
              >
                Confirm
              </Button>
            </TabPanel>
            <TabPanel value="check" className="h-full p-8">
              <form
                onSubmit={handleSubmit(handleCheckPmt)}
                className="h-full flex flex-col"
              >
                <div className="mt-5">
                  <Input
                    label={`Email Address`}
                    color="stm-red"
                    variant="outlined"
                    className=" "
                    {...register(`email`)}
                  />
                  <div className="text-xs text-red-500">
                    {errors.email && errors.email.message}
                  </div>
                </div>

                <Typography variant="lg" color="gray" className="mt-3 font-lg">
                  An invoice will be emailed to you. Please mail the invoice to
                  the address listed along with the check.
                </Typography>

                <Button
                  className="mt-auto bg-stm-red justify-center"
                  size="lg"
                  type="submit"
                  loading={isLoading}
                >
                  Send Invoice
                </Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
