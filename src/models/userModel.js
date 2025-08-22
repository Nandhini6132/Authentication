import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPassword: {
        type: String,
        default: ""
    },
    forgotPasswordToken: {
        type: Date,
        default: null
    },
    verifyToken: {
        type: String,
        default: ""
    },
    verifyTokenExpiry: {
        type: Date,
        default: null
    },
});

const hiteshVdo = mongoose.models.hiteshVdo || mongoose.model('hiteshVdo', UserSchema);

export default hiteshVdo;
