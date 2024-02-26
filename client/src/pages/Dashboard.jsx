import { useEffect, useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import DashSidebar from './components/DashSidebar';
import DashUsers from './components/DashUsers';
import DashProfile from './components/DashProfile';
import DashProjects from './components/DashProjects';
import DashTims from './components/DashTims';
import DashPosts from './components/DashPosts';
import DashComments from './components/DashComments';
import DashboardComp from './DashboardComp';
export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return ( <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='md: w-56'>
      {/* sidebar */}
      <DashSidebar/>
    </div>

      {/* Profile.. */}
      {tab==='profile' && <DashProfile/>}
      {/* Proyek kami .. */}
      {tab==='projects' && <DashProjects/>}

       {/* Tim .. */}
       {tab==='tims' && <DashTims/>}

      {/* Artikel.. */}
      {tab==='posts' && <DashPosts/>}

       {/* Pengguna.. */}
       {tab==='users' && <DashUsers/>}

       {/* komentar.. */}
       {tab==='comments' && <DashComments/>}

       {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      </div>

      
  )
}
