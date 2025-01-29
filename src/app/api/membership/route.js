import { connectToDatabase } from "../../../../utils/db";
import Membership from "../../../../utils/Membership";
import axios from 'axios';

export async function POST(req) {
  // Extract data from the incoming request
  const { amount, purchaseOrderId, purchaseOrderName, customerInfo } = await req.json();

  // Create the payload for Khalti API
  const payload = {
    return_url: "http://localhost:3000/payment-success", // Update with your actual return URL after payment success
    website_url: "http://localhost:3000/",
    amount: amount * 100, // Convert to paisa (500 NPR -> 50000 paisa)
    purchase_order_id: purchaseOrderId,
    purchase_order_name: purchaseOrderName,
    customer_info: customerInfo,
  };

  // Log the request payload for debugging
  console.log("Request Payload:", JSON.stringify(payload, null, 2));
  
  try {
    // Determine the correct Khalti API URL (sandbox URL for testing)
    const khaltiUrl = "https://a.khalti.com/api/v2/epayment/initiate/";

    // Select the secret key based on the environment: sandbox (testing) or production
    const secretKey = process.env.KHALTI_SECRET_KEY;
    
    if (!secretKey) {
      console.error("Secret key is missing in the environment variables.");
      return new Response(
        JSON.stringify({ error: "Missing secret key" }), 
        { status: 500 }
      );
    }

    // Send the POST request to Khalti API
    const response = await axios.post(khaltiUrl, payload, {
      headers: {
        Authorization: `Key ${secretKey}`, // Using the secret key based on the environment
        "Content-Type": "application/json",
      },
    });

    // Log response data for debugging
    console.log("Khalti API Response:", response.data);

    // If successful, return the payment URL from Khalti response
    if (response.data.payment_url) {
      return new Response(
        JSON.stringify({ payment_url: response.data.payment_url }), 
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Log the scenario where no payment URL is found
      console.error("No payment URL returned by Khalti API.");
      return new Response(
        JSON.stringify({ error: "Failed to retrieve payment URL from Khalti." }), 
        { status: 500 }
      );
    }
  } catch (error) {
    // Enhanced error handling and logging for debugging
    console.error("Khalti Payment Error:", error.response?.data || error.message);
    
    // If error.response exists, log more details
    if (error.response) {
      console.error("Error Response Details:", JSON.stringify(error.response.data, null, 2));
    }

    // Return a detailed error message based on the API response
    return new Response(
      JSON.stringify({ 
        error: "Payment initiation failed. Please check the logs for more details." 
      }), 
      { status: 500 }
    );
  }
}
