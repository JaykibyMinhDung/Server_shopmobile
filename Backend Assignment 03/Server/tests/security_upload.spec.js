
const express = require("express");
const request = require("supertest");
const path = require("path");
const fs = require("fs");
const app = require("../app.js");

describe("File Upload Vulnerability Fix", () => {
  const publicDir = path.join(__dirname, "../public");

  afterEach(() => {
    // Clean up any files that might have slipped through
    const files = fs.readdirSync(publicDir);
    const uploadedFiles = files.filter(f => f.endsWith("-test.html"));
    uploadedFiles.forEach(f => fs.unlinkSync(path.join(publicDir, f)));
  });

  it("should REJECT an HTML file with image mime-type", async () => {
    const maliciousFileContent = "<html><body><script>alert('XSS')</script></body></html>";

    await request(app)
      .post("/chatrooms/createNewRoom")
      .attach('image', Buffer.from(maliciousFileContent), {
        filename: 'test.html',
        contentType: 'image/png'
      });

    // Check the public directory
    const files = fs.readdirSync(publicDir);
    const uploadedFile = files.find(f => f.endsWith("-test.html"));

    if (uploadedFile) {
        console.log("Uploaded files:", files);
        throw new Error("Vulnerability still exists: File uploaded with html extension but image content type.");
    }

    expect(uploadedFile).toBeUndefined();
  });

  it("should ACCEPT a valid PNG file", async () => {
    const validImageContent = Buffer.from("fakeimagecontent");

    await request(app)
      .post("/chatrooms/createNewRoom")
      .attach('image', validImageContent, {
        filename: 'valid.png',
        contentType: 'image/png'
      });

    // Check the public directory
    const files = fs.readdirSync(publicDir);
    const uploadedFile = files.find(f => f.endsWith("-valid.png"));

    if (uploadedFile) {
        fs.unlinkSync(path.join(publicDir, uploadedFile));
    }

    expect(uploadedFile).toBeDefined();
  });
});
