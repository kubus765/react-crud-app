import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// regex for email verification
const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
/*
// regex for password verification
const validatePassword = (password) => {
    // Minimum 8 and maximum 32 characters, at least one uppercase letter, at least one lowercase letter, at least one number and at least one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    
    return passwordRegex.test(password);
  }
*/
// regex for phone number validation
const validatePhoneNumber = (phoneNumber) => {
    return /^\d{9}$/.test(phoneNumber);
}

export const isFormValid = ({name,surname,email,password,category,phone,dateOfBirth}) => {
    if (!name) {
        toast.error("Please input a valid name.");
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
        toast.error("Name should contain only letters.");
        return false;
    }
    if (!surname) {
        toast.error("Please input a valid surname.");
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(surname)) {
        toast.error("Surname should contain only letters.");
        return false;
    }
    if (!email) {
        toast.error("Please input a valid email address.");
        return false;
    }
    if (!isValidEmail(email)) {
        toast.error("Invalid email address.");
        return false;
    }


    if (category === '--Choose a category--') {
        toast.error("Pick a category before submitting.");
        return false;
    }
    if (!validatePhoneNumber(phone)) {
        toast.error("Phone number should have exactly 9 symbols. Digits only.");
        return false;
    }
    if (!dateOfBirth) {
        toast.error("Please select a date of birth.");
        return false;
    }
    return true;
}
