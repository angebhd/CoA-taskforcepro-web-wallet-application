const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    accounts: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        type: { type: Number, default: 0 },
        credit: { type: Number, default: 0 },
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'DaiyQuiz' },
        score: Number,
    }],
    transactions: [{
        timestamp: { type: Date, default: Date.now },
        accountId: { type: mongoose.Schema.Types.ObjectId }, // Reference to an account
        amount: { type: Number, required: true },
        category: [{_id: {type: mongoose.Schema.Types.ObjectId}, subcategory: {type: mongoose.Schema.Types.ObjectId}}],
        debit: { type: Number, default: 0 },
        credit: { type: Number, default: 0 },
    }],
    categories: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true },
        subcategory: [{
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            name: { type: String, required: true }
        }]
    }],
    password: { type: String, required: true, },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);