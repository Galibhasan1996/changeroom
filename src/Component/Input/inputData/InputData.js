
export const InputData = [

    {
        field: 'name',
        label: 'Name',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },

    {
        field: 'email',
        label: 'Email',
        keyboardType: 'email-address',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "email",
    },
    {
        field: 'password',
        label: 'Password',
        keyboardType: 'default',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "lock",
    },
    {
        field: 'confirmPassword',
        label: 'Confirm Password',
        keyboardType: 'default',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "lock",
    },
    {
        field: 'dateOfBirth',
        label: 'Date of Birth',
        keyboardType: 'phone-pad',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "calendar-today",
    },
    {
        field: 'mobile',
        label: 'Mobile',
        keyboardType: 'phone-pad',
        IconCategoryName: "Fontisto",
        IconName: "mobile",
    },

]





export const InputDataForUpdate = [
    {
        field: 'sr_no',
        label: 'Sr No',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "list",
        readOnly: true,

    },
    {
        field: 'name',
        label: 'Name',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },
    {
        field: 'locker_no',
        label: 'Locker No',
        keyboardType: 'phone-pad',
        IconCategoryName: "Entypo",
        IconName: "lock",
        readOnly: true,
    },
    {
        field: 'unit',
        label: 'Unit',
        keyboardType: 'default',
        IconCategoryName: "FontAwesome",
        IconName: "product-hunt",
        readOnly: true,
    },
    {
        field: 'code',
        label: 'Code',
        keyboardType: 'phone-pad',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "view-sequential",
    },
    {
        field: 'location',
        label: 'Location',
        keyboardType: 'phone-pad',
        IconCategoryName: "Ionicons",
        IconName: "location-sharp",
        readOnly: true,
    },
    {
        field: 'role',
        label: 'Role',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },
    {
        field: 'status',
        label: 'Status',
        keyboardType: 'default',
        IconCategoryName: "MaterialIcons",
        IconName: "signal-wifi-statusbar-4-bar",

    },
    {
        field: 'mobile',
        label: 'Mobile',
        keyboardType: 'phone-pad',
        IconCategoryName: "Fontisto",
        IconName: "mobile",
    },
    {
        field: 'department',
        label: 'Department',
        keyboardType: 'default',
        IconCategoryName: "FontAwesome6",
        IconName: "building-columns",
    },
    {
        field: 'combine',
        label: 'Combine',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "lock",
        readOnly: true,
    },
    {
        field: 'shoe_size',
        label: 'Shoe Size',
        keyboardType: 'phone-pad',
        IconCategoryName: "FontAwesome5",
        IconName: "shoe-prints",
    },
    {
        field: 'aadhar',
        label: 'Aadhar',
        keyboardType: 'phone-pad',
        IconCategoryName: "Entypo",
        IconName: "user",
    },
    {
        field: 'address',
        label: 'Address',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "address",
    },
    {
        field: 'isLeft',
        label: 'LEFT',
        keyboardType: 'default',
        IconCategoryName: "FontAwesome6",
        IconName: "arrows-up-down-left-right",
    }
]





export const getInitialStateForUpdate = (item = {}) => ({
    sr_no: item.sr_no || "N/A",
    name: item.name || "N/A",
    locker_no: item.locker_no || "N/A",
    unit: item.unit || "N/A",
    code: item.code || "N/A",
    location: item.location || "N/A",
    role: item.role || "N/A",
    status: item.status || "N/A",
    mobile: item.mobile ? String(item.mobile) : "N/A",
    department: item.department || "N/A",
    combine: item.combine || "N/A",
    shoe_size: item.shoe_size ? String(item.shoe_size) : "N/A",
    aadhar: item.aadhar ? String(item.aadhar) : "N/A",
    address: item.address ? item.address : "N/A",
    isLeft: typeof item.isLeft === "boolean" ? String(item.isLeft) : "N/A",
});


