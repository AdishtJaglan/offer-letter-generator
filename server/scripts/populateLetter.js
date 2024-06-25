import { PDFDocument, StandardFonts, setFontAndSize } from "pdf-lib";
import fs from "fs/promises";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export async function populatePDF(input, output, data) {
  try {
    const existingPdfBytes = await fs.readFile(input);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 11;
    const largerFontSize = 12;

    const internName = form.getTextField("internName");
    const inviteToDomain = form.getTextField("inviteToDomain");
    const domainName = form.getTextField("domainName");
    const durationOfInternship = form.getTextField("durationOfInternship");
    const currentDate = form.getTextField("currentDate");
    const refNo = form.getTextField("refNo");

    const longMessage = `We are pleased to offer you the position of "${data.domainName}" at Suvidha Foundation (Suvidha Mahila Mandal) with the following terms and conditions:`;
    const formattedDateOfJoining = formatDate(data.dateOfJoining);
    const formattedDateOfCompletion = formatDate(data.dateOfCompletion);

    internName.setText(data.internName);
    inviteToDomain.setText(longMessage);
    domainName.setText(data.domainName);
    durationOfInternship.setText(
      `${formattedDateOfJoining} to ${formattedDateOfCompletion}`
    );
    currentDate.setText(formatDate(data.currentDate));
    refNo.setText(data.refNo);

    const fields = [
      { field: internName, size: fontSize },
      { field: inviteToDomain, size: largerFontSize },
      { field: domainName, size: fontSize },
      { field: durationOfInternship, size: fontSize },
      { field: currentDate, size: fontSize },
      { field: refNo, size: fontSize },
    ];

    fields.forEach(({ field, size }) => {
      const da = field.acroField.getDefaultAppearance() ?? "";
      const newDa = da + "\n" + setFontAndSize("Courier", size).toString();
      field.acroField.setDefaultAppearance(newDa);
    });

    internName.defaultUpdateAppearances(boldFont);
    currentDate.defaultUpdateAppearances(boldFont);
    refNo.defaultUpdateAppearances(boldFont);

    inviteToDomain.enableMultiline();

    form.flatten();
    const pdfBytes = await pdfDoc.save();

    await fs.writeFile(output, pdfBytes);
    console.log("PDF created successfully.");
  } catch (err) {
    console.error("Error creating PDF:", err);
  }
}
