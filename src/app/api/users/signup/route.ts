"use client";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import hiteshVdo from "@/models/userModel";

// Connect to the database

connect();



export async function POST(request: NextRequest) {

  try {
 
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log('Request body:', reqBody);

    // Check if the user already exists
    const user = await hiteshVdo.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new hiteshVdo({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
     savedUser,
    });
  } catch (error: any) {
    console.error('Error during user creation:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
