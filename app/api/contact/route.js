import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json(); // ইউজারের বার্তা গ্রহণ করা
  const token = process.env.TELEGRAM_BOT_TOKEN; // টোকেন
  const chat_id = process.env.TELEGRAM_CHAT_ID; // চ্যাট আইডি

  if (!token || !chat_id) {
    return NextResponse.json(
      {
        success: false,
        message: "Token or Chat ID not found", // যদি টোকেন বা চ্যাট আইডি না থাকে
      },
      { status: 400 } // 400 স্ট্যাটাস কোড
    );
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`; // বার্তা পাঠানোর URL
    const message = `New message from ${payload.name}\n\nEmail: ${payload.email}\n\nMessage:\n ${payload.message}\n\n`;

    const res = await axios.post(url, {
      text: message, // পাঠানো বার্তা
      chat_id: chat_id, // চ্যাট আইডি
    });

    if (res.data.ok) {
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!", // সফল হলে
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error); // ত্রুটি লগ করুন
    return NextResponse.json(
      {
        message: "Message sending failed!", // বার্তা পাঠানোতে সমস্যা হলে
        success: false,
      },
      { status: 500 }
    );
  }
}
