import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UploadMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [resourceLink, setResourceLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/tutor/approved-sessions/${user.email}`)
        .then(res => setSessions(res.data))
        .catch(err => console.error(err));
    }
  }, [user, axiosSecure]);

  // Upload image to ImgBB and get URL
  const uploadImageToImgBB = async (file) => {
    const apiKey = '7fcf185cc05295c60741df3c356de180'; 
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSession) return alert('Please select a study session');

    setLoading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const materialData = {
        title,
        sessionId: selectedSession._id,
        tutorEmail: user.email,
        imageUrl,
        resourceLink,
      };

      await axiosSecure.post('/materials', materialData);
      alert('Material uploaded successfully!');
      setTitle('');
      setImageFile(null);
      setResourceLink('');
    } catch (error) {
      console.error(error);
      alert('Upload failed!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 dark:bg-black">
      <h2 className="text-2xl font-bold mb-4">Upload Materials</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label>
          Title:
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Select Approved Study Session:
          <select
            className="select select-bordered w-full"
            value={selectedSession?._id || ''}
            onChange={(e) =>
              setSelectedSession(sessions.find(s => s._id === e.target.value))
            }
            required
          >
            <option value="" disabled>Select session</option>
            {sessions.map(session => (
              <option key={session._id} value={session._id}>
                {session.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tutor Email (readonly):
          <input
            type="email"
            className="input input-bordered w-full"
            value={user.email}
            readOnly
          />
        </label>

        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])} className="input input-bordered w-full"
          />
        </label>

        <label>
          Resource Link (Google Drive):
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="https://drive.google.com/..."
            value={resourceLink}
            onChange={(e) => setResourceLink(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Material'}
        </button>
      </form>
    </div>
  );
};

export default UploadMaterials;
