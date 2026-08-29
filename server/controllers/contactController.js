exports.submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Send email only if email env vars are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_HOST) {
      try {
        const { sendEmail } = require('../utils/sendEmail');
        await sendEmail({
          to: process.env.EMAIL_USER,
          subject: `New Contact Message: ${contact.subject}`,
          html: `
            <h2>New Contact Message Received</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Message:</strong> ${contact.message}</p>
            <p><strong>Date:</strong> ${contact.createdAt}</p>
          `,
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};