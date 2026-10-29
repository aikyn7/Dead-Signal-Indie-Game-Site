document.addEventListener('DOMContentLoaded', () => {

    const clickSound = document.getElementById('click-sound');
    const errorSound = document.getElementById('error-sound');

    const playSound = (audioElement) => {
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.log("Sound play prevented by browser"));
    };

    const themeBtn = document.getElementById('theme-btn');
    const body = document.getElementById('os-body');

    themeBtn.addEventListener('click', () => {
        playSound(clickSound);
        if (body.classList.contains('night-mode')) {
            body.classList.replace('night-mode', 'day-mode');
            themeBtn.textContent = 'Switch to Night Protocol';
        } else {
            body.classList.replace('day-mode', 'night-mode');
            themeBtn.textContent = 'Switch to Day Protocol';
        }
    });

    const stars = document.querySelectorAll('.star');
    const ratingFeedback = document.getElementById('rating-feedback');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            playSound(errorSound);
            currentRating = parseInt(e.target.getAttribute('data-value'));

            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= currentRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            if (currentRating <= 2) {
                ratingFeedback.textContent = "Threat level Low. Proceed with caution.";
                ratingFeedback.style.color = "#888";
            } else if (currentRating === 3) {
                ratingFeedback.textContent = "Threat level Moderate. Arm yourself.";
                ratingFeedback.style.color = "#ff8800";
            } else {
                ratingFeedback.textContent = "CRITICAL THREAT. EVACUATE IMMEDIATELY.";
                ratingFeedback.style.color = "#ff0000";
            }
        });
    });

    const databaseFiles = [
        { id: 1, title: "The Tall Man", category: "entity", desc: "A 2.5m tall humanoid. No face. Highly aggressive." },
        { id: 2, title: "Sector C Corridors", category: "location", desc: "Underground maintenance tunnels. Power is out." },
        { id: 3, title: "Flesh Mass", category: "entity", desc: "Organic corruption found in the underground labs." },
        { id: 4, title: "Control Room Alpha", category: "location", desc: "The only safe zone left. Blast doors are sealed." }
    ];

    const dbOutput = document.getElementById('database-output');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const renderDatabase = (dataArray) => {
        dbOutput.innerHTML = '';
        dataArray.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.classList.add('db-item', 'fade-in');
            fileElement.innerHTML = `
                <h4>[ID-${file.id}] ${file.title}</h4>
                <p>${file.desc}</p>
            `;
            dbOutput.appendChild(fileElement);
        });
    };

    renderDatabase(databaseFiles);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            playSound(clickSound);
            const category = e.target.getAttribute('data-category');
            let filteredData = [];

            switch (category) {
                case 'entity':
                    filteredData = databaseFiles.filter(file => file.category === 'entity');
                    break;
                case 'location':
                    filteredData = databaseFiles.filter(file => file.category === 'location');
                    break;
                case 'all':
                default:
                    filteredData = databaseFiles;
                    break;
            }

            renderDatabase(filteredData);
        });
    });

    const contactForm = document.getElementById('async-contact-form');
    const responseMsg = document.getElementById('async-response');

    const handleFormSuccess = (agentName) => {
        responseMsg.textContent = `Transmission received, Agent ${agentName}. Rescue is NOT coming.`;
        responseMsg.style.display = 'block';
        responseMsg.style.color = '#ff8800';
        contactForm.reset();
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playSound(clickSound);
        
        const agentName = document.getElementById('agent-name').value;
        
        setTimeout(() => {
            handleFormSuccess(agentName);
        }, 1000);
    });

    const navMenu = document.getElementById('keyboard-nav');
    const navItems = navMenu.querySelectorAll('.nav-item');
    let currentFocus = -1;

    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            playSound(clickSound);
            currentFocus++;
            if (currentFocus >= navItems.length) currentFocus = 0;
            navItems[currentFocus].focus();
        } 
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            playSound(clickSound);
            currentFocus--;
            if (currentFocus < 0) currentFocus = navItems.length - 1;
            navItems[currentFocus].focus();
        }
    });

});