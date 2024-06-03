import { PDFDocument, StandardFonts, setFontAndSize } from "pdf-lib";
import fs from "fs/promises";

async function populatePDF(input, output, data) {
  try {
    const existingPdfBytes = await fs.readFile(input);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 11;
    const largerFontSize = 12;

    const interName = form.getTextField("internName");
    const inviteToDomain = form.getTextField("inviteToDomain");
    const domainName = form.getTextField("domainName");
    const durationOfInternship = form.getTextField("durationOfInternship");
    const currentDate = form.getTextField("currentDate");
    const refNo = form.getTextField("refNo");

    const longMessage = `We are pleased to offer you the position of "${data.domainName}" at Suvidha Foundation (Suvidha Mahila Mandal) with the following terms and conditions:`;

    interName.setText(data.interName);
    inviteToDomain.setText(longMessage);
    domainName.setText(data.domainName);
    durationOfInternship.setText(data.durationOfInternship);
    currentDate.setText(data.currentDate);
    refNo.setText(data.refNo);

    const fields = [
      { field: interName, size: fontSize },
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

    interName.defaultUpdateAppearances(boldFont);
    currentDate.defaultUpdateAppearances(boldFont);
    refNo.defaultUpdateAppearances(boldFont);

    inviteToDomain.enableMultiline();

    form.flatten();
    const pdfBytes = await pdfDoc.save();

    await fs.writeFile(`../out/${output}`, pdfBytes);
    console.log("PDF created successfully.");
  } catch (err) {
    console.error("Error creating PDF:", err);
  }
}

//mocl data
const data = {
  interName: "Adisht Jaglan",
  domainName: "Web Development Intern",
  durationOfInternship: "June 01, 2024 to July 01, 2024",
  currentDate: "31/05/2024",
  refNo: "SMM2024WD962772",
};

populatePDF("../template/updateOfferLetter.pdf", "output.pdf", data);
