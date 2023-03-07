// regex for email verification
export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
// regex for password verification
export const validatePassword = (password) => {
    // At least one uppercase letter, one lowercase letter, one number and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    return passwordRegex.test(password);
}
// regex for phone number validation
export const validatePhoneNumber = (phoneNumber) => {
    return /^\d{9}$/.test(phoneNumber);
}

/*export const isEditFormValid = () => {
    if (!editName) {
        toast.error("Please input a valid name.");
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(editName)) {
        toast.error("Name should contain only letters.");
        return false;
    }
    if (!editSurname) {
        toast.error("Please input a valid surname.");
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(editSurname)) {
        toast.error("Surname should contain only letters.");
        return false;
    }
    if (!editEmail) {
        toast.error("Please input a valid email address.");
        return false;
    }
    if (!isValidEmail(editEmail)) {
        toast.error("Invalid email address.");
        return false;
    }
    if (!editPassword) {
        toast.error(`Please input a password before submitting.`);
        return false;
    }
    if (!validatePassword(editPassword)) {
        toast.error(`Password has to have at least one uppercase letter, one lowercase letter, one number and one special character.`);
        return false;
    }
    if (editCategory === '--Choose a category--') {
        toast.error("Pick a category before submitting.");
        return false;
    }
    if (!validatePhoneNumber(editPhone)) {
        toast.error("Phone number should have exactly 9 symbols. Digits only.");
        return false;
    }
    if (!editDateOfBirth) {
        toast.error("Please select a date of birth.");
        return false;
    }
    return true;
}

*/