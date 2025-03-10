import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../pages/Navbarpage';
import Navbar1 from '../components/Navbar1';
import Footerpage from '../pages/Footerpage';
import Homepage from '../pages/Homepage';
import Homepage1 from '../pages/Homepage1';
import About from '../pages/Aboutpage';
import About1page from '../pages/About1page';
import Services from '../pages/Servicespage';
import Services1page from '../pages/Services1page';
import Projects from '../pages/Projectspage';
import Loginpage from '../pages/Loginpage';
import Signuppage from '../pages/Signuppage';
import Forgotpasswordpage from '../pages/Forgotpasswordpage';
import Realtimelocationpage from '../pages/Realtimelocationpage';
import Communitysupportpage from '../pages/Communitysupportpage';
import Comspage from '../pages/Comspage';
import Educationalresourcespage from '../pages/Educationalresourcespage';
import Saferoutespage from '../pages/Saferoutespage';
import Anonymousreportingpage from '../pages/Anonymousreportingpage';
import Anoreppage from '../pages/Anoreppage';
import Customizablesettingspage from '../pages/Customizablesettingspage';
import Adminloginpage from '../pages/Adminloginpage';
import Admindashboardpage from '../pages/Admindashboardpage';
import Userlistpage from '../pages/Userlistpage';
import Signallistpage from '../pages/Signallistpage';
import Supportlistpage from '../pages/Supportlistpage';
import Reportslistpage from '../pages/Reportslistpage';
import Addedurespage from '../pages/Addedurespage';
import Viewedurespage from '../pages/Viewedurespage';
import Notificationpage from '../pages/Notificationpage';

function Index() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<><Navbar /><Homepage /><Footerpage /></>} />
        <Route path='/about' element={<><Navbar /><About /><Footerpage /></>} />
        <Route path='/projects' element={<><Navbar /><Projects /><Footerpage /></>} />
        <Route path='/services' element={<><Navbar /><Services /><Footerpage /></>} />
        <Route path='/login' element={<><Navbar /><Loginpage /><Footerpage /></>} />
        <Route path='/signup' element={<><Navbar /><Signuppage /><Footerpage /></>} />
        <Route path='/forgot-password' element={<><Navbar /><Forgotpasswordpage /><Footerpage /></>} />
        <Route path='/homepage' element={<><Navbar1 /><Homepage1 /><Footerpage /></>} />
        <Route path='/about1' element={<><Navbar1 /><About1page /><Footerpage /></>} />
        <Route path='/services1' element={<><Navbar1 /><Services1page /><Footerpage /></>} />
        <Route path='/rtloc' element={<><Navbar1 /><Realtimelocationpage /><Footerpage /></>} />
        <Route path='/coms' element={<><Navbar1 /><Communitysupportpage /><Footerpage /></>} />
        <Route path='/comsview' element={<><Navbar1 /><Comspage /><Footerpage /></>} />
        <Route path='/edures' element={<><Navbar1 /><Educationalresourcespage /><Footerpage /></>} />
        <Route path='/saferoutes' element={<><Navbar1 /><Saferoutespage /><Footerpage /></>} />
        <Route path='/anorep' element={<><Navbar1 /><Anonymousreportingpage /><Footerpage /></>} />
        <Route path='/anorepview' element={<><Navbar1 /><Anoreppage /><Footerpage /></>} />
        <Route path='/cusset' element={<><Navbar1 /><Customizablesettingspage /><Footerpage /></>} />
        <Route path='/notification' element={<><Navbar1 /><Notificationpage /><Footerpage /></>} />

        {/* Admin Routes */}
        <Route path='/admin/admin-login' element={<Adminloginpage />} />
        <Route path='/admin/admin-dashboard' element={<Admindashboardpage />} />
        <Route path='/admin/userlist' element={<Userlistpage />} />
        <Route path='/admin/signallist' element={<Signallistpage />} />
        <Route path='/admin/supportlist' element={<Supportlistpage />} />
        <Route path='/admin/reportslist' element={<Reportslistpage />} />
        <Route path='/admin/addedures' element={<Addedurespage />} />
        <Route path='/admin/viewedures' element={<Viewedurespage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Index;
