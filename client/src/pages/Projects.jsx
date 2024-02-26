import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProjectCard from './components/ProjectCard';
export default function Projects() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/project/getprojects');
      const data = await res.json();
      setProjects(data.projects);
    };
    fetchPosts();
  }, []);
  return (
    <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {projects && projects.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Project Terbaru</h2>
            <div className='flex flex-wrap gap-4'>
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
        
            </div>
            
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
             Lihat Semua Project
            </Link>
          </div>
        )}
      </div>
  )
}
