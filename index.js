// Working Version

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");

// (async () => {
//   const downloadPath = path.resolve(__dirname, "downloads");
  
//   if (!fs.existsSync(downloadPath)) {
//     fs.mkdirSync(downloadPath);
//   }

//   const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const browser = await puppeteer.launch({ headless: false, defaultViewport: null });

//   const page = await browser.newPage();

//   // Suppress alert boxes
//   page.on("dialog", async (dialog) => {
//     console.log("Alert detected: ", dialog.message());
//     await dialog.dismiss(); // Dismiss the alert automatically
//   });

//   const client = await page.target().createCDPSession();
//   await client.send("Page.setDownloadBehavior", {
//     behavior: "allow",
//     downloadPath,
//   });

//   try {
//     await page.goto("https://karnatakajudiciary.kar.nic.in/newwebsite/rep_judgment.php", { waitUntil: "networkidle2" });
//     // await page.select("#db_bench", "B");
//     // console.log('Selected option "B" from the dropdown.');

//     // await page.waitForSelector("#dp1");
//     // await page.type("#dp1", "12-28-2024");
//     // await page.type("#dp2", "02-01-2025");
//     // console.log("Entered date range.");

//     // console.log("Please solve the captcha manually...");
//     await wait(20000); //Added 20seconds timer we have to enter required details before that 20 secs

//     await page.click("#generate");
//     console.log("Search button clicked. Waiting for modal...");

//     await page.waitForFunction(() => document.body.classList.contains("modal-open"), { timeout: 15000 });
//     console.log("Modal window is open. Please select 'All' manually...");
//     await wait(10000);

//     const buttons = await page.$$("td > button.btn.btn-success");

//     if (buttons.length === 0) {
//       console.error("No buttons found with class 'btn btn-success'.");
//       return;
//     }

//     console.log(`Found ${buttons.length} buttons. Starting downloads...`);

//     for (const button of buttons) {
//       try {
//         // Check if button is visible and clickable (not pending)
//         const isVisible = await button.evaluate((btn) => {
//           const style = window.getComputedStyle(btn);
//           return style.display !== "none" && style.visibility !== "hidden" && style.pointerEvents !== "none";
//         });

//         if (!isVisible) {
//           console.log("Button is not clickable. Skipping.");
//           continue; // Skip non-clickable buttons
//         }

//         const id = await button.evaluate((btn) => btn.id);
//         console.log(`Processing button with ID: ${id}`);
        
//         await button.evaluate((btn) => btn.scrollIntoView());
//         await button.click();
//         console.log(`Clicked button with ID: ${id}`);
//         await wait(5000); // Wait for download to start

//       } catch (err) {
//         console.error(`Failed to process button with ID: ${id}`, err);
//       }
//     }
//   } catch (error) {
//     console.error("Error during execution:", error);
//   } finally {
//     await browser.close();
//     console.log("Browser closed. All tasks completed.");
//   }
// })();


// LOGGING CSV 2  Logging incorrectly

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");
// const moment = require("moment");

// (async () => {
//   const downloadPath = path.resolve(__dirname, "downloads");

//   if (!fs.existsSync(downloadPath)) {
//     fs.mkdirSync(downloadPath);
//   }

//   const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
//   const page = await browser.newPage();

//   // To track if an alert was triggered
//   let alertTriggered = false;

//   // Suppress alert boxes
//   page.on("dialog", async (dialog) => {
//     console.log("Alert detected: ", dialog.message());
//     alertTriggered = true;  // Set flag to true when an alert is triggered
//     await dialog.dismiss(); // Dismiss the alert automatically
//   });

//   const client = await page.target().createCDPSession();
//   await client.send("Page.setDownloadBehavior", {
//     behavior: "allow",
//     downloadPath,
//   });

//   const logData = []; // To store log data for CSV

//   try {
//     await page.goto("https://karnatakajudiciary.kar.nic.in/newwebsite/rep_judgment.php", { waitUntil: "networkidle2" });

//     await wait(20000); // Added 20 seconds timer for manual inputs

//     await page.click("#generate");
//     console.log("Search button clicked. Waiting for modal...");

//     await page.waitForFunction(() => document.body.classList.contains("modal-open"), { timeout: 15000 });
//     console.log("Modal window is open. Please select 'All' manually...");
//     await wait(10000);

//     const buttons = await page.$$("td > button.btn.btn-success");

