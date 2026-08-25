import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2, FiUpload, FiX, FiEdit, FiArrowLeft } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import { galleryAPI, uploadAPI } from '../../services/api';

const GalleryManagement = () => {
  const [albums, setAlbums] = useState([]);
  const [selected, setSelected] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [albumModal, setAlbumModal] = useState(false);
  const [editAlbum, setEditAlbum] = useState(null);
  const [albumForm, setAlbumForm] = useState({ albumName: '', description: '', coverImage: '', isActive: true });

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await galleryAPI.getAllAlbums();
      setAlbums(data);
    } catch {
      toast.error('Failed to load albums');
    }
    setLoading(false);
  }, []);

  const loadImages = useCallback(async (albumId) => {
    try {
      const { data } = await galleryAPI.getImages(albumId);
      setImages(data);
    } catch {
      toast.error('Failed to load images');
    }
  }, []);

  useEffect(() => { loadAlbums(); }, [loadAlbums]);
  useEffect(() => { if (selected) loadImages(selected._id); }, [selected, loadImages]);

  /* ---- album CRUD ---- */
  const openNewAlbum = () => {
    setEditAlbum(null);
    setAlbumForm({ albumName: '', description: '', coverImage: '', isActive: true });
    setAlbumModal(true);
  };

  const openEditAlbum = (a) => {
    setEditAlbum(a);
    setAlbumForm({ albumName: a.albumName, description: a.description || '', coverImage: a.coverImage || '', isActive: a.isActive !== false });
    setAlbumModal(true);
  };

  const saveAlbum = async (e) => {
    e.preventDefault();
    if (!albumForm.albumName.trim()) return toast.error('Album name is required');
    setBusy(true);
    try {
      if (editAlbum) {
        await galleryAPI.updateAlbum(editAlbum._id, albumForm);
        toast.success('Album updated');
      } else {
        await galleryAPI.createAlbum(albumForm);
        toast.success('Album created');
      }
      setAlbumModal(false);
      await loadAlbums();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
    setBusy(false);
  };

  const deleteAlbum = async (a) => {
    if (!window.confirm(`Delete album "${a.albumName}" and all its photos?`)) return;
    try {
      await galleryAPI.deleteAlbum(a._id);
      toast.success('Album deleted');
      if (selected?._id === a._id) setSelected(null);
      await loadAlbums();
    } catch {
      toast.error('Delete failed');
    }
  };

  /* ---- image upload ---- */
  const uploadImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !selected) return;
    setBusy(true);
    let ok = 0;
    for (const file of files) {
      try {
        const { data } = await uploadAPI.upload(file);
        await galleryAPI.uploadImage({ albumId: selected._id, imageUrl: data.url, caption: '', order: 0 });
        ok += 1;
      } catch (err) {
        toast.error(`${file.name}: ${err.response?.data?.message || 'upload failed'}`);
      }
    }
    if (ok) toast.success(`${ok} photo${ok === 1 ? '' : 's'} uploaded`);
    await loadImages(selected._id);
    setBusy(false);
    e.target.value = '';
  };

  const addByUrl = async () => {
    const url = window.prompt('Paste the image URL:');
    if (!url) return;
    try {
      await galleryAPI.uploadImage({ albumId: selected._id, imageUrl: url, caption: '', order: 0 });
      toast.success('Photo added');
      await loadImages(selected._id);
    } catch {
      toast.error('Could not add photo');
    }
  };

  const saveCaption = async (img, caption) => {
    if (caption === (img.caption || '')) return;
    try {
      await galleryAPI.updateImage(img._id, { caption });
      toast.success('Caption saved');
      await loadImages(selected._id);
    } catch {
      toast.error('Could not save caption');
    }
  };

  const deleteImage = async (img) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await galleryAPI.deleteImage(img._id);
      toast.success('Photo deleted');
      await loadImages(selected._id);
    } catch {
      toast.error('Delete failed');
    }
  };

  /* ---------------- album detail view ---------------- */
  if (selected) {
    return (
      <AdminLayout>
        <div className="p-6">
          <button onClick={() => setSelected(null)} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a237e] mb-4">
            <FiArrowLeft /> Back to albums
          </button>

          <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selected.albumName}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{images.length} photo{images.length === 1 ? '' : 's'}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={addByUrl} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Add by URL
              </button>
              <label className={`inline-flex items-center gap-2 bg-[#1a237e] text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#0d1452] ${busy ? 'opacity-60 pointer-events-none' : ''}`}>
                <FiUpload /> {busy ? 'Uploading...' : 'Upload Photos'}
                <input type="file" accept="image/*" multiple onChange={uploadImages} className="hidden" />
              </label>
            </div>
          </div>

          {images.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-400">
              No photos in this album yet. Click "Upload Photos" to add some.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img src={img.imageUrl} alt={img.caption} className="w-full h-36 object-cover" />
                  <div className="p-3">
                    <input
                      defaultValue={img.caption || ''}
                      onBlur={(e) => saveCaption(img, e.target.value)}
                      placeholder="Add a caption..."
                      className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded focus:outline-none focus:border-[#1a237e]"
                    />
                    <button onClick={() => deleteImage(img)} className="mt-2 text-xs text-red-600 hover:underline inline-flex items-center gap-1">
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    );
  }

  /* ---------------- albums list ---------------- */
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {loading ? 'Loading...' : `${albums.length} album${albums.length === 1 ? '' : 's'} — click an album to manage its photos`}
            </p>
          </div>
          <button onClick={openNewAlbum} className="flex items-center gap-2 bg-[#1a237e] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0d1452]">
            <FiPlus /> New Album
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-400">Loading...</div>
        ) : albums.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-400">
            No albums yet. Create your first album to start uploading photos.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {albums.map((a) => (
              <div key={a._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div onClick={() => setSelected(a)} className="cursor-pointer">
                  {a.coverImage ? (
                    <img src={a.coverImage} alt={a.albumName} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No cover image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{a.albumName}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.description || 'No description'}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setSelected(a)} className="flex-1 text-xs bg-[#1a237e] text-white py-1.5 rounded-lg hover:bg-[#0d1452]">
                      Manage Photos
                    </button>
                    <button onClick={() => openEditAlbum(a)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit album">
                      <FiEdit size={14} />
                    </button>
                    <button onClick={() => deleteAlbum(a)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Delete album">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {albumModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">{editAlbum ? 'Edit Album' : 'New Album'}</h2>
                <button onClick={() => setAlbumModal(false)} className="p-1 text-gray-400 hover:text-gray-700"><FiX size={20} /></button>
              </div>
              <form onSubmit={saveAlbum} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Album Name <span className="text-red-500">*</span></label>
                  <input value={albumForm.albumName} onChange={(e) => setAlbumForm({ ...albumForm, albumName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={2} value={albumForm.description} onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                  <input value={albumForm.coverImage} onChange={(e) => setAlbumForm({ ...albumForm, coverImage: e.target.value })}
                    placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1a237e]" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={albumForm.isActive} onChange={(e) => setAlbumForm({ ...albumForm, isActive: e.target.checked })} className="w-4 h-4 accent-[#1a237e]" />
                  <span className="text-sm text-gray-700">Show on website</span>
                </label>
                <div className="flex gap-3 pt-1">
                  <button type="submit" disabled={busy} className="flex-1 bg-[#1a237e] text-white py-2.5 rounded-lg hover:bg-[#0d1452] disabled:opacity-60">
                    {busy ? 'Saving...' : editAlbum ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => setAlbumModal(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;
