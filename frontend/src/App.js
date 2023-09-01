import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Detail from './pages/detail/Detail';
import Signup from './pages/signup/Signup';
import SignupOtp from './pages/signup/SignupOtp';
import Login from './pages/login/Login';
import NotFound from './error-pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile">
            <Route path=":profileId" element={<Profile />} />
          </Route>
          <Route path="detail">
            <Route path=":detailId" element={<Detail />} />
          </Route>
        </Route>
        <Route path="signup">
          <Route index element={<Signup />} />
          <Route path='otp' element={<SignupOtp />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
