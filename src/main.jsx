
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'

import {

  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Routers from "./routers/Routers.jsx";
import ErrorPage from "./Errorpage/ErrorPage.jsx";
import Home from "./Home/Home.jsx";
import AddResearch from "./AddResearch/AddResearch.jsx";
import Blog from "./blog/Blog.jsx";
import BlogWriting from "./BlogWriting/BlogWriting.jsx";
import Contact from "./Contact/Contact.jsx";
import Achievement from "./Achievement/Achievement.jsx";
import Developers from "./Developers/Developers.jsx";
import Event from "./Event/Event.jsx";
import FAQ from "./FAQ/FAQ.jsx";
import Gallery from "./Gallery/Gallery.jsx";
import ResearchPapers from "./ResearchPapers/ResearchPapers.jsx";
import Toolkit from "./Toolkit/Toolkit.jsx";
import Volunteers from "./Volunteers/Volunteers.jsx";
import Webmaster from "./Webmaster/Webmaster.jsx";
import JoinIEEE from "./JoinIEEE/JoinIEEE.jsx";
import Megazine from "./Megazine/Megazine.jsx";
import News from "./News/News.jsx";
import Panel from "./Panel/Panel.jsx";
import Portal from "./Portal/Portal.jsx";
import ProgramCoordinator from "./ProgramCoordinator/ProgramCoordinator.jsx";
import SignIn from "./SignIn/SignIn.jsx";
import SignUp from "./SignUp/SignUp.jsx";
import AboutIEEE from "./IEEE/AboutIEEE.jsx";
import JoinUs from "./JoinUS/JoinUs.jsx";
import PublicationNewsletter from './PublicationNewsletter/PublicationNewsletter';
import PublicityCoordinator from './PublicityCoordinator/PublicityCoordinator';
import ChiefReportingExecutive from './Chief Reporting Executive/ChiefReportingExecutive';
import PhotographyExecutive from './Photography Executive/PhotographyExecutive';
import LogisticExecutive from './Logistic Executive/LogisticExecutive';
import ACM from './ACM coordinator/ACM';
import MembershipDevelopment from './MembershipDevelopment/MembershipDevelopment';
import GraphicsDesign from './Graphic design executive/GraphicsDesign';
import VideoContent from './Video Content Executive/VideoContent';
import IEERegion10 from "./IEEE/IEERegion10.jsx";
import IEEELU from "./IEEE/IEEELU.jsx";
import IEEEBangladesh from "./IEEE/IEEEBangladesh.jsx";
import SingleNews from "./News/SingleNews.jsx";
import UserPage from "./UserPage/UserPage.jsx";
import MembersPage from "./Members/MembersPage.jsx";
import AdvisorPanel from "./Members/AdvisorPanel.jsx";
import Excom from "./Members/Excom.jsx";
import Committee from "./Members/Committee.jsx";
import SingleMegazine from "./Megazine/SingleMegazine.jsx";
import SingleResearchPaper from "./ResearchPapers/SingleResearchPaper.jsx";
import AddNews from "./News/AddNews.jsx";
import AddMegazine from "./Megazine/AddMegazine.jsx";
import SingleBlog from "./blog/SingleBlog.jsx";
import AddEvent from "./Event/AddEvent.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AddGallery from "./Gallery/AddGallery.jsx";
import UpdateNews from "./News/UpdateNews.jsx";
import UpdateMegazine from "./Megazine/UpdateMegazine.jsx";
import UpdateEvent from "./Event/UpdateEvent.jsx";
import UpdateGallery from "./Gallery/UpdateGallery.jsx";
import UpdateResearch from "./AddResearch/UpdateResearch.jsx";
import UpdateBlog from "./BlogWriting/UpdateBlog.jsx";
import ExExCom from "./Members/ExExCom.jsx";
import AddExperience from "./Dashboard/AddExperience.jsx";
import UploadUserPic from "./UserPage/UploadUserPic.jsx";
import Messages from "./Dashboard/Messages.jsx";
import Assign from "./Dashboard/Assign.jsx";
import { useUser } from "../hooks/useUser.jsx";
import AddAcheivement from "./Dashboard/AddAchievement.jsx";
import AddBanner from "./Dashboard/addBanner.jsx";
import { PrivateRoute } from "./privateRoute/privateRoute.jsx";
import ReplayEmail from "./Dashboard/replayEmail.jsx";
import MemberDetails from "./Members/memDetail.jsx";
import { Addlinks } from "./UserPage/addlinks.jsx";
import {PasswordReset} from './UserPage/resetPassword.jsx'
import OtpVerify from './SignIn/otpVerification.jsx'
import ForgotPassword from './SignIn/forgotPassword.jsx'
import { AdminRoute } from "./adminRoute/adminRoute.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Routers></Routers>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: '/addResearch',
        element: <PrivateRoute>
          <AddResearch></AddResearch>
          </PrivateRoute>
          
      },

      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/write',
        element: <PrivateRoute>
          <BlogWriting></BlogWriting>
          </PrivateRoute>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/achievement',
        element: <Achievement></Achievement>
      },
      {
        path: '/developers',
        element: <Developers></Developers>
      },
      {
        path: '/event',
        element: <Event></Event>
      },
      {
        path: '/faq',
        element: <FAQ></FAQ>
      },
      {
        path: '/gallery',
        element: <Gallery></Gallery>
      },

      {
        path: '/researchPapers',
        element: <ResearchPapers></ResearchPapers>
      },
      {
        path: '/toolkit',
        element: <Toolkit></Toolkit>
      },
      {
        path: '/volunteers',
        element: <Volunteers></Volunteers>
      },
      {
        path: '/webmaster',
        element: <Webmaster></Webmaster>
      },
      {
        path: '/joinIEEE',
        element: <JoinIEEE></JoinIEEE>
      },
      {
        path: '/megazine',
        element: <Megazine></Megazine>
      },
      {
        path: '/news',
        element: <News></News>
      },
      {
        path: '/panel',
        element: <Panel></Panel>
      },
      {
        path: '/programCoordinator',
        element: <ProgramCoordinator></ProgramCoordinator>
      },
      // {
      //   path: '/IEEE',
      //   element: <AboutIEEE></AboutIEEE>
      // },
      {
        path: '/join',
        element: <JoinUs></JoinUs>
      },
      {
        path: '/publication-newsletter-coordinator',
        element: <PublicationNewsletter></PublicationNewsletter>
      },
      {
        path: '/publicity-coordinator',
        element: <PublicityCoordinator></PublicityCoordinator>
      },
      {
        path: '/chief-reporting-executive',
        element: <ChiefReportingExecutive></ChiefReportingExecutive>
      },
      {
        path: '/photography-executive',
        element: <PhotographyExecutive></PhotographyExecutive>
      },
      {
        path: '/logistic-executive',
        element: <LogisticExecutive></LogisticExecutive>
      },
      {
        path: '/acm-coordinator',
        element: <ACM></ACM>
      },
      {
        path: '/membership-development-coordinator',
        element: <MembershipDevelopment></MembershipDevelopment>
      },
      {
        path: '/membership-development-coordinator',
        element: <MembershipDevelopment></MembershipDevelopment>
      },
      {
        path: '/webmaster',
        element: <Webmaster></Webmaster>
      },

      {
        path: '/graphics-design-executive',
        element: <GraphicsDesign></GraphicsDesign>
      },
      {
        path: '/video-content-executive',
        element: <VideoContent></VideoContent>
      },
      // {
      //   path: '/IEEE-REGION-10',
      //   element: <IEERegion10></IEERegion10>
      // },
      // {
      //   path: '/IEEE-REGION-10',
      //   element: <IEERegion10></IEERegion10>
      // },
      {
        path: '/IEEE-LU-BRANCH',
        element: <IEEELU></IEEELU>
      },
      // {
      //   path: '/IEEE-Bangladesh-section',
      //   element: <IEEEBangladesh></IEEEBangladesh>
      // },
      {
        path: '/news/:id',
        element: <PrivateRoute>
          <SingleNews />
          </PrivateRoute>
      },
      {
        path: '/blogs/:id',
        element: <PrivateRoute><SingleBlog /></PrivateRoute>
      },
      {
        path: '/membersPage',
        element: <MembersPage></MembersPage>
      },
      {
        path: '/members/advisorPanel',
        element: <AdvisorPanel></AdvisorPanel>
      },
      {
        path: '/members/excom',
        element: <Excom></Excom>
      },
      {
        path: '/members/committee',
        element: <Committee></Committee>
      },
      {
        path: '/members/exexcom',
        element: <ExExCom></ExExCom>
      },
      {
        path: '/members/developers',
        element: <Developers></Developers>
      },
      {
        path: '/members/volunteers',
        element: <Volunteers></Volunteers>
      },
      {
        path: '/megazine/:id',
        element: <PrivateRoute>
          <SingleMegazine />
          </PrivateRoute>
      },
      {
        path: '/paper/:id',
        element: <PrivateRoute>
          <SingleResearchPaper />
          </PrivateRoute>
      },
      {
        path: '/addNews',
        element: <AdminRoute>
          <AddNews></AddNews>
          </AdminRoute>
      },
      {
        path: '/addMegazine',
        element: <AdminRoute>
          <AddMegazine></AddMegazine>
          </AdminRoute>
      },
      {
        path: '/addEvent',
        element: <AdminRoute>
          <AddEvent></AddEvent>
          </AdminRoute>
      },
      {
        path: '/addGallery',
        element: <AdminRoute>
          <AddGallery></AddGallery>
          </AdminRoute>
      },
      {
        path: '/updateNews',
        element: <AdminRoute>
          <UpdateNews></UpdateNews>
          </AdminRoute>
      },
      {
        path: '/updateMegazine',
        element: <AdminRoute>
          <UpdateMegazine></UpdateMegazine>
          </AdminRoute>
      },
      {
        path: '/updateEvent',
        element: <AdminRoute>
          <UpdateEvent></UpdateEvent>
          </AdminRoute>
      },
      {
        path: '/updateGallery',
        element: <AdminRoute>
          <UpdateGallery></UpdateGallery>
          </AdminRoute>
      },
      {
        path: '/updateResearch',
        element: <AdminRoute>
          <UpdateResearch></UpdateResearch>
          </AdminRoute>
      },
      {
        path: '/addBanner',
        element: <AdminRoute>
          <AddBanner />
          </AdminRoute>
      }

    ]


  },
  {
    path: '/portal',
    element: <Portal></Portal>
  },
  {
    path: '/signin',
    element: <SignIn></SignIn>
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    path:'/reset',
    element:
    <PrivateRoute>
    <PasswordReset />
    </PrivateRoute>
  },
  {
    path:'/forgot',
    element:<PrivateRoute>
      <ForgotPassword />
      </PrivateRoute>
  },
  {
    path: '/user',
    element: <PrivateRoute>
      <UserPage></UserPage>
      </PrivateRoute>
  },
  {
    path:'/addlinks',
    element:<PrivateRoute>
      <Addlinks />
      </PrivateRoute>
  },
  {
    path:'/verify-otp',
    element:<PrivateRoute>
    <OtpVerify />
    </PrivateRoute>
  },
  {
    path:'/details',
    element:<MemberDetails />
  },
  {
    path: '/uploadUserImg',
    element: <PrivateRoute>
      <UploadUserPic></UploadUserPic>
      </PrivateRoute>
  },
  {
    path:'/replyEmail',
    element:<AdminRoute>
      <ReplayEmail />
      </AdminRoute>
  },
  {
    path: '/dashboard',
    element: <AdminRoute>
      <Dashboard></Dashboard>
      </AdminRoute>
  },
  {
    path: '/addExperience',
    element: <AdminRoute>
      <AddExperience></AddExperience>
      </AdminRoute>
  },
  {
    path: '/addAcheivement',
    element: <PrivateRoute>
      <AddAcheivement></AddAcheivement>
      </PrivateRoute>
  },
  {
    path: '/updateBlog',
    element: <AdminRoute>
      <UpdateBlog></UpdateBlog>
      </AdminRoute>
  },
  {
    path: '/messages',
    element: <AdminRoute>
      <Messages></Messages>
      </AdminRoute>
  },
  // {
  //   path: '/assign',
  //   element: <Assign></Assign>
  // },



]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);