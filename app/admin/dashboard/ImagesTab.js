import React, { useState, useEffect } from 'react';

const imageNames = [
  { label: 'Logo', name: 'logo.png' },
  { label: 'Hero Side', name: 'hero_side.png' },
];

export default function ImagesTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState(imageNames[0].name);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all images on mount
    fetch('/api/admin/image')
      .then(res => res.json())
      .then(data => {
        if (data.images) {
          if (Array.isArray(data.images)) {
            const imgMap = {};
            data.images.forEach(img => {
              imgMap[img.name] = img;
            });
            setImages(imgMap);
          } else if (data.images.name) {
            setImages({ [data.images.name]: data.images });
          }
        }
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!selectedFile) {
      setError('Please select a file.');
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', selectedName);
    try {
      const res = await fetch('/api/admin/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImages(prev => ({ ...prev, [data.image.name]: data.image }));
        setSelectedFile(null);
      } else {
        setError(data.error || 'Upload failed.');
      }
    } catch (err) {
      setError('Upload failed.');
    }
    setLoading(false);
  };

  return (
    <div className='bg-white font-poppins  border border-gray-200 shadow-lg rounded-2xl'>
      <h2 className='bg-gray-50 p-4 mb-10 '>Manage Images</h2>
      <form onSubmit={handleUpload} className=' md:flex-row flex-col gap-4 flex px-2 md:items-center justify-around'>
        <label className='space-x-4  flex items-center justify-between w-full md:w-fit md:justify-center'>
          <span className='uppercase font-semibold'>Image Type:</span>
          <select className='border border-gray-300 p-2 transition-all duration-300 ease-in-out' value={selectedName} onChange={handleNameChange}>
            {imageNames.map(img => (
              <option key={img.name} value={img.name}>{img.label}</option>
            ))}
          </select>
        </label>
        <input type="file" accept="image/*" className='border mx-auto bg-prime/5 border-gray-300 md:w-fit p-2 w-3/4' onChange={handleFileChange} />
        <button type="submit" className='bg-prime hover:bg-prime/90 py-2 px-6 text-white' disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <h3></h3>
      <h2 className='bg-gray-50 p-4 my-10 '>Preview</h2>

      <div className='flex py-20 w-full items-center justify-around '>
        {imageNames.map(img => (
          <div key={img.name} style={{ marginBottom: 20 }} className=' hover:bg-prime/3 p-2 rounded-2xl flex flex-col items-center gap-5'>
            
            {images[img.name] ? (
              <img
                src={`data:${images[img.name].type};base64,${images[img.name].data}`}
                alt={img.label}
                style={{ maxWidth: 200, maxHeight: 100 }}
              />
            ) : (
              <span>No image uploaded.</span>
            )}
            <span className='font-semibold text-lg'>{img.label}</span>

          </div>
        ))}
      </div>
    </div>
  );
}
