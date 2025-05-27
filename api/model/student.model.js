// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//     school: { type: mongoose.Schema.ObjectId, ref: 'School' },
//     email: { type: String, required: true },
//     name: { type: String, required: true },
//     student_class: { type: mongoose.Schema.ObjectId, ref: "Class" },
//     age: { type: String, required: true },
//     gender: { type: String, required: true },
//     address: { type: String, required: true },
//     dob:{ type: String, required: true },
//     blood_group: { type: String, required: true},
//     guardian: { type: String, required: true },
//     guardian_phone: { type: String, required: true },
//     student_image: { type: String, required: true },
//     createdAt: { type: Date, default: new Date() },
//     password: { type: String, required: true }


// })

// module.exports = mongoose.model("Student", studentSchema)


// ------------------------------------------------------------



const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.ObjectId, ref: 'School' },
    email: { type: String, required: true, unique: true }, // Added unique constraint for emails
    name: { type: String, required: true },
    student_class: { type: mongoose.Schema.ObjectId, ref: "Class" },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: String, required: true },
    blood_group: { type: String, required: true },
    guardian: { type: String, required: true },
    guardian_phone: { type: String, required: true },
    student_image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true }
});

// 🔐 Pre-save hook: Hash password before saving
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password changed

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// 🔍 Method to compare entered password (for login)
studentSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);










