/* eslint-disable react/jsx-key */
import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';


export default function DashProjects() {
  const { currentUser } = useSelector((state) => state.user);
  const [projectPosts, setProjectPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/project/getprojects?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setProjectPosts(data.projects);
          if (data.projects.length < 6) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = projectPosts.length;
    try {
      const res = await fetch(
        `/api/project/getprojects?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setProjectPosts((prev) => [...prev, ...data.projects]);
        if (data.projects.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteProjects = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/project/deleteproject/${projectIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setProjectPosts((prev) =>
          prev.filter((project) => project._id !== projectIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && (
          <Link to={'/create-project'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Buat Project Baru
            </Button>
          </Link>
        )}  
        <br />  
      {currentUser.isAdmin && projectPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Tgl Update</Table.HeadCell>
              <Table.HeadCell>Gambar Project</Table.HeadCell>
              <Table.HeadCell>Nama Project </Table.HeadCell>
              <Table.HeadCell>Kategori</Table.HeadCell>
              <Table.HeadCell>Alamat Web</Table.HeadCell>
              <Table.HeadCell>Hapus</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {projectPosts.map((project) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/project/${project.slug}`}>
                      <img
                        src={project.image}
                        alt={project.judul}
                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/project/${project.slug}`}
                    >
                      {project.judul}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{project.category}</Table.Cell>
                  <Table.Cell>{project.website}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setProjectIdToDelete(project._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Hapus
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-project/${project._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Lihat selebihnya..
            </button>
          )}
        </>
      ) : (
        <p>Belum ada Project..!!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Yakin untuk menghapus data ini?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteProjects}>
                Ya, Tentu
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                Tidak, Batalkan
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}