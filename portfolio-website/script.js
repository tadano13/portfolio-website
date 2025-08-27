document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_USERNAME = 'tadano13'; 
    const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`;
    const BIRTH_DATE = '2004-03-13';

    const projectsContainer = document.querySelector('.projects-container');
    const loader = document.getElementById('loader');
    const ageElement = document.getElementById('age');
    const contactBtnDesktop = document.getElementById('contact-btn-desktop');
    const contactBtnMobile = document.getElementById('contact-btn-mobile');
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    function setupMobileMenu() {
        if (!menuBtn || !menu) return;

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });

        const mobileLinks = menu.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                menuBtn.classList.remove('open');
            });
        });
    }

    function setupContactModal() {
        if (!contactModal || !closeModalBtn) return;

        const openModal = () => contactModal.classList.remove('hidden');
        const closeModal = () => contactModal.classList.add('hidden');

        if (contactBtnDesktop) contactBtnDesktop.addEventListener('click', openModal);
        if (contactBtnMobile) contactBtnMobile.addEventListener('click', openModal);
        
        closeModalBtn.addEventListener('click', closeModal);

        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    function calculateAndDisplayAge() {
        if (!ageElement) return;

        const birthDate = new Date(BIRTH_DATE);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        ageElement.textContent = age;
    }

    async function fetchGitHubProjects() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`GitHub API returned a ${response.status} status.`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            return [];
        }
    }

    function createProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card';

        const lastUpdated = new Date(repo.updated_at).toISOString().split('T')[0];

        card.innerHTML = `
            <div class="project-card-header">
                <div class="dots">
                    <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                </div>
                <span>${lastUpdated}.repo</span>
            </div>
            <img src="https://placehold.co/320x150/e2e8f0/000000?text=${repo.name}" alt="${repo.name} placeholder image" class="project-card-image" onerror="this.onerror=null;this.src='https://placehold.co/320x150/cccccc/000000?text=Image+Error';">
            <div class="project-card-body">
                <h3 class="text-2xl font-black">${repo.name}</h3>
                <p class="mt-2 text-gray-700">${repo.description || 'No description available.'}</p>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="view-project-btn">
                    View Project
                </a>
            </div>
        `;
        return card;
    }

    async function displayProjects() {
        const projects = await fetchGitHubProjects();
        
        if (!projectsContainer) return;
        projectsContainer.innerHTML = '';

        if (projects.length === 0) {
            projectsContainer.innerHTML = '<p class="font-bold">Could not load projects or no public repositories found.</p>';
            return;
        }

        projects.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsContainer.appendChild(projectCard);
        });
    }

    function setupSliderControls() {
        if (!projectsContainer) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        projectsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            projectsContainer.style.cursor = 'grabbing';
            startX = e.pageX - projectsContainer.offsetLeft;
            scrollLeft = projectsContainer.scrollLeft;
        });

        projectsContainer.addEventListener('mouseleave', () => {
            isDown = false;
            projectsContainer.style.cursor = 'grab';
        });

        projectsContainer.addEventListener('mouseup', () => {
            isDown = false;
            projectsContainer.style.cursor = 'grab';
        });

        projectsContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            projectsContainer.scrollLeft = scrollLeft - walk;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                projectsContainer.scrollBy({ left: -340, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                projectsContainer.scrollBy({ left: 340, behavior: 'smooth' });
            }
        });
    }

    async function init() {
        calculateAndDisplayAge();
        await displayProjects();
        setupSliderControls();
        setupContactModal();
        setupMobileMenu();
    }
    
    init();
});
