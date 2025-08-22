// "use client";

// import { connect } from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import hiteshVdo from "@/models/userModel";

// // Connect to the database

//  connect();


// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { email, password } = reqBody;
//     console.log(reqBody);

//     // Check if the user exists
//     const user = await hiteshVdo.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ error: "User does not exist" }, { status: 404 });
//     }

//     // Verify the password
//     const validPassword = await bcryptjs.compare(password, user.password);
//     if (!validPassword) {
//       return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
//     }

//     // Generate a token
//     const tokenData = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     };

//     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
//       expiresIn: "1h",
//     });

//     const response = NextResponse.json({
//       message: "Login Successful",
//       success: true,
//     });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//     });

//     return response;
//   } catch (error: any) {
//     console.error("Error during login:", error.message);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
