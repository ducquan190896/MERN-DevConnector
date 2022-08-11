import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './component/navbar'
import {Provider} from 'react-redux'
import store from './store'
import Login from './component/login'
import Register from './component/register'
import UpdateUser from './component/updateUser'
import Home from './component/home'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './component/UserProfile'
import Dashboard from './component/Dashboard'
import EducationForm from './component/EducationForm'
import ExperienceForm from './component/ExperienceForm'
import CreateProfileForm from './component/ProfileForm'
import EditProfileForm from './component/EditProfileForm'
import PostsPage from './component/PostsPage'
import Comments from './component/Comments'
import PrivateRoute from './component/privateRoute'

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className='w-full-screen min-h-screen bg-zinc-200'>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/updateUser' element={<PrivateRoute/>}>
            <Route path='/updateUser' element={<UpdateUser/>}></Route>
          </Route>
          
          <Route path='/UserProfile/:userid' element={<UserProfile/>}></Route>
          
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
          </Route>
          <Route path='/educationform' element={<PrivateRoute/>}>
            <Route path='/educationform' element={<EducationForm/>}></Route>
          </Route>
          <Route path='/experienceform' element={<PrivateRoute/>}>
            <Route path='/experienceform' element={<ExperienceForm/>}></Route>
          </Route>
          <Route path='/createprofileform' element={<PrivateRoute/>}>
            <Route path='/createprofileform' element={<CreateProfileForm/>}></Route>
          </Route>
          <Route path='/editprofileform' element={<PrivateRoute/>}>
            <Route path='/editprofileform' element={<EditProfileForm/>}></Route>
          </Route>
          <Route path='/posts' element={<PrivateRoute/>}>
            <Route path='/posts' element={<PostsPage/>}></Route>
          </Route>
          <Route path='/posts/:postid/comment' element={<PrivateRoute/>}>
            <Route path='/posts/:postid/comment' element={<Comments/>}></Route>
          </Route>

        </Routes>
        <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
      </div>
      </Router>

    </Provider>
  );
}

export default App;
