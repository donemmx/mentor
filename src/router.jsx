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
import ClientUsers from "./views/client/ClientMentor";
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
import NotFound from "./views/NotFound";
import Welcome from "./views/client/Welcome";
import UserOnboardOne from "./views/usersOnboard/UserOnboardOne";
import UserOnboardTwo from "./views/usersOnboard/UserOnboardTwo";
import UserOnboardThree from "./views/usersOnboard/UserOnboardThree";

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
        path: "/mentor-signin/:id",
        element: <MentorSignin />,
      },
      {
        path: "/mentee-signin/:id",
        element: <MenteeSignin />,
      },
      {
        path: "/mentor-signup/:id",
        element: <MentorSignup />,
      },
      {
        path: "/mentee-signup/:id",
        element: <MenteeSignup />,
      },
      {
        path: "/user-onboard/:id",
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
        path: "/mentee-message",
        element: <MenteeMessages />,
      },
      {
        path: "/mentee-dashboard",
        element: <MenteeDashboard />,
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
        path: "/mentor-message",
        element: <MentorMessages />,
      },
      {
        path: "/mentor-dashboard",
        element: <MentorDashboard />,
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
        path: "/dashboard",
        element: <ClientDashboard />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/list-workspace",
        element: <ListWorkspace />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

export default router;
