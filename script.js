const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let imageCount = 5;
const apiKey = 'hUae7gCcDkexDNVtKSFcd61TjblNAQXuwvd1167z0Ms';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        imageCount = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.small,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {

    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();