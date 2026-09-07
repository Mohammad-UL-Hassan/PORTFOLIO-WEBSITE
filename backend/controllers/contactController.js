const Contact = require("../models/contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Create Contact
exports.contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required."
            });
        }

        // Save enquiry to MongoDB
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        // Check Resend API key
        if (!process.env.RESEND_API_KEY) {
            console.error("❌ RESEND_API_KEY is missing.");
            return res.status(500).json({
                success: false,
                message: "Email service is not configured."
            });
        }

        // Send email through Resend
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "sarruhassan@gmail.com",
            subject: "New Portfolio Contact",
            html: `
                <h2>New Portfolio Contact</h2>

                <p>
                    <strong>Name:</strong>
                    ${name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${email}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${message}
                </p>
            `
        });

        if (error) {
            console.error("❌ Resend error:", error);

            return res.status(500).json({
                success: false,
                message: "Enquiry saved, but email could not be sent."
            });
        }

        console.log("✅ Email sent successfully:", data?.id);

        return res.status(200).json({
            success: true,
            message: "Message received successfully!"
        });

    } catch (error) {
        console.error("❌ Contact error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
};


// Get All Contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(contacts);

    } catch (error) {
        console.error("❌ Get contacts error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch contacts."
        });
    }
};


// Delete Contact
exports.deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully."
        });

    } catch (error) {
        console.error("❌ Delete contact error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete contact."
        });
    }
};