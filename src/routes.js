import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdApps,
  MdAccountCircle,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import Applications from "views/admin/applications";
import Users from "views/admin/users";
import NewUser from "views/admin/users/new-user";

import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import NewApplication from "views/admin/applications/new-application";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
  {
    name: "Applications",
    layout: "/admin",
    path: "/apps",
    icon: <Icon as={MdApps} width='20px' height='20px' color='inherit' />,
    component: Applications,
    children: [
      {
        name: "New Application",
        layout: "/admin",
        path: "/apps/new-application",
        component: NewApplication,
      }
    ]
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdAccountCircle} width='20px' height='20px' color='inherit' />,
    component: Users,
    children: [
      {
        name: "New User",
        layout: "/admin",
        path: "/users/new-user",
        component: NewUser,
      }
    ]
  }
];

export default routes;
