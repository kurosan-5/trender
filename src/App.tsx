import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import Auth from './components/auth/Auth';
import SignUpPage from './components/auth/Signup';
import SignIn from './components/auth/Signin';
import { ResetPassword } from './components/auth/ResetPass';
import { SendEmail } from './components/auth/SendEmail';
import { AlertProvider } from './context/AlertContext';
import ShowAlert from './components/ShowAlert';
import { useSelector, shallowEqual } from 'react-redux';
import { reducerUser } from './redux/auth/authType';
import Home from './components/map/Home';
import ResponsiveAppBar from './components/AppBar';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const user = useSelector((state: reducerUser) => state.auth.user, shallowEqual);

  useEffect(() => {

    const middleware = () => {
      if (user === null) {
        if(path == "/auth"){
          navigate('/auth')
          return
        }
        else if (path == "/auth/signup") {
          //ログインしていないがパスが/signup
          navigate('/auth/signup')
          return
        }
        else if (path == "/auth/signup/sendEmail") {
          navigate('/auth/signup/sendEmail')
          return
        }
        else if (path == "/auth/signin/resetPassword") {
          navigate('/auth/signin/resetPassword')
          return
        } 
        else if (path == '/') {
          navigate('/');
          return
        }
        //ログインしていないときに/signinと/signup以外のurlはログインフォームに飛ばす
        navigate('/auth')
      } else if (path == "/auth/signin" || path == "/auth/signup" || path == '/auth'|| path == '/') {
        //ログインしている時にログイン・登録フォームを出さない
        navigate("/home");
      }
    };

    // ログイン状態をチェック
    middleware();
  }, [navigate]);

  return (
    <>
      <AlertProvider>
        <ThemeProvider theme={theme}>
        <ShowAlert />
        <div style={{marginTop:80, width:'100%', height:'100%'}}>
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/auth/signup' element={<SignUpPage />} />
            <Route path='/auth/signin' element={<SignIn />} />
            <Route path='/auth/signin/resetPassword' element={<ResetPassword />} />
            <Route path='/auth/signup/sendEmail' element={<SendEmail />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
        </ThemeProvider>
      </AlertProvider>
    </>
  )
}


export default App
