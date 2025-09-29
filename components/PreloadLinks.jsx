'use client';

import { useEffect, useRef } from 'react';

export default function PreloadLinks() {
  const linksAdded = useRef(false);

  useEffect(() => {
    if (linksAdded.current) return;
    linksAdded.current = true;

    // Function to create and manage stylesheet links
    const createStylesheetLink = (href, media = 'all', onLoad = null) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = media;
      if (onLoad) link.onload = onLoad;
      document.head.appendChild(link);
      return link;
    };

    // Add Font Awesome with font-display: swap
    const fontAwesomeStyle = document.createElement('style');
    fontAwesomeStyle.textContent = `
      @font-face {
        font-family: 'Font Awesome 6 Free';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2') format('woff2');
      }
      .fa, .fas {
        font-family: 'Font Awesome 6 Free';
        font-weight: 900;
      }
    `;
    document.head.appendChild(fontAwesomeStyle);

    // Create stylesheet links with print media first
    const layoutLink = createStylesheetLink(
      '/_next/static/css/app/layout.css',
      'print'
    );
    
    const faLink = createStylesheetLink(
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
      'print'
    );

    // Function to change media to 'all' after load
    const handleLoad = () => {
      if (layoutLink) layoutLink.media = 'all';
      if (faLink) faLink.media = 'all';
    };

    // Set up load handlers
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      {/* Preload critical CSS */}
      <link 
        rel="preload" 
        href="/_next/static/css/app/layout.css" 
        as="style"
      />
      
      {/* Preload Font Awesome font file */}
      <link
        rel="preload"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Fallback for non-JS */}
      <noscript>
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </noscript>
    </>
  );
}
