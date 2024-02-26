import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <div className='group relative w-full border  border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/project/${project.slug}`}>
        <img
          src={project.image}
          alt='post cover'
          className='h-[160px] w-full  object-cover group-hover:h-[100px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{project.judul}</p>
        <div className="px-0 py-1">
        <span className='inline-block px-2 py-1 font-semibold text-teal-900 bg-teal-200 rounded-full'>{project.category}</span></div>
        <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
              <a href="#">
                <span className="sr-only">BatorArtoMoro</span>
                <img className="h-10 w-10 rounded-full" src={project && project.image}
        alt={project && project.title}></img>
              </a>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                <a href="#" className="hover:underline">BatorArtoMoro</a>
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <span>{project && new Date(project.createdAt).toLocaleDateString()}</span>
                <span aria-hidden="true">·</span>
                <span className='italic'>
          {project && (project.isi.length / 100).toFixed(0)} dibaca
        </span>
              </div>
            </div>
          </div>
        <Link
          to={`/project/${project.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Baca Tentang Project
        </Link>
      </div>
    </div>
  );
}