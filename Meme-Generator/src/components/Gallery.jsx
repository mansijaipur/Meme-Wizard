// import React from "react"
// import { Grid } from 'react-visual-grid'

import React, { useState, useEffect } from 'react';

// const imgUrls = [
//     {
//         topText: 'hey', 
//         bottomText: 'there', 
//         randomImage: 'https://i.imgflip.com/2gnnjh.jpg'
//     },
//     {
//         topText: 'hey', 
//         bottomText: 'there', 
//         randomImage: 'https://i.imgflip.com/2896ro.jpg'
//     },
//     {
//         topText: 'hey', 
//         bottomText: 'there', 
//         randomImage: 'http://i.imgflip.com/1bij.jpg'
//     },
//     {
//         topText: 'hey', 
//         bottomText: 'there', 
//         randomImage: 'https://source.unsplash.com/PC_lbSSxCZE/800x600'
//     },
//     {
//         topText: 'hey', 
//         bottomText: 'there', 
//         randomImage: 'https://source.unsplash.com/lVmR1YaBGG4/800x600' 
//     },
//     {
//         topText: 'hey', 
//         bottomText: 'there', 
//         randomImage: 'https://source.unsplash.com/5KvPQc1Uklk/800x600' 
//     },
//     {
//         topText: 'hey', 
//         bottomText: 'there', 
//         randomImage: 'https://source.unsplash.com/Igct8iZucFI/800x600'
//     }

// ]




function Gallery(props) {
    console.log(props.toAdd)
    // const [gallery , setGallery] = React.useState(props.toAdd)
    // console.log(gallery)
    const [currentIndex, setCurrentIndex] = useState(null);
    console.log("Entered Gallery Component!!")
    
    const openModal = (index) => {
        setCurrentIndex(index);
    };

    const closeModal = (e) => {
        if (e !== undefined) {
        e.preventDefault();
        }
        setCurrentIndex(null);
    };

    const findPrev = (e) => {
        if (e !== undefined) {
        e.preventDefault();
        }
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const findNext = (e) => {
        if (e !== undefined) {
        e.preventDefault();
        }
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const renderImageContent = (obj, index) => {
        return (
        <div onClick={(e) => openModal(index)} key={obj.randomImage}>
            <div className='meme'>
                <img src={obj.randomImage} alt={obj.randomImage} className="meme--image"/>
                <h2 className="meme--text top">{obj.topText}</h2>
                <h2 className="meme--text bottom">{obj.bottomText}</h2>
            </div>
            
        </div>
        );
    };
    // 🔥
    return (
        <div className="gallery-container">
        <h1>Your Saved MEMES </h1>
        <div className="gallery-grid">
            {props.toAdd.map(renderImageContent)}
        </div>
        <GalleryModal
            closeModal={closeModal}
            findPrev={findPrev}
            findNext={findNext}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex + 1 < props.toAdd.length}
            src={props.toAdd[currentIndex]}
        />
        </div>
    );
}

function GalleryModal({ closeModal, hasNext, hasPrev, findNext, findPrev, src }) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) closeModal();
    if (e.keyCode === 37 && hasPrev) findPrev();
    if (e.keyCode === 39 && hasNext) findNext();
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!src) {
    console.log('what');
    return null;
  }

  return (
    <div>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal">
        <div className="modal-body">
          <a href="#" className="modal-close" onClick={closeModal} onKeyDown={handleKeyDown}>
            &times;
          </a>
          {hasPrev && (
            <a href="#" className="modal-prev" onClick={findPrev} onKeyDown={handleKeyDown}>
              &lsaquo;
            </a>
          )}
          {hasNext && (
            <a href="#" className="modal-next" onClick={findNext} onKeyDown={handleKeyDown}>
              &rsaquo;
            </a>
          )}
          <img src={src.randomImage} alt={src.randomImage} className="meme--image"/>
          <h2 className="meme--text top">{src.topText}</h2>
          <h2 className="meme--text bottom">{src.bottomText}</h2>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
         
