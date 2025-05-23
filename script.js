document.addEventListener('DOMContentLoaded', function () {
    showPage('gallery');
});

function showPage(page) {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => link.classList.remove('disabled'));

    if (page === 'gallery') {
        contentDiv.innerHTML = `
            <p class="page-title">Intemporel. Inoubliable. Vous.</p>
        `;
        document.getElementById('nav-gallery').classList.add('disabled');
        document.querySelector('.gallery').style.display = 'block';
        loadImages();
    } else if (page === 'contact') {
        contentDiv.innerHTML = `
            <p class="page-title">Pour vos projets:</p>
            <div class="contact-image">
                <img src="Logo/white_logo.png" alt="Contact Image">
            </div>
            <div class="contact-info">
                <p>Mon numéro de téléphone : +33648137680</p>
                <p>Mon adresse email : Luka.pics9@gmail.com</p>
                <p>Suivez-moi sur les réseaux sociaux :
                    <a href="https://www.instagram.com/luka_.pics/" target="_blank" class="insta-link">Instagram</a>
                </p>
            </div>
            <button onclick="showPage('gallery')" class="bottom-button">Retour à l'accueil</button>
        `;
        document.getElementById('nav-contact').classList.add('disabled');
        document.querySelector('.gallery').style.display = 'none';
    } else if (page.startsWith('image')) {
        const imageIndex = page.split('-')[1];
        const image = images[imageIndex];
        contentDiv.innerHTML = `
            <h2>${image.text}</h2>
            <div id="category-gallery"></div>
            <div class="modal-buttons">
                <button class="modal-btn" onclick="showPage('gallery')">Accueil</button>
                <button class="modal-btn" onclick="showPage('contact')">Me contacter</button>
            </div>
        `;
        document.querySelector('.gallery').style.display = 'none';
        showImageGallery(image.text);
    }
}

const images = [
    { src: 'Sport/perche2.JPG', text: 'Sports' },
    { src: 'Paysages/paysage.JPG', text: 'Paysages' },
    { src: 'Animaux/animaux.JPG', text: 'Animaux' },
    { src: 'Portraits/portrait.JPG', text: 'Portraits' },
    { src: 'Shooting/shooting.JPG', text: 'Shooting' },
];

function loadImages() {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = '';

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.text;
        img.style.cursor = 'pointer';
        img.onclick = () => {
            showPage(`image-${index}`);
        };

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-item');
        imgContainer.appendChild(img);

        const imgText = document.createElement('div');
        imgText.classList.add('image-text');
        imgText.textContent = image.text;
        imgContainer.appendChild(imgText);

        imageGrid.appendChild(imgContainer);
    });
}

function showImageGallery(category) {
    const categoryGallery = document.getElementById('category-gallery');
    categoryGallery.innerHTML = '';
    const categoryImages = getCategoryImages(category);

    categoryImages.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.classList.add('thumbnail');
        thumb.onclick = () => openModal(categoryImages, index);
        categoryGallery.appendChild(thumb);
    });
}

function getCategoryImages(category) {
    if (category === 'Sports') {
        return [
            'Sport/course1.JPG',
            'Sport/course2.JPG',
            'Sport/course3.JPG',
            'Sport/perche2.JPG',
            'Sport/perche3.JPG',
            'Sport/perche4.JPG'
        ];
    }
    if (category === 'Paysages') {
        return [
            'Paysages/paysage.JPG',
            'Paysages/paysage1.JPG',
            'Paysages/paysage2.JPG',
            'Paysages/paysage3.JPG',
            'Paysages/paysage4.JPG',
            'Paysages/paysage5.JPG',
            'Paysages/paysage6.JPG',
            'Paysages/paysage7.JPG'
        ];
    }
    if (category === 'Animaux') {
        return [
            'Animaux/animaux.JPG',
            'Animaux/animaux1.JPG',
            'Animaux/animaux2.JPG',
            'Animaux/animaux3.JPG',
            'Animaux/animaux4.JPG',
            'Animaux/animaux5.JPG',
            'Animaux/animaux6.JPG',
            'Animaux/animaux7.JPG'
        ];
    }
    if (category === 'Portraits') {
        return [
            'Portraits/portrait.JPG',
            'Portraits/portrait1.JPG',
            'Portraits/portrait2.JPG',
            'Portraits/portrait3.JPG',
            'Portraits/portrait4.JPG'
        ];
    }
    if (category === 'Shooting') {
        return [
            'Shooting/shooting.JPG',
            'Shooting/shooting1.JPG',
            'Shooting/shooting2.JPG'
        ];
    }
    return [];
}

function openModal(images, index) {
    document.querySelectorAll('.modal-buttons').forEach(el => el.remove());
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <span class="close">&times;</span>
        <span class="nav-arrow left">&#10094;</span>
        <img class="modal-content" src="${images[index]}" data-index="${index}">
        <span class="nav-arrow right">&#10095;</span>

        <div class="modal-buttons">
            <button class="modal-btn" onclick="closeModalAndGo('gallery')">Accueil</button>
            <button class="modal-btn" onclick="closeModalAndGo('contact')">Me contacter</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = () => modal.remove();

    modal.querySelector('.nav-arrow.left').onclick = () => {
        const newIndex = (index - 1 + images.length) % images.length;
        modal.remove();
        openModal(images, newIndex);
    };

    modal.querySelector('.nav-arrow.right').onclick = () => {
        const newIndex = (index + 1) % images.length;
        modal.remove();
        openModal(images, newIndex);
    };
}

function closeModalAndGo(target) {
    document.querySelector('.modal')?.remove();
    showPage(target);
}
