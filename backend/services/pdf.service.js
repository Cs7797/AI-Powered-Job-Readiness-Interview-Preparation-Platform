import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const generatePdfFromHtml = async (html) => {
  const isVercel = process.env.VERCEL === "1";

  const browser = isVercel
    ? await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      })
    : await puppeteer.launch({
        headless: true,
      });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "12mm",
        right: "12mm",
        bottom: "12mm",
        left: "12mm",
      },
    });

    return pdf;
  } finally {
    await browser.close();
  }
};
