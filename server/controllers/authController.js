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

    // Check required Google environment variables
    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REDIRECT_URI
    ) {
      console.error(
        "Google OAuth environment variables are missing"
      );

      return res.status(500).send(
        "Google authentication is not configured correctly"
      );
    }

    console.log(
      "GOOGLE REDIRECT URI:",
      process.env.GOOGLE_REDIRECT_URI
    );

    const authUrl = googleClient.generateAuthUrl({
      access_type: "offline",

      scope: [
        "openid",
        "email",
        "profile",
      ],

      prompt: "select_account",

      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
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
    console.log("GOOGLE CALLBACK ROUTE HIT");

    const { code, error } = req.query;

    // Google returned an OAuth error
    if (error) {
      console.error(
        "GOOGLE OAUTH ERROR:",
        error
      );

      return res.status(400).send(
        `Google authentication failed: ${error}`
      );
    }

    // No authorization code
    if (!code) {
      console.error(
        "GOOGLE CALLBACK QUERY:",
        req.query
      );

      return res.status(400).send(
        "Google authentication failed: No authorization code"
      );
    }

    // Exchange authorization code for Google tokens
    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    if (!tokens.id_token) {
      console.error(
        "Google did not return an ID token"
      );

      return res.status(400).send(
        "Google authentication failed: No ID token"
      );
    }

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).send(
        "Google authentication failed: Invalid user information"
      );
    }

    const googleEmail = payload.email.toLowerCase().trim();
    const googleName = payload.name || "Google User";

    console.log("GOOGLE USER:", {
      email: googleEmail,
      name: googleName,
    });

    // ========================================
    // FIND EXISTING USER
    // ========================================

    let user = await User.findOne({
      email: googleEmail,
    });

    // ========================================
    // CREATE USER IF NOT EXISTS
    // ========================================

    if (!user) {
      user = await User.create({
        name: googleName,
        email: googleEmail,

        password: await bcrypt.hash(
          crypto.randomBytes(32).toString("hex"),
          10
        ),
      });

      console.log("NEW GOOGLE USER CREATED");
    } else {
      console.log("EXISTING GOOGLE USER");
    }

    // ========================================
    // GENERATE JWT
    // ========================================

    const token = generateToken(user._id);

    console.log("GOOGLE LOGIN SUCCESS");

    // ========================================
    // REDIRECT TO FRONTEND
    // ========================================

    if (!process.env.CLIENT_URL) {
      console.error(
        "CLIENT_URL is missing"
      );

      return res.status(500).send(
        "CLIENT_URL is not configured"
      );
    }

    return res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${encodeURIComponent(token)}`
    );

  } catch (error) {
    console.error(
      "GOOGLE CALLBACK ERROR:",
      error
    );

    return res.status(500).send(
      "Google authentication failed"
    );
  }
};