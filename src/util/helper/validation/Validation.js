
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

    const shoe_sizeRegex = /^(?:[3-9]|1[0-2])$/;
    if (!shoe_sizeRegex.test(state.shoe_size)) {
        showToast("error", "Shoe size should be between 3 and 12", "Invalid shoe size");
        return false;
    }



    const aadharRegex = /^[0-9]{12}$/;
    if (!aadharRegex.test(state.aadhar)) {
        showToast("error", "Invalid aadhar number", "Aadhar number should be 12 digits");
        return false;
    }



    const validRoles = ["NEEM", "NAPS", "TDS", "SSD", "CHAUDHARY", "LOREAL", "PERFECT SERVICE", "FM", "SIS", "RKS", "MESPACK"]

    if (!validRoles.some((role) => role.toLowerCase() === state.role.toLowerCase().trim())) {
        showToast("error", "You Entered Invalid Role", "Please Enter Valid Role");
        return false;
    }



    const validDepartment = [
        "FLOW", "STORE", "OPERATOR", "SUPERVISOR",
        "HOUSEKEEPING", "MAINTENANCE", "MFG", "QUALITY", "ADMIN", "HR", "PRODUCTION",
        "FINANCE", "SAFETY", "ACCOUNT", "PROJECT", "IT", "MSC", "SECURITY", "UTILITY",
        "BOILER", "ETP", "PACKING", "LOADING",
        "CHANGEROOM", "CONTRECTOR",
    ];

    if (!validDepartment.some(dept => dept.toLowerCase() === state.department.toLowerCase().trim())) {
        showToast("error", "You Entered Invalid department", "Please Enter Valid department");
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
        if (!state[key] && key !== 'date') {
            showToast("error", `Please enter your ${key}`, `Field ${key} is required`);
            return false;
        }
    }

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (state.date && !dateRegex.test(state.date)) {
        showToast("error", "Invalid date format", "Date should be in dd-mm-yyyy format");
        return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(state.mobile)) {
        showToast("error", "Invalid mobile number", "Mobile number should be 10 digits");
        return false;
    }

    return true;
};
