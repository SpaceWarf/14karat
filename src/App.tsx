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
import StashSearch from './components/StashSearch/StashSearch';
import GroupListing from './components/Groups/GroupListing';
import GroupDetails from './components/Groups/GroupDetails';
import MemberDetails from './components/Groups/MemberDetails';
import Calendar from './components/Calendar/Calendar';
import War from './components/War/War';
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
            <Route path='/driver-strats' element={<DriverStrats />} />
            <Route path='/driver-strats/all' element={<DriverStratGallery />} />
            <Route path='/driver-strats/:neighbourhood' element={<NeighbourghoodGallery />} />
            {/* <Route path='/stash-search' element={<StashSearch />} /> */}
            <Route path='/roster' element={<Roster />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/war' element={<War />} />
            <Route path='/information-center' element={<InformationCenter />} />
            <Route path='/information-center/hierarchy' element={<Hierarchy />} />
            <Route path='/information-center/rules' element={<Rules />} />
            <Route path='/information-center/taxes' element={<Taxes />} />
            <Route path='/information-center/locations' element={<LocationsOfInterest />} />
            <Route path='/information-center/lore' element={<Lore />} />
            <Route path='/information-center/assets' element={<Assets />} />
            <Route path='/radios' element={<Radios />} />

            <Route element={<ChainedRoute />}>
              <Route path='/hacking' element={<Hacking />} />
              <Route path='/hacking/practice' element={<HackingPractice />} />
              <Route path='/information-center/jobs' element={<Jobs />} />
              <Route path='/jobs' element={<JobListing />} />
              <Route path='/jobs/new' element={<JobPicker />} />
            </Route>

            <Route element={<HeadRoute />}>
              <Route path='/groups' element={<GroupListing />} />
              <Route path='/groups/:groupId' element={<GroupDetails />} />
              <Route path='/groups/:groupId/members/:memberId' element={<MemberDetails />} />
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
function HeadRoute() {
  const { access } = useAuth();
  return access.headAccess ? <Outlet /> : <Navigate to="/" replace />;
};

//@ts-ignore
function ChainedRoute() {
  const { access } = useAuth();
  return access.chainedAccess ? <Outlet /> : <Navigate to="/" replace />;
};

//@ts-ignore
function MemberRoute() {
  const { access } = useAuth();
  return access.memberAccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default App;
