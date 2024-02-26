import { TextInput, FileInput, Button, Alert } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreateTim() {
    const [file,setFile] =useState(null);
    const [imageUploadProgress,setImageUploadProgress] =useState(null);
    const [imageUploadError ,setImageUploadError] =useState(null);
    const [formData,setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleUploadImage = async () => {
        try {
          if (!file) {
            setImageUploadError('Please select an image');
            return;
          }
          //setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime() + '-' + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
              setImageUploadError('Image upload failed');
              setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress(null);
                setImageUploadError(null);
                setFormData({ ...formData, image: downloadURL });
              });
            }
          );
        } catch (error) {
         // setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
          console.log(error);
        }
      };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tim/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/dashboard?tab=tims`);
      }
    } catch (error) {
      setPublishError('Ada ditemukan kesalahan..!!');
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Tambah Anggota Tim</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='Nama Anggota Tim' required id='nama' className='flex-1' onChange={(e)=>setFormData({...formData,nama:e.target.value})}/>
                <TextInput type='text' placeholder='Jabatan Dalam Tim' required id='jabatan' className='flex-1' onChange={(e)=>setFormData({...formData,jabatan:e.target.value})}/>
                
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline
                onClick={handleUploadImage} 
                disabled={imageUploadProgress}
                >
                {
                    imageUploadProgress ? (
                    <div className='w-16 h16'>
                        <CircularProgressbar value={imageUploadProgress} 
                        text ={`${imageUploadProgress || 0}%`} />
                    </div>) : ('Simpan Fhoto Anggota')
                }     
                </Button>        
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>  }
            {formData.image && (
                <img src={formData.image}
                alt='Memuat Fhoto Anggota Tim'
                className='w-full h-72 object-cover' required />
            )
            }
            <ReactQuill theme='snow' placeholder='Tulis Daftar Keahlian Anggota Tim...' className='h-72 mb-12' required onChange={(value)=>{
                setFormData({...formData,deskripsi:value})
            }} />
            <Button type='submit' gradientDuoTone='purpleToPink'>Tambah Anggota Baru</Button>
            {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
        </form>
    </div>
  )
}

