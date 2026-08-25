const Enquiry = require('../models/Enquiry');

exports.submitEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    
    // Send email notification
    try {
      const { sendEmail } = require('../utils/sendEmail');
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: 'New Admission Enquiry - Pratibha Public School Basna',
        html: `
          <h2>New Admission Enquiry Received</h2>
          <p><strong>Student Name:</strong> ${enquiry.studentName}</p>
          <p><strong>Parent Name:</strong> ${enquiry.parentName}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Phone:</strong> ${enquiry.phone}</p>
          <p><strong>Class:</strong> ${enquiry.class}</p>
          <p><strong>Message:</strong> ${enquiry.message}</p>
          <p><strong>Date:</strong> ${enquiry.createdAt}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
