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
import OnboardTwo from "./views/client/OnboardTwo";
import OnboardThree from "./views/client/OnboardThree";
import OnboardFour from "./views/client/OnboardFour";
import ClientDashboard from "./views/client/ClientDashboard";
import GeneralSignup from "./views/GeneralSignup";
import GeneralSignin from "./views/GeneralSignin";
import ClientLanding from "./views/client/ClientLanding";
import ClientOtp from "./views/client/ClientOtp";
import ClientUsers from "./views/client/ClientUsers";
import ClientMentee from "./views/client/ClientMentee";
import ClientAccount from "./views/client/ClientAccount";
import ClientSetup from "./views/client/ClientSetup";
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
        path: "/workspace-landing",
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
        path: "/general-signup",
        element: <GeneralSignup />,
      },
      {
        path: "/general-signin",
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
        path: "/mentor-signin",
        element: <MentorSignin />,
      },
      {
        path: "/mentee-signin",
        element: <MenteeSignin />,
      },
      {
        path: "/mentor-signup",
        element: <MentorSignup />,
      },
      {
        path: "/mentee-signup",
        element: <MenteeSignup />,
      },
      {
        path: "/mentor-dashboard",
        element: <MentorDashboard />,
      },
      {
        path: "/mentee-dashboard",
        element: <MenteeDashboard />,
      },
      {
        path: "/mentor-profile",
        element: <MentorProfile />,
      },
      {
        path: "/mentee-profile",
        element: <MenteeProfile />,
      },
      {
        path: "/mentor-matches",
        element: <MentorMaches />,
      },
      {
        path: "/mentee-matches",
        element: <MenteeMatches />,
      },
      {
        path: "/mentor-message",
        element: <MentorMessages />,
      },
      {
        path: "/mentee-message",
        element: <MenteeMessages />,
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
        element: <ClientSetup />,
      },
      {
        path: "/account",
        element: <ClientAccount />,
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
        path: "/onboard-3",
        element: <OnboardTwo />,
      },
      {
        path: "/onboard-2",
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
        path: "/dashboard",
        element: <ClientDashboard />,
      },
      {
        path: "/list-workspace",
        element: <ListWorkspace />,
      },
    ],
  },

  {
    path: "/",
    element: <MenteeLayout />,
    children: [
    
    ],
  },
  {
    path: "/",
    element: <MentorLayout />,
    children: [
    
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
    
    ],
  },
]);

export default router;
