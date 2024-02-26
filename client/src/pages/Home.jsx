import { Link } from 'react-router-dom';
import CallToAction from './components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from './components/PostCard';
import TimCard from './components/TimCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [tams, setTams] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchTims = async () => {
      const res1 = await fetch('/api/tim/gettims');
      const data1 = await res1.json();
      setTams(data1.tim);
    };
    fetchTims();
  }, []);
  return (
    
    <div>
        <div
        className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Bator Arto Moro</span>
                <span className="block text-indigo-600 xl:inline">Software House Pertama di Tapanuli Selatan</span>
            </h1>
            <p
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Berkarya dibidang pembuatan Aplikasi
            </p>
            
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                    <Link
          to='/search'
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10">
                        Lihat Semua Produk
                    </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                        Pesan Aplikasi
                    </a>
                </div>
            </div>
            
        </div>

       
        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""></img>
        </div>
        
    </div>
    <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
    <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">Services</h2>
    <p className="mb-12 text-lg text-gray-500">Pelayanan yang kami tawarkan...</p>
    <div className="w-full">
        <div className="flex flex-col w-full mb-10 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                        <div className="flex items-center -mt-1">
                            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Pembuatan Aplikasi</h3>
                        </div>
                        <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                        <p className="mb-2 text-gray-600">Membantu mewujudkan aplikasi yang dibangun sesuai dengan kebutuhan pekerjaan maupun usaha anda.</p>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-1/2">
                <div className="relative h-full ml-0 md:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                        <div className="flex items-center -mt-1">
                            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Analisis Aplikasi</h3>
                        </div>
                        <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                        <p className="mb-2 text-gray-600">Memberikan Pelayanan analisa kebutuhan sistem/aplikasi berdasarkan kebutuhan sebelum aplikasi dikembangkan.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-full mb-5 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                        <div className="flex items-center -mt-1">
                            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Instalasi Perangkat Lunak</h3>
                        </div>
                        <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                        <p className="mb-2 text-gray-600">Membantu dalam membangun kebutuhan instalasi aplikasi ataupun sistem yang dibutuhkan dalam menjalankan pekerjaan maupun usaha anda.</p>
                    </div>
                </div>
            </div>
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                        <div className="flex items-center -mt-1">
                            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Instalasi Perangkat Keras</h3>
                        </div>
                        <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                        <p className="mb-2 text-gray-600">Membantu pengembangan perangkat keras yang dibutuhkan sesuai dengan perkembangan dunia IT sehingga mempercepat pekerjaan dan usaha anda.</p>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-1/2">
                <div className="relative h-full ml-0 md:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                        <div className="flex items-center -mt-1">
                            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Pelatihan Programming</h3>
                        </div>
                        <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                        <p className="mb-2 text-gray-600">Membuat program pembelajaran dibidang programming komputer untuk menguasai salah satu bahasa pemrograman.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Team Kami</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Kerjasama Tim yang sangat diperlukan</p>
      </div>
      
      <div className='sm:grid grid-cols-2 gap-6 my-10'>
      { tams.map((tim) => (
           <TimCard key={tim._id} tim={tim} />
       ))}
      </div>
  </div>


      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Artikel Terbaru</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
        
            </div>
            
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
             Lihat Semua Postingan
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