//     if (buttons.length === 0) {
//       console.error("No buttons found with class 'btn btn-success'.");
//       return;
//     }

//     console.log(`Found ${buttons.length} buttons. Starting downloads...`);

//     for (const button of buttons) {
//       try {
//         // Reset the alertTriggered flag for each button click
//         alertTriggered = false;

//         // Check if button is visible and clickable (not pending)
//         const isVisible = await button.evaluate((btn) => {
//           const style = window.getComputedStyle(btn);
//           return style.display !== "none" && style.visibility !== "hidden" && style.pointerEvents !== "none";
//         });

//         if (!isVisible) {
//           console.log("Button is not clickable. Skipping.");
//           continue; // Skip non-clickable buttons
//         }

//         const id = await button.evaluate((btn) => btn.id);
//         console.log(`Processing button with ID: ${id}`);

//         await button.evaluate((btn) => btn.scrollIntoView());
//         await button.click();
//         console.log(`Clicked button with ID: ${id}`);

//         // Wait for download to start (either triggered by clicking the button or dismissed alert)
//         await wait(5000); // 5 seconds wait

//         // Log file download info (check if alert was triggered)
//         const status = alertTriggered ? false : true;
//         const fileName = `file_${id}_${moment().format("YYYY-MM-DD_HH-mm-ss")}.pdf`; // Customize filename as needed
//         logData.push([fileName, moment().format("YYYY-MM-DD HH:mm:ss"), status]);

//         console.log(`Logged ${status ? "success" : "failure"} for ${fileName}`);

//       } catch (err) {
//         console.error(`Failed to process button with ID: ${id}`, err);
//       }
//     }

//   } catch (error) {
//     console.error("Error during execution:", error);
//   } finally {
//     // Write to CSV
//     const logCsv = logData.map((row) => row.join(",")).join("\n");
//     fs.writeFileSync(path.resolve(__dirname, "download_log.csv"), logCsv);

//     await browser.close();
//     console.log("Browser closed. All tasks completed.");
//   }
// })();

// Almost Correct log Logs the id value of the button

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");
// const moment = require("moment");

// (async () => {
//   const downloadPath = path.resolve(__dirname, "downloads");

//   if (!fs.existsSync(downloadPath)) {
//     fs.mkdirSync(downloadPath);
//   }

//   const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
//   const page = await browser.newPage();

//   let alertTriggered = false; // Tracks if an alert is triggered
//   const processedButtons = new Set(); // Tracks processed button IDs
//   const logData = []; // To store log data for CSV

//   // Handle alert boxes
//   page.on("dialog", async (dialog) => {
//     console.log("Alert detected: ", dialog.message());
//     alertTriggered = true; // Mark that an alert was triggered
//     await dialog.dismiss(); // Dismiss the alert
//   });

//   const client = await page.target().createCDPSession();
//   await client.send("Page.setDownloadBehavior", {
//     behavior: "allow",
//     downloadPath,
//   });

//   try {
//     await page.goto("https://karnatakajudiciary.kar.nic.in/newwebsite/rep_judgment.php", { waitUntil: "networkidle2" });
//     await wait(20000); // Added 20 seconds for manual input

//     await page.click("#generate");
//     console.log("Search button clicked. Waiting for modal...");

//     await page.waitForFunction(() => document.body.classList.contains("modal-open"), { timeout: 15000 });
//     console.log("Modal window is open. Please select 'All' manually...");
//     await wait(10000);

//     const buttons = await page.$$("td > button.btn.btn-success");

//     if (buttons.length === 0) {
//       console.error("No buttons found with class 'btn btn-success'.");
//       return;
//     }

//     console.log(`Found ${buttons.length} buttons. Starting downloads...`);

//     for (const button of buttons) {
//       try {
//         // Reset alert flag for this iteration
//         alertTriggered = false;

//         // Get button ID and ensure it hasn't been processed before
//         const id = await button.evaluate((btn) => btn.id);
//         if (processedButtons.has(id)) {
//           console.log(`Button with ID: ${id} already processed. Skipping.`);
//           continue;
//         }
//         processedButtons.add(id);

//         // Check if button is visible and clickable
//         const isVisible = await button.evaluate((btn) => {
//           const style = window.getComputedStyle(btn);
//           return style.display !== "none" && style.visibility !== "hidden" && style.pointerEvents !== "none";
//         });

