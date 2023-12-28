import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import PageLayout from './components/PageLayout/PageLayout';
import Roster from './components/Roster/Roster';
import DriverStrats from './components/DriverStrats/DriverStrats';
import NeighbourghoodGallery from './components/DriverStrats/NeighbourhoodGallery';
import GroupListing from './components/Groups/GroupListing';
import GroupDetails from './components/Groups/GroupDetails';
import MemberDetails from './components/Groups/MemberDetails';
import Calendar from './components/Calendar/Calendar';
import WarInfo from './components/War/War';
import Hacking from './components/Hacking/Hacking';
import DriverStratGallery from './components/DriverStrats/DriverStratGallery';
import InformationCenter from './components/InformationCenter/InformationCenter';
import Hierarchy from './components/InformationCenter/Hierarchy/Hierarchy';
import Rules from './components/InformationCenter/Rules/Rules';
import Taxes from './components/InformationCenter/Taxes/Taxes';
import LocationsOfInterest from './components/InformationCenter/LocationsOfInterest/LocationsOfInterest';
import JobListing from './components/Jobs/JobListing';
import JobPicker from './components/Jobs/JobPicker';
import Jobs from './components/InformationCenter/Jobs/Jobs';
import Radios from './components/Radios/Radios';
import PublicLore from './components/PublicLore/PublicLore';
import Lore from './components/InformationCenter/Lore/Lore';
import Assets from './components/InformationCenter/Assets/Assets';
import HackingPractice from './components/HackingPractice/HackingPractice';
import VangieGuide from './components/Jobs/Guides/VangieGuide';
import Inventory from './components/Inventory/Inventory';
import Statistics from './components/Statistics/Statistics';
import Drugs from './components/InformationCenter/Drugs/Drugs';
import BlackMarkets from './components/InformationCenter/BlackMarkets/BlackMarkets';
import MembersListing from './components/Groups/MembersListing';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/notfound' element={<NotFound />} />
          <Route path='/public/lore' element={<PublicLore />} />
          <Route element={<ProtectedRoute><PageLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />}></Route>
            <Route path='/profile' element={<Profile />} />
            <Route path='/roster' element={<Roster />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/war' element={<WarInfo />} />
            <Route path='/information-center' element={<InformationCenter />} />
            <Route path='/information-center/hierarchy' element={<Hierarchy />} />
            <Route path='/information-center/rules' element={<Rules />} />
            <Route path='/information-center/taxes' element={<Taxes />} />
            <Route path='/information-center/locations' element={<LocationsOfInterest />} />
            <Route path='/information-center/lore' element={<Lore />} />
            <Route path='/information-center/assets' element={<Assets />} />
            <Route path='/information-center/drugs' element={<Drugs />} />
            <Route path='/radios' element={<Radios />} />
            <Route path='/jobs' element={<JobListing />} />
            <Route path='/jobs/new' element={<JobPicker />} />
            <Route path='/information-center/jobs' element={<Jobs />} />

            <Route element={<ChainedRoute />}>
              <Route path='/driver-strats' element={<DriverStrats />} />
              <Route path='/driver-strats/all' element={<DriverStratGallery />} />
              <Route path='/driver-strats/:neighbourhood' element={<NeighbourghoodGallery />} />
              <Route path='/hacking' element={<Hacking />} />
              <Route path='/hacking/practice' element={<HackingPractice />} />
              <Route path='/information-center/jobs/vangelico' element={<VangieGuide />} />
              <Route path='/information-center/black-markets' element={<BlackMarkets />} />
              <Route path='/inventory' element={<Inventory />} />
            </Route>

            <Route element={<LeadRoute />}>
              <Route path='/groups' element={<GroupListing />} />
              <Route path='/groups/:groupId' element={<GroupDetails />} />
              <Route path='/members' element={<MembersListing />} />
              <Route path='/members/:memberId' element={<MemberDetails />} />
              <Route path='/statistics' element={<Statistics />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/notfound' />} />
        </Routes>
      </Router>
    </div>
  );
}

//@ts-ignore
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return !!user ? children : <Navigate to="/login" replace />;
};

//@ts-ignore
function LeadRoute() {
  const { access } = useAuth();
  return access.leadAccess ? <Outlet /> : <Navigate to="/" replace />;
};

//@ts-ignore
function ChainedRoute() {
  const { access } = useAuth();
  return access.chainedAccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default App;
