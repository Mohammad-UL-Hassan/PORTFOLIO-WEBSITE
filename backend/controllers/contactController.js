const Contact = require("../models/contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Create Contact
exports.contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();

        await resend.emails.send({
            from: "onboarding@resend.dev", // Replace with your verified sender
            to: "sarruhassan@gmail.com",   // Replace with your email
            subject: "New Portfolio Contact",
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "Message received successfully!",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};

// Get All Contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json(contacts);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch contacts.",
        });
    }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully.",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete contact.",
        });
    }
};