//         if (!isVisible) {
//           console.log("Button is not clickable. Skipping.");
//           continue; // Skip non-clickable buttons
//         }

//         console.log(`Processing button with ID: ${id}`);
//         await button.evaluate((btn) => btn.scrollIntoView());
//         await button.click();
//         console.log(`Clicked button with ID: ${id}`);

//         // Wait for download to start or alert to appear
//         await wait(10000);

//         // Log download status
//         const status = alertTriggered ? false : true;
//         const fileName = `file_${id}_${moment().format("YYYY-MM-DD_HH-mm-ss")}.pdf`;
//         logData.push([fileName, moment().format("YYYY-MM-DD HH:mm:ss"), status]);

//         console.log(`Logged ${status ? "success" : "failure"} for ${fileName}`);
//       } catch (err) {
//         console.error(`Failed to process button`, err);
//       }
//     }

//   } catch (error) {
//     console.error("Error during execution:", error);
//   } finally {
//     // Write log data to CSV
//     const logCsv = logData.map((row) => row.join(",")).join("\n");
//     fs.writeFileSync(path.resolve(__dirname, "download_log.csv"), logCsv);

//     await browser.close();
//     console.log("Browser closed. All tasks completed.");
//   }
// })();




// TESTING LOgs the downlaod file name

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

(async () => {
  const downloadPath = path.resolve(__dirname, "downloads");

  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath);
  }

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  let alertTriggered = false;
  const processedButtons = new Set();
  const logData = [];

  // Handle alert boxes
  page.on("dialog", async (dialog) => {
    console.log("Alert detected: ", dialog.message());
    alertTriggered = true;
    await dialog.dismiss();
  });

  const client = await page.target().createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath,
  });

  const getLatestFileName = () => {
    const files = fs.readdirSync(downloadPath).map((file) => ({
      name: file,
      time: fs.statSync(path.join(downloadPath, file)).mtime.getTime(),
    }));
    files.sort((a, b) => b.time - a.time);
    return files.length > 0 ? files[0].name : null;
  };

  try {
    await page.goto("https://karnatakajudiciary.kar.nic.in/newwebsite/rep_judgment.php", { waitUntil: "networkidle2" });
    await wait(20000); // Added 20 seconds for manual input

    await page.click("#generate");
    console.log("Search button clicked. Waiting for modal...");

    await page.waitForFunction(() => document.body.classList.contains("modal-open"), { timeout: 15000 });
    console.log("Modal window is open. Please select 'All' manually...");
    await wait(10000);

    const buttons = await page.$$("td > button.btn.btn-success");

    if (buttons.length === 0) {
      console.error("No buttons found with class 'btn btn-success'.");
      return;
    }

    console.log(`Found ${buttons.length} buttons. Starting downloads...`);

    for (const button of buttons) {
      try {
        alertTriggered = false;

        const id = await button.evaluate((btn) => btn.id);
        if (processedButtons.has(id)) {
          console.log(`Button with ID: ${id} already processed. Skipping.`);
          continue;
        }
        processedButtons.add(id);

        const isVisible = await button.evaluate((btn) => {
          const style = window.getComputedStyle(btn);
          return style.display !== "none" && style.visibility !== "hidden" && style.pointerEvents !== "none";
        });

        if (!isVisible) {
          console.log("Button is not clickable. Skipping.");
          continue;
        }

        console.log(`Processing button with ID: ${id}`);
        await button.evaluate((btn) => btn.scrollIntoView());
        await button.click();
        console.log(`Clicked button with ID: ${id}`);

        await wait(5000);

        const latestFileName = getLatestFileName();
        const status = alertTriggered ? false : true;

        logData.push([latestFileName || `Unknown_File_${id}`, moment().format("YYYY-MM-DD HH:mm:ss"), status]);

        console.log(
          `Logged ${status ? "success" : "failure"} for file: ${latestFileName || `Unknown_File_${id}`}`
        );
      } catch (err) {
        console.error(`Failed to process button`, err);
      }
    }

  } catch (error) {
    console.error("Error during execution:", error);
  } finally {
    const logCsv = logData.map((row) => row.join(",")).join("\n");
    fs.writeFileSync(path.resolve(__dirname, "download_log.csv"), logCsv);

    await browser.close();
    console.log("Browser closed. All tasks completed.");
  }
})();
