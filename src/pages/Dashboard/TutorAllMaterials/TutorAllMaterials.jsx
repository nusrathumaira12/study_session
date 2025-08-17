import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TutorAllMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [materials, setMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [title, setTitle] = useState('');
  const [resourceLink, setResourceLink] = useState('');

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/tutor/approved-sessions/${user.email}`)
        .then(res => setMaterials(res.data))
        .catch(err => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this material?')) return;
    await axiosSecure.delete(`/materials/${id}`);
    setMaterials(materials.filter(m => m._id !== id));
  };

  const startEdit = (material) => {
    setEditingMaterial(material);
    setTitle(material.title);
    setResourceLink(material.resourceLink);
  };

  const cancelEdit = () => {
    setEditingMaterial(null);
    setTitle('');
    setResourceLink('');
  };

  const handleUpdate = async () => {
    await axiosSecure.put(`/materials/${editingMaterial._id}`, {
      title,
      resourceLink,
    });
    setMaterials(materials.map(m => m._id === editingMaterial._id ? { ...m, title, resourceLink } : m));
    cancelEdit();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-black">
      <h2 className="text-2xl font-bold mb-4">All Uploaded Materials</h2>

      {materials.length === 0 && <p>No materials uploaded yet.</p>}

      <ul className="space-y-4">
        {materials.map(material => (
          <li key={material._id} className="border rounded p-4">
            {editingMaterial?._id === material._id ? (
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="url"
                  value={resourceLink}
                  onChange={(e) => setResourceLink(e.target.value)}
                  className="input input-bordered w-full mb-2"
                />
                <button className="btn btn-sm btn-success mr-2" onClick={handleUpdate}>Save</button>
                <button className="btn btn-sm btn-warning" onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg">{material.title}</h3>
                {material.imageUrl && (
                  <img src={material.imageUrl} alt={material.title} className="max-w-xs my-2" />
                )}
                <p>
                  Resource Link:{' '}
                  <a href={material.resourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View Document
                  </a>
                </p>
                <p>Session ID: {material.sessionId}</p>
                <button
                  onClick={() => startEdit(material)}
                  className="btn btn-sm btn-info mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorAllMaterials;