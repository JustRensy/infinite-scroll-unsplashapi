// Variables
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const API_KEY = '9HCpz-_mPNYRIYuLZKpEXU8mu9dTmUiLjwLqLrZwGGA';
const API_URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

// Function to set attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements For Photos, Add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to full image
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.urls.full,
			target: '_blank',
		});
		// Create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Event listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
		// Put <img> inside <a>, put both inside container element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get Photos From Unsplash API
async function getPhotos() {
	try {
		const res = await fetch(API_URL);
		photosArray = await res.json();
		displayPhotos();
	} catch (err) {}
}

// Load more photos on scroll
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
