const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

// ========================================
// GOOGLE OAUTH CLIENT
// ========================================

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// ========================================
// GENERATE JWT TOKEN
// ========================================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ========================================
// REGISTER USER
// ========================================

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// LOGIN USER
// ========================================

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// LOGOUT USER
// ========================================

exports.logoutUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GOOGLE LOGIN
// ========================================

exports.googleLogin = (req, res) => {
  try {
    console.log("GOOGLE LOGIN ROUTE HIT");

    const authUrl = googleClient.generateAuthUrl({
      access_type: "offline",

      scope: [
        "openid",
        "email",
        "profile",
      ],

      prompt: "select_account",
    });

    console.log("GOOGLE AUTH URL:", authUrl);

    return res.redirect(authUrl);

  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);

    return res.status(500).send(
      "Unable to start Google authentication"
    );
  }
};

// ========================================
// GOOGLE CALLBACK
// ========================================

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send(
        "Google authentication failed: No authorization code"
      );
    }

    // Exchange code for Google tokens
    const { tokens } = await googleClient.getToken(code);

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleEmail = payload.email;
    const googleName = payload.name;

    console.log("GOOGLE USER:", {
      email: googleEmail,
      name: googleName,
    });

    // Find existing user
    let user = await User.findOne({
      email: googleEmail.toLowerCase(),
    });

    // Create user if doesn't exist
    if (!user) {
      user = await User.create({
        name: googleName,
        email: googleEmail.toLowerCase(),

        // Random password for Google accounts
        password: await bcrypt.hash(
          crypto.randomBytes(32).toString("hex"),
          10
        ),
      });

      console.log("NEW GOOGLE USER");
    } else {
      console.log("EXISTING GOOGLE USER");
    }

    // Generate JWT
    const token = generateToken(user._id);

    console.log("GOOGLE LOGIN SUCCESS");

    // Redirect to React
    return res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${token}`
    );

  } catch (error) {
    console.error("GOOGLE CALLBACK ERROR:", error);

    return res.status(500).send(
      "Google authentication failed"
    );
  }
};