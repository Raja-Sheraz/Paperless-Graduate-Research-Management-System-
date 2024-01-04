// routes/pdfRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const StudentData = require("../Models/studentRegister");
const Pdf = require("../Models/Pdf");

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({storage: storage});

// Create a new PDF with file upload
router.post("/pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    const pdf = new Pdf({
      pdfName: req.file.filename, // Use req.file.filename instead of filename
      comments: req.body.comments || [],
    });

    // If a file is uploaded, you can handle it here
    if (req.file) {
      // Assuming the file is stored in /tmp/my-uploads
      // You can modify the path accordingly based on your needs
      pdf.file = req.file.path;
    }

    const savedPdf = await pdf.save();
    res.json(savedPdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
//Students Add a Pdf
router.post("/Student-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    console.log(req.body);
    const studentId = req.body.studentId;

    if (!studentId) {
      return res.status(400).json({error: "Student ID is required"});
    }
    const pdf = new Pdf({
      pdfName: req.file.filename, // Use req.file.filename instead of filename
      comments: req.body.comments || [],
    });

    if (req.file) {
      pdf.file = req.file.path;
    }

    const savedPdf = await pdf.save();
    const student = await StudentData.findById(studentId);
    if (!student) {
      return res.status(404).json({error: "Student not found"});
    }

    student.pdf = savedPdf._id;
    await student.save();
    res.json({
      message: "PDF created and associated with the student successfully",
      pdf: savedPdf,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
// add Comments
router.post("/pdf/:pdfId/comments", async (req, res) => {
  try {
    const {pdfId} = req.params;
    const {text} = req.body;

    if (!text) {
      return res.status(400).json({error: "Comment text is required"});
    }

    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({error: "PDF not found"});
    }

    // Add the new comment to the comments array
    pdf.comments.push({
      text: text,
      timestamp: Date.now(),
    });

    // Save the updated PDF
    const updatedPdf = await pdf.save();

    res.json({message: "Comment added successfully", pdf: updatedPdf});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
//update status
router.put("/pdf/:pdfId/status", async (req, res) => {
  try {
    const {pdfId} = req.params;
    const {status} = req.body;

    if (!status) {
      return res.status(400).json({error: "Status is required"});
    }

    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({error: "PDF not found"});
    }

    if (!Pdf.schema.path("status").enumValues.includes(status)) {
      return res.status(400).json({error: "Invalid status value"});
    }
    // Update the status of the PDF
    pdf.status = status;

    // Save the updated PDF
    const updatedPdf = await pdf.save();

    res.json({message: "Status updated successfully", pdf: updatedPdf});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
router.put("/pdf/:pdfId/feedback", async (req, res) => {
  try {
    const {pdfId} = req.params;
    const {feedbackText} = req.body;

    if (!feedbackText) {
      return res.status(400).json({error: "Feedback text is required"});
    }

    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({error: "PDF not found"});
    }

    // Update the feedback in the PDF
    pdf.feedback = {
      text: feedbackText,
      timestamp: new Date(),
    };

    // Save the updated PDF
    const updatedPdf = await pdf.save();

    res.json({message: "Feedback added successfully", pdf: updatedPdf});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

// Get all PDFs
router.get("/pdfs", async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
// Get pdf by ID
router.get("/pdf/:id", async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({error: "PDF not found"});
    }
    return res.json(pdf);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

module.exports = router;
