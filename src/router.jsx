import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./views/admin/Home";
import Pricing from "./views/Pricing";
import MenteeLayout from "./layout/MenteeLayout";
import MentorLayout from "./layout/MentorLayout";
import ClientLayout from "./layout/ClientLayout";
import ClientSignup from "./views/client/ClientSignup";
import ClientSignin from "./views/client/ClientSignin";
import OnboardOne from "./views/client/OnboardOne";
import OnboardTwo from "./views/client/OnboardThree";
import OnboardThree from "./views/client/OnboardTwo";
import OnboardFour from "./views/client/OnboardFour";
import ClientDashboard from "./views/client/ClientDashboard";
import GeneralSignup from "./views/GeneralSignup";
import GeneralSignin from "./views/GeneralSignin";
import ClientLanding from "./views/client/ClientLanding";
import ClientOtp from "./views/client/ClientOtp";
import ClientUsers from "./views/client/ClientMentor";
import ClientMentee from "./views/client/ClientMentee";
import ClientAccount from "./views/client/ClientAccount";
import ClientAccountTwo from "./views/workspace/ClientAccountTwo";
import PricingStageOne from "./views/PricingStageOne";
import PricingStageTwo from "./views/PricingStageTwo";
import PricingStageThree from "./views/PricingStageThree";
import CreateWorkspaceOne from "./views/client/CreateWorkspaceOne";
import MentorSignin from "./views/mentor/MentorSignin";
import MentorSignup from "./views/mentor/MentorSignup";
import MenteeSignin from "./views/mentee/MenteeSignin";
import MenteeSignup from "./views/mentee/MenteeSignup";
import MentorDashboard from "./views/mentor/MentorDashboard";
import MenteeDashboard from "./views/mentee/MenteeDashboard";
import MentorProfile from "./views/mentor/MentorProfile";
import MenteeProfile from "./views/mentee/MenteeProfile";
import MenteeMatches from "./views/mentee/MenteeMatches";
import MentorMaches from "./views/mentor/MentorMaches";
import MentorMessages from "./views/mentor/MentorMessages";
import MenteeMessages from "./views/mentee/MenteeMessages";
import CreateWorkspaceTwo from "./views/client/CreateWorkspaceTwo";
import ListWorkspace from "./views/client/ListWorkspace";
import NotFound from "./views/NotFound";
import Welcome from "./views/client/Welcome";
import UserOnboardOne from "./views/usersOnboard/UserOnboardOne";
import UserOnboardTwo from "./views/usersOnboard/UserOnboardTwo";
import UserOnboardThree from "./views/usersOnboard/UserOnboardThree";
import ClientWorkspace from "./views/workspace/ClientWorkspace";
import Invoice from "./component/invoice/Invoice";
import ClientMentorProfile from "./views/client/ClientMentorProfile";
import ClientForgotten from "./views/client/ClientForgotPassword";
import ClientRequestNewPassword from "./views/client/ClientRequestNewPassword";
import UserOnboardFour from "./views/usersOnboard/UserOnboardFour";
import Success from "./component/successful/Success";
import OtpVerification from "./views/OtpVerification";
import UserPricingEmail from "./views/UserPricingEmail";
import UserPricingOtp from "./views/UserPricingOtp";
import MentorOtp from "./views/mentor/MentorOtp";
import MenteeOtp from "./views/mentee/MenteeOtp";
import MenteeRequests from "./views/mentee/MenteeRequests";
import MentorRequests from "./views/mentor/MentorRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/workspace-landing/:id",
        element: <ClientLanding />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/register",
        element: <ClientSignup />,
      },
      {
        path: "/general-signup/:id",
        element: <GeneralSignup />,
      },
      {
        path: "/general-signin/:id",
        element: <GeneralSignin />,
      },
      {
        path: "/pricing-stage-1",
        element: <PricingStageOne />,
      },
      {
        path: "/pricing-stage-2",
        element: <PricingStageTwo />,
      },
      {
        path: "/pricing-stage-3",
        element: <PricingStageThree />,
      },
      {
        path: "/create-workspace",
        element: <CreateWorkspaceOne />,
      },
      {
        path: "/create-workspace-2",
        element: <CreateWorkspaceTwo />,
      },
      {
        path: "/signin",
        element: <ClientSignin />,
      },
      {
        path: "/otpverification",
        element: <OtpVerification />,
      },
      {
        path: "/anonym/forgot-password/",
        element: <ClientForgotten />
      },
      {
        path: "/anonym/request-change-password",
        element: <ClientRequestNewPassword />
      },
      {
        path: "/mentor-signin/:id",
        element: <MentorSignin />,
      },
      {
        path: "/mentee-signin/:id",
        element: <MenteeSignin />,
      },
      {
        path: "/mentee-otp/:id",
        element: <MenteeOtp />,
      },
      {
        path: "/mentor-signup/:id",
        element: <MentorSignup />,
      },
      {
        path: "/mentor-otp/:id",
        element: <MentorOtp />,
      },
      {
        path: "/mentee-signup/:id",
        element: <MenteeSignup />,
      },
      {
        path: "/user-onboard-1/:id",
        element: <UserOnboardOne />,
      },
      {
        path: "/user-onboard-2/:id",
        element: <UserOnboardTwo />,
      },
      {
        path: "/user-onboard-3/:id",
        element: <UserOnboardThree />,
      },
      {
        path: "/user-onboard/:id",
        element: <UserOnboardFour />,
      },
      {
        path: "/otp",
        element: <ClientOtp />,
      },
      {
        path: "/onboard-1",
        element: <OnboardOne />,
      },
      {
        path: "/onboard-2",
        element: <OnboardTwo />,
      },
      {
        path: "/onboard-3",
        element: <OnboardThree />,
      },
      {
        path: "/onboard-4",
        element: <OnboardFour />,
      },
      {
        path: "/landing",
        element: <ClientLanding />,
      },
      {
        path: "/user-email",
        element: <UserPricingEmail />,
      },
      {
        path: "/user-otp",
        element: <UserPricingOtp />,
      },
      {
        path: "/user-otp",
        element: <UserPricingOtp />,
      },

     
    ],
  },

  {
    path: "/",
    element: <MenteeLayout />,
    children: [
      {
        path: "/mentee-dashboard",
        element: <MenteeDashboard />,
      },
      {
        path: "/mentee-profile",
        element: <MenteeProfile />,
      },
      {
        path: "/mentee-matches",
        element: <MenteeMatches />,
      },
     
      {
        path: "/mentee-connection",
        element: <MenteeMessages />,
      },
      {
        path: "/mentee-requests",
        element: <MenteeRequests />,
      },
    ],
  },

  {
    path: "/",
    element: <MentorLayout />,
    children: [
      {
        path: "/mentor-dashboard",
        element: <MentorDashboard />,
      },
      {
        path: "/mentor-profile",
        element: <MentorProfile />,
      },
      {
        path: "/mentor-matches",
        element: <MentorMaches />,
      },
      {
        path: "/mentor-connection",
        element: <MentorMessages />,
      },
      {
        path: "/mentor-requests",
        element: <MentorRequests />,
      },
     
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/workspace-landing",
        element: <ClientLanding />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/mentors",
        element: <ClientUsers />,
      },
      {
        path: "/mentees",
        element: <ClientMentee />,
      },
      {
        path: "/workspace",
        element: <ClientWorkspace />,
      },
      {
        path: "/account",
        element: <ClientAccount />,
      },
      {
        path: "/accountTwo",
        element: <ClientAccountTwo />,
      },
      {
        path: "/dashboard",
        element: <ClientDashboard />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/list-workspace",
        element: <ListWorkspace />,
      },
      {
        path: "/mentor-account/:id",
        element: <ClientMentorProfile />
      },
      {
        path: "/mentee-account/:id",
        element: <ClientMentorProfile />
      },
      // 
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

export default router;
// linked same component for mentee mentor account page