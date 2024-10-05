const path = require("path");
require("dotenv").config();
console.log(process.env); // এই লাইনে আপনার .env এর ভেরিয়েবলগুলো প্রিন্ট হবে

require("dotenv").config(); // .env ফাইল লোড করুন

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.dev.to",
        pathname: "**",
      },
    ],
  },
};
