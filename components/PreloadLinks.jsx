'use client';

export default function PreloadLinks() {
  return (
    <>
      {/* Preload critical CSS */}
      <link
        rel="preload"
        href="/_next/static/css/app/layout.css"
        as="style"
      />
      <link
        rel="stylesheet"
        href="/_next/static/css/app/layout.css"
      />

      {/* Preload Font Awesome font file */}
      <link
        rel="preload"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      {/* Fallback for non-JS */}
      <noscript>
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </noscript>
    </>
  );
}
