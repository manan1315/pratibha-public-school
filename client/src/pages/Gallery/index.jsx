import React, { useState, useEffect } from 'react';
import { galleryAPI } from '../../services/api';

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [selectedAlbum]);

  const fetchAlbums = async () => {
    try {
      const { data } = await galleryAPI.getAlbums();
      setAlbums(data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const { data } = await galleryAPI.getImages(selectedAlbum?._id);
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2.5">Photo Gallery</h1>
          <p className="text-gray-300">Home / Gallery</p>
        </div>
      </div>

      <section className="py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-4">
          {/* Album Filter */}
          <div className="flex flex-wrap gap-2.5 mb-2">
            <button
              onClick={() => setSelectedAlbum(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedAlbum ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Photos
            </button>
            {albums.map((album) => (
              <button
                key={album._id}
                onClick={() => setSelectedAlbum(album)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedAlbum?._id === album._id ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {album.albumName}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {images.map((img) => (
              <div
                key={img._id}
                onClick={() => setLightboxImage(img)}
                className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square"
              >
                <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center text-gray-500 py-6">No photos available</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <img src={lightboxImage.imageUrl} alt={lightboxImage.caption} className="max-w-full max-h-[90vh] object-contain" />
          <button onClick={() => setLightboxImage(null)} className="absolute top-4 right-4 text-white text-xl sm:text-2xl">✕</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
