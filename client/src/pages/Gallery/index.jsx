import React, { useState, useEffect } from 'react';
import { galleryAPI } from '../../services/api';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else {
      setLightboxIndex(0);
    }
  };

  const prevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else {
      setLightboxIndex(images.length - 1);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-4">Photo Gallery</h1>
          <p className="text-gray-300">Home / Gallery</p>
        </div>
      </div>

      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Album Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, index) => (
              <div
                key={img._id}
                onClick={() => openLightbox(index)}
                className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square touch-manipulation"
              >
                <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <p className="text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center text-gray-500 py-8">No photos available</div>
          )}
        </div>
      </section>

      {/* Lightbox - shows all images with navigation */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white text-3xl z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FiX />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white text-sm z-50 bg-white/10 px-3 py-1 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Main image */}
          <div className="w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]?.imageUrl}
              alt={images[lightboxIndex]?.caption}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          {/* Caption */}
          {images[lightboxIndex]?.caption && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-center bg-black/50 px-4 py-2 rounded-lg max-w-md">
              {images[lightboxIndex].caption}
            </div>
          )}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-3 hover:bg-white/10 rounded-full transition-colors z-50"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-3 hover:bg-white/10 rounded-full transition-colors z-50"
              >
                <FiChevronRight />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto p-2 bg-black/30 rounded-lg">
            {images.map((img, idx) => (
              <button
                key={img._id}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  idx === lightboxIndex ? 'border-[#f9a825] scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
