import BottomTabNavigator from "../../navigator/BottomTab/Navigator/BottomTabNavigator";
import AdminLocker from "../../Screen/AdminLocker/AdminLocker";
import PreAdmin from "../../Screen/AdminLocker/preAdmin/PreAdmin";
import AdminSearch from "../../Screen/AdminSearch/AdminSearch";
import AdminHome from "../../Screen/Auth/Admin/AdminHome/AdminHome";
import AdminLogin from "../../Screen/Auth/Admin/Login/AdminLogin";
import AdminSignup from "../../Screen/Auth/Admin/Signup/AdminSignup";
import Login from "../../Screen/Auth/Login/Login";
import Otp from "../../Screen/Auth/opt/Otp";
import Signup from "../../Screen/Auth/Signup/Signup";
import CreateGoggle from "../../Screen/CreateGoggle/CreateGoggle";
import CreateShoe from "../../Screen/CreateShoe/CreateShoe";
import GenericDetailScreen from "../../Screen/GenericDetailScreen/GenericDetailScreen";
import GoggleDetail from "../../Screen/GoggleDetail/GoggleDetail";
import Home from "../../Screen/Home/Home";
import PreLocker from "../../Screen/preLocker/PreLocker";
import SearchLocker from "../../Screen/SearchLocker";
import ShoeDetail from "../../Screen/ShoeDetail/ShoeDetail";
import Splass from "../../Screen/Splass/Splass";
import AdminUpdate from "../../Screen/update/adminUpdate/AdminUpdate";
import UpdateLocker from "../../Screen/update/UpdateLocker";

const allScreen = [
    {
        name: "Splass",
        component: Splass
    },
    {
        name: "BottomTabNavigator",
        component: BottomTabNavigator
    },
    {
        name: "AdminHome",
        component: AdminHome
    },
    {
        name: "AdminLogin",
        component: AdminLogin
    },
    {
        name: "AdminSignup",
        component: AdminSignup
    },
    {
        name: "Login",
        component: Login
    },
    {
        name: "Otp",
        component: Otp
    },
    {
        name: "Signup",
        component: Signup
    },
    {
        name: "UpdateLocker",
        component: UpdateLocker
    },
    {
        name: "SearchLocker",
        component: SearchLocker
    },
    {
        name: "AdminUpdate",
        component: AdminUpdate
    },
    {
        name: "PreAdmin",
        component: PreAdmin
    },
    {
        name: "AdminSearch",
        component: AdminSearch
    },
    {
        name: "CreateGoggle",
        component: CreateGoggle
    },
    {
        name: "CreateShoe",
        component: CreateShoe
    },
    {
        name: "GenericDetailScreen",
        component: GenericDetailScreen
    }
];

export const BottomScreen = [
    {
        name: "Home",
        component: Home,
        icon: "home",
        iconCategory: "Octicons"
    },
    {
        name: "PreLocker",
        component: PreLocker,
        icon: "locker-multiple",
        iconCategory: "MaterialCommunityIcons"
    },
    {
        name: "AdminLocker",
        component: AdminLocker,
        icon: "admin-panel-settings",
        iconCategory: "MaterialIcons"
    },
    {
        name: "GoggleDetail",
        component: GoggleDetail,
        icon: "safety-goggles",
        iconCategory: "MaterialCommunityIcons"
    },
    {
        name: "ShoeDetail",
        component: ShoeDetail,
        icon: "shoe-sneaker",
        iconCategory: "MaterialCommunityIcons"
    }
];

export default allScreen;
