const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");

const getUser = async (req, res) => {
  try {
    const { username, email } = req.query;

    if (!username && !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Provide username or email"
      });
    }

    const user = await User.findOne({ 
      $or: [{ username }, { email }] 
    }).select("-password");

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
};

module.exports = { getUser };