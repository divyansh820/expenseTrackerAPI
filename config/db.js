import mongoose from 'mongoose';

export const connectDB = async() => {
     await mongoose.connect("mongodb+srv://divyanshsrivastav3003_db_user:rIvZgEcryqcoHt0H@expense-tracker.ofu9uuz.mongodb.net/Expense")
     .then(() => console.log("DB Connected"));
}