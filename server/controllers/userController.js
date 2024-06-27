const userModel = require("../models/user");
const createUser = async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      company_name,
      city,
      state,
      zip,
      email,
      web,
      age,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !company_name ||
      !city ||
      !state ||
      !zip ||
      !email ||
      !web ||
      !age
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // checking if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const checkExisitingId = await userModel.findOne({ id });
    if (checkExisitingId) {
      return res
        .status(400)
        .json({ success: false, message: "Id already exists" });
    }
    // creating new user in db
    const newUser = new userModel({
      id,
      first_name,
      last_name,
      company_name,
      city,
      state,
      zip,
      email,
      web,
      age,
    });

    // saving new user in db
    const user = await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // getting all users
    const { page = 1, limit = 5, search, sort = "createdAt:-1" } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    // sorting
    const sortOrder = {};
    const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
    sortOrder[sortField] = sort.startsWith("-") ? -1 : 1;

    // finding users based on search
    let users;
    if (search) {
      users = await userModel
        .find({
          $or: [
            { first_name: { $regex: search, $options: "i" } },
            { last_name: { $regex: search, $options: "i" } },
            { company_name: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { state: { $regex: search, $options: "i" } },
            { zip: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { web: { $regex: search, $options: "i" } },
          ],
        })
        .limit(options.limit)
        .skip(options.limit * (options.page - 1))
        .sort(sortOrder)
        .exec();
    } else {
      users = await userModel
        .find()
        .limit(options.limit)
        .skip(options.limit * (options.page - 1))
        .sort(sortOrder)
        .exec();
    }

    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, age } = req.body;

    if (!first_name || !last_name || !age) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const { id } = req.params;
    const user = await userModel.findOneAndUpdate(
      { id },
      {
        first_name,
        last_name,
        age,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ success: true, message: "User updated successfully", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const Existinguser = await userModel.findOne({ id });
    if (!Existinguser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

     await userModel.findOneAndDelete({ id });

    res
      .status(204)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
