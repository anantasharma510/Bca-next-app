import { connectToDatabase } from "../../../../utils/db"
import Notice from "../../../../utils/schema";

// POST: Create a new notice
export async function POST(req) {
    try {
      const { title, content } = await req.json();
  
      if (!title || !content) {
        return new Response("Title and content are required.", { status: 400 });
      }
  
      await connectToDatabase();
  
      const newNotice = new Notice({ title, content });
      await newNotice.save();
  
      return new Response(JSON.stringify(newNotice), { status: 201 });
    } catch (error) {
      console.error("Error inserting data:", error);
      return new Response("Error inserting data", { status: 500 });
    }
  }
  
  // GET: Fetch notices with pagination
  export async function GET(req) {
    try {
      await connectToDatabase();
  
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
      const limit = 4; // Number of notices per page
  
      const notices = await Notice.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip((page - 1) * limit)
        .limit(limit);
  
      const totalNotices = await Notice.countDocuments();
      const totalPages = Math.ceil(totalNotices / limit);
  
      return new Response(
        JSON.stringify({ notices, totalPages }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching notices:", error);
      return new Response("Error fetching notices", { status: 500 });
    }
  }