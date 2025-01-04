// const puppeteer = require("puppeteer");
// const path = require("path");

// (async () => {
//   const downloadPath = path.resolve(__dirname, "downloads"); // Directory to save PDFs

//   // Launch Puppeteer
//   const browser = await puppeteer.launch({ headless: false, defaultViewport: null });

//   const page = await browser.newPage();

//   // Set download behavior
//   const client = await page.target().createCDPSession();
//   await client.send("Page.setDownloadBehavior", {
//     behavior: "allow",
//     downloadPath: downloadPath,
//   });

//   // Navigate to the Karnataka High Court website
//   await page.goto(
//     "https://karnatakajudiciary.kar.nic.in/newwebsite/rep_judgment.php",
//     { waitUntil: "networkidle2" }
//   );

// await page.select('#db_bench', 'B'); // Target dropdown ID and option value
// console.log('Selected option "B" from the db_bench dropdown. Waiting for form to load...');

// // Step 2: Wait for the "From" date input field to appear (or any other form element)
// // await page.waitForSelector('#dp1'); // Replace with an actual element that confirms form load
// await page.waitFor('#dp1');
// console.log('Form loaded, ready to enter date range.');

// // Enter the date range
// await page.type('#dp1', '2025-01-01'); // Replace with desired start date
// await page.type('#dp2', '2025-01-10'); // Replace with desired end date
// console.log('Entered date range.');


//   // Step 3: Solve the captcha manually
//   console.log("Please solve the captcha manually...");
// //   await page.waitForTimeout(30000); // 30 seconds for manual captcha solving
//   await page.waitFor(30000); // 30 seconds wait time


//   // Step 4: Click the "Search" button
//   await page.click("#searchButtonSelector"); // Replace with actual selector
//   console.log("Search button clicked. Waiting for modal to load...");
//   await page.waitForSelector(".modal-window-selector"); // Replace with actual modal selector

//   // Step 5: Select "All" from the dropdown in the modal (manual action)
//   console.log('Please select "All" from the dropdown in the modal...');
//   await page.waitForTimeout(20000); // Allow time for manual selection

//   // Step 6: Target and extract the buttons in the modal
//   const judgmentButtons = await page.$$eval(
//     ".judgmentButtonSelector",
//     (buttons) =>
//       buttons.map((button) => ({
//         id: button.id,
//         text: button.innerText.trim(), // Optionally fetch the button's text
//       }))
//   );
//   console.log("Extracted buttons:", judgmentButtons);

//   // Step 7: Automate PDF downloads
//   for (const { id, text } of judgmentButtons) {
//     console.log(`Processing button with ID: ${id} (${text})`);
//     await page.click(`#${id}`);
//     console.log(`Clicked button with ID: ${id}. Waiting for download...`);
//     await page.waitForTimeout(5000); // Allow time for download to start
//   }

//   // Close the browser
//   await browser.close();
//   console.log(`All PDFs downloaded to: ${downloadPath}`);
// })();


// const puppeteer = require("puppeteer");
// const path = require("path");

// (async () => {
//   const downloadPath = path.resolve(__dirname, "downloads"); // Directory to save PDFs

//   // Launch Puppeteer
//   const browser = await puppeteer.launch({ headless: false, defaultViewport: null });

//   const page = await browser.newPage();

//   // Set download behavior
//   const client = await page.target().createCDPSession();
//   await client.send("Page.setDownloadBehavior", {
//     behavior: "allow",
//     downloadPath: downloadPath,
//   });

//   // Navigate to the Karnataka High Court website
//   await page.goto(
//     "https://karnatakajudiciary.kar.nic.in/newwebsite/rep_judgment.php",
//     { waitUntil: "networkidle2" }
//   );

//   // Step 1: Select option "B" from the dropdown
//   await page.select('#db_bench', 'B'); // Target dropdown ID and option value
//   console.log('Selected option "B" from the db_bench dropdown. Waiting for form to load...');

//   // Step 2: Wait for the "From" date input field to appear
//   await page.waitForSelector('#dp1'); // Wait for the date input field to load
//   console.log('Form loaded, ready to enter date range.');

//   // Enter the date range
//   await page.type('#dp1', '12-28-2024'); // Replace with desired start date
//   await page.type('#dp2', '02-01-2025'); // Replace with desired end date
//   console.log('Entered date range.');

