import React from 'react';

/**
 * School logo.
 *
 * The artwork is a light-toned circular crest with a pale blue centre, so it
 * needs a dark plate behind it to stay legible on white surfaces. `variant`
 * controls that plate:
 *
 *   'plate' (default) — deep-blue rounded plate, for light/white backgrounds
 *   'bare'            — no plate, for use on dark blue backgrounds
 *
 * `size` is the rendered box in px (the image is contained inside it).
 */
const Logo = ({ size = 56, variant = 'plate', className = '', src }) => {
  const url = src || '/assets/logo.png';

  if (variant === 'bare') {
    return (
      <img
        src={url}
        alt="Pratibha Public School Basna logo"
        width={size}
        height={size}
        className={`object-contain shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1a237e] to-[#0d1452] shadow-md shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={url}
        alt="Pratibha Public School Basna logo"
        className="object-contain"
        style={{ width: size * 0.84, height: size * 0.84 }}
      />
    </span>
  );
};

export default Logo;
