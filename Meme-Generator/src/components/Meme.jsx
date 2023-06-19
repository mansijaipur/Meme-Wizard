import React from "react"
import Gallery from "./Gallery"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    const [galleryMemes, setGalleryMemes] = React.useState([]);


    

    console.log(meme)
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))

        const data = window.localStorage.getItem('Gallery_Images');
        if(data) setGalleryMemes(JSON.parse(data))
        console.log(data)
    },[])

    // React.useEffect(() => {
    //     console.log({...galleryMemes},"HII")
    //     window.localStorage.setItem('Gallery_Images', JSON.stringify(galleryMemes))
    // },[galleryMemes])
    
    
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function handleAddToGallery() {
        const newMeme = {
            topText: meme.topText,
            bottomText: meme.bottomText,
            randomImage: meme.randomImage
        };
        // setGalleryMemes(prevMemes => [...prevMemes, newMeme]);
        let newMem = [...galleryMemes, newMeme];
        setGalleryMemes(newMem);
        window.localStorage.setItem('Gallery_Images', JSON.stringify(newMem))
    }

    
    return (
        <div>
            <main>
                <div className="form">
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                    <button 
                        className="form--button"
                        onClick={getMemeImage}
                    >
                        Get a new meme image 🖼
                    </button>
                </div>
                <div className="meme">
                    <img src={meme.randomImage} className="meme--image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
                <button className="add--meme" onClick={handleAddToGallery}>Add to Gallery</button>
            </main>

            <Gallery toAdd = {galleryMemes} />
            
        </div>
        
    )
}