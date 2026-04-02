import { RequestHandler } from "express";

interface BookOrderRequest {
  fullName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  quantity: string;
  gdprConsent: boolean;
  submittedAt: string;
}

interface BookOrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
}

export const handleBookOrder: RequestHandler = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      quantity,
      gdprConsent,
      submittedAt,
    } = req.body as BookOrderRequest;

    // Validation
    if (!fullName || !email || !address || !city || !postalCode || !country || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!gdprConsent) {
      return res.status(400).json({
        success: false,
        message: "GDPR consent is required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Log the order (in production, save to database)
    console.log("Book order received:", {
      orderId,
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      quantity,
      submittedAt,
    });

    // Prepare email content
    const emailContent = `
      <h2>Book Order Confirmation</h2>
      <p>Order ID: ${orderId}</p>
      <p>Submitted: ${new Date(submittedAt).toLocaleString()}</p>
      
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      
      <h3>Shipping Address</h3>
      <p>${address}<br>${city}, ${postalCode}<br>${country}</p>
      
      <h3>Order Details</h3>
      <p><strong>Product:</strong> Street Photography Series Book</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Price per unit:</strong> €85.00</p>
      <p><strong>Total:</strong> €${(parseInt(quantity) * 85).toFixed(2)}</p>
      
      <h3>Compliance</h3>
      <p>GDPR Consent: Yes</p>
      <p>Data Processing Agreement: Accepted</p>
    `;

    // TODO: In production, integrate with email service (Sendgrid, Mailgun, etc.)
    // For now, we'll just log it
    console.log("Would send email to:", email);
    console.log("Email content:", emailContent);

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response
    return res.json({
      success: true,
      message: "Order submitted successfully. Confirmation email will be sent shortly.",
      orderId,
    } as BookOrderResponse);
  } catch (error) {
    console.error("Book order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process order. Please try again.",
    });
  }
};
