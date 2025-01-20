import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../utils/db";
import Contact from "../../../../utils/Membership"; 
import axios from 'axios';

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;

export async function POST(req) {
  try {
    await connectToDatabase();
    
    const { fullName, email, phone, amount, khaltiToken, membershipType } = await req.json();

    // Step 1: Verify the payment using Khalti API
    const verificationResponse = await fetch("https://dev.khalti.com/api/v2/", {
      method: "POST",
      headers: {
        "Authorization": `Key ${KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: khaltiToken, amount: amount * 100 }),
    });

    const verificationData = await verificationResponse.json();

    if (verificationData.state && verificationData.state.name === "Completed") {
      // Step 2: Save the payment in the database
      const newMembership = new Membership({
        fullName,
        email,
        phone,
        amount,
        khaltiToken,
        transactionId: verificationData.idx,
        membershipType,
        paymentStatus: "Completed",
      });

      await newMembership.save();

      return NextResponse.json({ success: true, message: "Membership saved successfully!" });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed!" });
    }

  } catch (error) {
    console.error("Error during payment verification:", error);
    return NextResponse.json({ success: false, message: "Internal server error!" });
  }
}