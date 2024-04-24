"use server";

import { Resend } from "resend";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { promises as fs } from "fs";
import AttendeeEmail from "@/components/email/AttendeeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(emailTo, attendees, ccPmtLink) {
  const emailFrom = process.env.SEND_FROM_EMAIL;
  const myPdf = await createInvoice(attendees);

  const buffer = new Buffer.from(myPdf);

  console.log(buffer);

  try {
    const data = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: "STM Golf Outing Registration",
      react: AttendeeEmail(ccPmtLink),
      attachments: [
        {
          filename: "STM_GolfOuting_Invoice.pdf",
          content: buffer,
        },
      ],
    });
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
}

// TESTING REACT PDF RENDER TO SEND WITH EMAIL
async function createInvoice(attendees) {
  const formTemplate = await fs.readFile(
    process.cwd() + "/assets/STM_GolfOuting_InvoiceForm.pdf"
  );
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(formTemplate);
  const form = pdfDoc.getForm();

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  attendees.forEach((attendee, index) => {
    form
      .getTextField(`NameRow${index + 1}`)
      .setText(`${attendee.FirstName} ${attendee.LastName}`);
    form.getTextField(`TypeRow${index + 1}`).setText(`${attendee.EventType}`);
    form.getTextField(`AmountRow${index + 1}`).setText(`$${attendee.Cost}`);
  });

  form
    .getTextField("TOTAL")
    .setText(`$${attendees.reduce((acc, attendee) => acc + attendee.Cost, 0)}`);

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
