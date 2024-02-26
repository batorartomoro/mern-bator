import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Projects from './pages/projects';
import Dashboard from './pages/dashboard';
import Header from './pages/components/Header';
import Footer from './pages/components/footer';
import PrivateRoute from './pages/components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import CreateTim from './pages/CreateTim';
import CreateProject from './pages/CreateProject';
import OnlyAdminPrivateRoute from './pages/components/OnlyAdminPrivateRoute';
import UpdatePost from './pages/UpdatePost';
import UpdateTim from './pages/UpdateTim';
import UpdateProject from './pages/UpdateProject';
import PostPage from './pages/PostPage';
import ScrollToTop from './pages/components/ScrollToTop';
import Search from './pages/components/Search';
import ProjectPage from './pages/ProjectPage';
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
        <Header />
       <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<Signin />} />
            <Route path='/sign-up' element={<Signup />} />
            <Route path='/search' element={<Search />} />
                      
            <Route element={<PrivateRoute/>} >
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route element={<OnlyAdminPrivateRoute/>} >
              <Route path='/create-tim' element={<CreateTim />} />
              <Route path='/update-tim/:timId' element={<UpdateTim />} />              
            </Route>
            <Route element={<OnlyAdminPrivateRoute/>} >
              <Route path='/create-project' element={<CreateProject />} />
              <Route path='/update-project/:projectId' element={<UpdateProject />} />    
            </Route>
            <Route element={<OnlyAdminPrivateRoute/>} >
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/update-post/:postId' element={<UpdatePost />} />              
            </Route>
            <Route path='/projects' element={<Projects />} /> 
            <Route path='/post/:postSlug' element={<PostPage />} /> 
            <Route path='/project/:projectSlug' element={<ProjectPage />} /> 
       </Routes>
       <Footer />
    </BrowserRouter>

  )
}