export const reducerForUpdate = (state, action) => {
    switch (action.type) {
        case 'SET_INPUT':
            return { ...state, [action.field]: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};


export const adminInputDataForUpdate = [
    {
        field: 'sr_no',
        label: 'Sr No',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "list",
        readOnly: true,

    },
    {
        field: 'name',
        label: 'Name',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },
    {
        field: 'locker_no',
        label: 'Locker No',
        keyboardType: 'phone-pad',
        IconCategoryName: "Entypo",
        IconName: "lock",
        readOnly: true,
    },
    {
        field: 'code',
        label: 'Code',
        keyboardType: 'phone-pad',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "view-sequential",
    },
    {
        field: 'before',
        label: 'Before',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "lock",
    },
    {
        field: 'status',
        label: 'Status',
        keyboardType: 'default',
        IconCategoryName: "MaterialIcons",
        IconName: "signal-wifi-statusbar-4-bar",

    },
    {
        field: 'mobile',
        label: 'Mobile',
        keyboardType: 'phone-pad',
        IconCategoryName: "Fontisto",
        IconName: "mobile",
    },
    {
        field: 'department',
        label: 'Department',
        keyboardType: 'default',
        IconCategoryName: "FontAwesome6",
        IconName: "building-columns",
    },
    {
        field: 'shoe_size',
        label: 'Shoe Size',
        keyboardType: 'phone-pad',
        IconCategoryName: "FontAwesome5",
        IconName: "shoe-prints",
    },
    {
        field: 'isLeft',
        label: 'LEFT',
        keyboardType: 'default',
        IconCategoryName: "FontAwesome6",
        IconName: "arrows-up-down-left-right",
    }
]


export const adminInitialStateForUpdate = (item = {}) => ({
    sr_no: item?.sr_no || "N/A",
    name: item?.name || "N/A",
    locker_no: item?.locker_no || "N/A",
    code: item?.code || "N/A",
    before: item?.before || "N/A",
    status: item?.status || "N/A",
    mobile: item?.mobile ? String(item.mobile) : "N/A",
    department: item?.department || "N/A",
    shoe_size: item?.shoe_size ? String(item.shoe_size) : "N/A",
    isLeft: typeof item?.isLeft === "boolean" ? String(item?.isLeft) : "N/A",
});





export const getInitialStateCreateGoggle = (item = {}) => ({
    name: "",
    emp_code: "",
    employer: "",
    department: "",
    issue_quantity: "",
});

export const InputGoggle = [

    {
        place: "name",
        field: 'name',
        label: 'Name',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },

    {
        place: "emp_code",
        field: 'emp_code',
        label: 'Code',
        keyboardType: 'phone-pad',
        IconCategoryName: "Octicons",
        IconName: "number",
    },
    {
        place: `NEEM NAPS TDS SSD CHAUDHARY LOREAL SIS`,
        field: 'employer',
        label: 'Employer',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },
    {
        place: `PACKING SECURITY UTILITY HOUSEKEEPING`,
        field: "department",
        label: 'Department',
        keyboardType: 'default',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "office-building-outline",
    },
    {
        place: "quantity",
        field: 'issue_quantity',
        label: 'Quantity',
        keyboardType: 'phone-pad',
        IconCategoryName: "Octicons",
        IconName: "number",
    },
]



export const InputShoe = [

    {
        place: "name",
        field: 'name',
        label: 'Name',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },

    {
        place: "emp_code",
        field: 'emp_code',
        label: 'Code',
        keyboardType: 'phone-pad',
        IconCategoryName: "Octicons",
        IconName: "number",
    },
    {
        place: `NEEM NAPS TDS SSD CHAUDHARY LOREAL SIS`,
        field: 'employer',
        label: 'Employer',
        keyboardType: 'default',
        IconCategoryName: "Entypo",
        IconName: "user",
    },
    {
        place: `PACKING SECURITY UTILITY HOUSEKEEPING`,
        field: "department",
        label: 'Department',
        keyboardType: 'default',
        IconCategoryName: "MaterialCommunityIcons",
        IconName: "office-building-outline",
    },
    {
        place: "quantity",
        field: 'issue_quantity',
        label: 'Quantity',
        keyboardType: 'phone-pad',
        IconCategoryName: "Octicons",
        IconName: "number",
    },
    ,
    {
        place: "shoe_size",
        field: 'shoe_size',
        label: 'shoe_size',
        keyboardType: 'phone-pad',
        IconCategoryName: "Octicons",
        IconName: "number",
    },
    ,
    {
        place: "mobile",
        field: 'mobile',
        label: 'mobile',
        keyboardType: 'phone-pad',
        IconCategoryName: "Octicons",
        IconName: "number",
    },
]


export const getInitialStateCreateShoe = () => ({
    name: "",
    emp_code: "",
    employer: "",
    department: "",
    issue_quantity: "",
    mobile: "",
    shoe_size: "",
});