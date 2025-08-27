document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_USERNAME = 'tadano13'; 
    const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`;
    const BIRTH_DATE = '2004-03-13';

    const projectsContainer = document.querySelector('.projects-container');
    const loader = document.getElementById('loader');
    const ageElement = document.getElementById('age');
    const contactBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // --- FUNCTIONS ---
    function setupContactModal() {
        if (!contactBtn || !contactModal || !closeModalBtn) return;

        contactBtn.addEventListener('click', () => {
            contactModal.classList.remove('hidden');
        });

        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.add('hidden');
        });

        // Optional: Close modal when clicking the overlay
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.add('hidden');
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

    /**
     * Fetches repository data from the GitHub API.
     * @returns {Promise<Array>} A promise that resolves to an array of repository objects.
     */
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
            return []; // Return an empty array on error
        }
    }

    /**
     * Creates an HTML element for a single project card.
     * @param {object} repo - The repository object from the GitHub API.
     * @returns {HTMLElement} The project card element.
     */
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
    }
    
    init();
});
