import User from "../models/userModel.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;
        const allUsers = await User.find({_id: { $ne : loggedInUserId }}).select("-password");
        
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}