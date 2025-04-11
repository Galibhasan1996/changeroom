
// validation.js
export const validateSignup = (state, showToast) => {
    for (const key in state) {
        if (!state[key]) {
            showToast("error", `Please enter your ${key}`, `Field ${key} is required`);
            return false;
        }
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(state.email)) {
        showToast("error", "Invalid email format", "Please enter a valid email address");
        return false;
    }

    // Mobile validation (Assuming 10-digit phone number)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(state.mobile)) {
        showToast("error", "Invalid mobile number", "Mobile number should be 10 digits");
        return false;
    }

    // Password validation
    if (state.password.length < 6) {
        showToast("error", "Weak password", "Password must be at least 6 characters long");
        return false;
    }

    // Confirm Password validation
    if (state.password !== state.confirmPassword) {
        showToast("error", "Password mismatch", "Passwords do not match");
        return false;
    }

    return true;
};




export const validateUpdata = (state, showToast) => {
    for (const key in state) {
        if (!state[key]) {
            showToast("error", `Please enter your ${key}`, `Field ${key} is required`);
            return false;
        }
    }


    // Mobile validation (Assuming 10-digit phone number)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(state.mobile)) {
        showToast("error", "Invalid mobile number", "Mobile number should be 10 digits");
        return false;
    }

    const aadharRegex = /^[0-9]{12}$/;
    if (!aadharRegex.test(state.aadhar)) {
        showToast("error", "Invalid aadhar number", "Aadhar number should be 12 digits");
        return false;
    }
    return true;
};




export const validateLogin = (email, password, showToast) => {


    if (email === "") {
        showToast("error", "Please enter your email", " email is required")
        return
    }

    if (password === "") {
        showToast("error", "Please enter your password", " password is required")
        return
    }

    if (password.length < 6) {
        showToast("error", "Weak password", "Password must be at least 6 characters long");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showToast("error", "Invalid email format", "Please enter a valid email address");
        return;
    }

    return true;
};


export const adminValidation = (state, showToast) => {

    for (const key in state) {
        if (!state[key]) {
            showToast("error", `Please enter your ${key}`, `Field ${key} is required`);
            return false;
        }
    }

    // Mobile validation (Assuming 10-digit phone number)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(state.mobile)) {
        showToast("error", "Invalid mobile number", "Mobile number should be 10 digits");
        return false;
    }
    return true;
};




export const validateGoggle = (state, showToast) => {
    for (const key in state) {
        if (!state[key]) {
            showToast("error", `Please enter your ${key}`, `Field ${key} is required`);
            return false;
        }
    }



    return true;
};


export const validateShoe = (state, showToast) => {
    for (const key in state) {
        if (!state[key]) {
            showToast("error", `Please enter your ${key}`, `Field ${key} is required`);
            return false;
        }
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(state.mobile)) {
        showToast("error", "Invalid mobile number", "Mobile number should be 10 digits");
        return false;
    }

    return true;
};