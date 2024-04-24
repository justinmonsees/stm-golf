import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const AttendeeEmail = (ccPaymentLink) => (
  <Html>
    <Head />
    <Preview>
      A fine-grained personal access token has been added to your account
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* <Img
            src={`${baseUrl}/static/github.png`}
            width="32"
            height="32"
            alt="Github"
          /> */}

        <Text style={title}>
          Your invoice to the St. Thomas More Golf Outing has been generated!
        </Text>

        <Section style={section}>
          <Text style={text}>
            Thank you registering your information for the Annual St. Thomas
            More Golf Outing. Please send your check along with a copy of the
            attached invoice as soon as possible so we can complete your
            registration.
          </Text>
          <Text style={text}>
            Please note that we can only guarantee that we can hold your spot
            for 2 weeks. If your check has not been received by then, another
            registrant may take your spot.
          </Text>

          <Text style={text}>
            If you decide that you would like to pay by credit card instead,
            please use the link below.
          </Text>
          <Button href={ccPaymentLink} style={button}>
            Pay By Credit Card
          </Button>
        </Section>

        <Text style={footer}>
          St. Thomas More ・115 Kings Highway ・Haupauge, NY 11788
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AttendeeEmail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center",
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left",
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center",
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "60px",
};