//   // Step 3: Solve the captcha manually
//   console.log("Please solve the captcha manually...");
//   // await page.waitForTimeout(30000); // 30 seconds for manual captcha solving
//   await new Promise(resolve => setTimeout(resolve, 10000)); // 30 seconds


//   // Step 4: Click the "Search" button
//   await page.click("#generate"); // Replace with actual selector
//   console.log("Search button clicked. Waiting for modal to load...");
  

//   await page.waitForFunction(
//     () => document.body.classList.contains('modal-open'),
//     { timeout: 15000 }
//   );
//   console.log("Modal window is open.");

//   // Step 5: Select "All" from the dropdown in the modal (manual action)
//   console.log('Please select "All" from the dropdown in the modal...');
//   // await page.waitForTimeout(20000); // Allow time for manual selection
//   await new Promise(resolve => setTimeout(resolve, 10000)); // Allow time for manual selection


//   // Step 6: Extract buttons with class 'btn btn-success'
// const judgmentButtons = await page.$$eval(
//   "td > button.btn.btn-success", // Target buttons with the specific class inside <td>
//   (buttons) =>
//     buttons.map((button) => ({
//       id: button.id               
//     }))
// );

// console.log("Extracted buttons with class 'btn btn-success':", judgmentButtons);

// // Validate if any buttons were found
// if (judgmentButtons.length === 0) {
//   console.error("No buttons with class 'btn btn-success' found. Verify the selector.");
// } else {
//   console.log(`${judgmentButtons.length} buttons found with class 'btn btn-success'. Ready for processing.`);
// }

  
// // Step 7: Automate PDF downloads
// for (const { id } of judgmentButtons) {
//   console.log(`Processing button with ID: ${id}`);
//   try {
//     // Locate the button using the id in context
//     const buttonHandle = await page.$(`td > button.btn.btn-success[id="${id}"]`);
    
//     if (!buttonHandle) {
//       console.error(`Button with ID: ${id} not found.`);
//       continue; // Skip to the next button if not found
//     }

//     // Scroll to the button to ensure it's in the viewport
//     await buttonHandle.evaluate((btn) => btn.scrollIntoView());

//     // Click the button directly
//     await buttonHandle.click();
//     console.log(`Clicked button with ID: ${id}. Waiting for download to complete...`);

//     // Wait for a few seconds to ensure the download starts
//     await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds wait
//   } catch (error) {
//     console.error(`Error processing button with ID: ${id}. Skipping to the next button.`);
//   }
// }


// console.log("All PDF download attempts completed.");


//   // Close the browser
//   // await browser.close();
//   console.log(`All PDFs downloaded to: ${downloadPath}`);
// })();


const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const downloadPath = path.resolve(__dirname, "downloads");
  
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath);
  }

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });

  const page = await browser.newPage();

  // Suppress alert boxes
  page.on("dialog", async (dialog) => {
    console.log("Alert detected: ", dialog.message());
    await dialog.dismiss(); // Dismiss the alert automatically
  });

  const client = await page.target().createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath,
  });

  try {
    await page.goto("https://karnatakajudiciary.kar.nic.in/newwebsite/rep_judgment.php", { waitUntil: "networkidle2" });
    await page.select("#db_bench", "B");
    console.log('Selected option "B" from the dropdown.');

    await page.waitForSelector("#dp1");
    await page.type("#dp1", "12-28-2024");
    await page.type("#dp2", "02-01-2025");
    console.log("Entered date range.");

    console.log("Please solve the captcha manually...");
    await wait(10000);

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
        // Check if button is visible and clickable (not pending)
        const isVisible = await button.evaluate((btn) => {
          const style = window.getComputedStyle(btn);
          return style.display !== "none" && style.visibility !== "hidden" && style.pointerEvents !== "none";
        });

        if (!isVisible) {
          console.log("Button is not clickable. Skipping.");
          continue; // Skip non-clickable buttons
        }

        const id = await button.evaluate((btn) => btn.id);
        console.log(`Processing button with ID: ${id}`);
        
        await button.evaluate((btn) => btn.scrollIntoView());
        await button.click();
        console.log(`Clicked button with ID: ${id}`);
        await wait(5000); // Wait for download to start

      } catch (err) {
        console.error(`Failed to process button with ID: ${id}`, err);
      }
    }
  } catch (error) {
    console.error("Error during execution:", error);
  } finally {
    await browser.close();
    console.log("Browser closed. All tasks completed.");
  }
})();
