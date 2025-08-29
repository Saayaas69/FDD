document.addEventListener('DOMContentLoaded', function() {

    /* ========================
       Team Data
    ======================== */
    const teamData = {
        football: {
            name: "University Football Team",
            image: "images/teams/football.jpg",
            overview: "Our championship-winning football team has a rich history of success in university leagues. Known for their attacking style and strong teamwork, they continue to dominate the field with tactical excellence and unwavering determination.",
            achievements: [
                "League Champions 2024",
                "Cup Winners 2023", 
                "Best Offensive Team 2024",
                "Record for Most Goals in a Season"
            ],
            matches: [
                { date: "2/15/2025", opponent: "City University", venue: "Home" },
                { date: "2/22/2025", opponent: "State College", venue: "Away" },
                { date: "3/1/2025", opponent: "Tech Institute", venue: "Home" },
                { date: "3/8/2025", opponent: "Metro University", venue: "Away" }
            ]
        },
        basketball: {
            name: "University Basketball Team", 
            image: "images/teams/basketball.jpg",
            overview: "Our basketball team represents the pinnacle of athletic excellence and strategic gameplay. With lightning-fast plays and exceptional teamwork, they've secured their position as the top team in Division A.",
            achievements: [
                "Division A Champions 2024",
                "Tournament Winners 2023",
                "Most Valuable Team Award 2024",
                "Highest Scoring Average 2024"
            ],
            matches: [
                { date: "2/18/2025", opponent: "Central College", venue: "Home" },
                { date: "2/25/2025", opponent: "River University", venue: "Away" },
                { date: "3/4/2025", opponent: "Mountain State", venue: "Home" },
                { date: "3/11/2025", opponent: "Valley Tech", venue: "Away" }
            ]
        },
        swimming: {
            name: "University Swimming Team",
            image: "images/teams/swimming.jpg", 
            overview: "Our swimming team dominates the pool with record-breaking performances and unmatched dedication. Their commitment to excellence has earned them numerous medals and recognition at national level competitions.",
            achievements: [
                "National Championship Gold 2024",
                "Regional Champions 2023-2024",
                "15 Individual Medals 2024",
                "Team Spirit Award 2024"
            ],
            matches: [
                { date: "2/20/2025", opponent: "Aquatic Institute", venue: "Home" },
                { date: "2/27/2025", opponent: "Coastal University", venue: "Away" },
                { date: "3/6/2025", opponent: "Marine College", venue: "Home" },
                { date: "3/13/2025", opponent: "Pacific State", venue: "Away" }
            ]
        },
        tennis: {
            name: "University Tennis Team",
            image: "images/teams/tennis.jpg",
            overview: "Our tennis team combines precision, power, and strategic thinking to deliver outstanding performances. With dedicated training and professional coaching, they continue to climb the rankings in competitive university tennis.",
            achievements: [
                "Regional Semi-Finalists 2024",
                "Doubles Champions 2023",
                "Most Improved Team 2024",
                "Fair Play Award 2024"
            ],
            matches: [
                { date: "2/16/2025", opponent: "Tennis Academy", venue: "Home" },
                { date: "2/23/2025", opponent: "Court Masters", venue: "Away" },
                { date: "3/2/2025", opponent: "Racquet Club", venue: "Home" },
                { date: "3/9/2025", opponent: "Serve University", venue: "Away" }
            ]
        },
        cricket: {
            name: "University Cricket Team",
            image: "images/teams/cricket.jpg",
            overview: "Our cricket team showcases exceptional batting, bowling, and fielding skills. With a perfect blend of experienced players and rising talents, they consistently deliver thrilling matches and sporting excellence.",
            achievements: [
                "Inter-University Trophy 2024",
                "Best Bowling Attack 2023",
                "Highest Team Score Record",
                "Sportsmanship Award 2024"
            ],
            matches: [
                { date: "2/19/2025", opponent: "Cricket College", venue: "Home" },
                { date: "2/26/2025", opponent: "Wicket University", venue: "Away" },
                { date: "3/5/2025", opponent: "Boundary State", venue: "Home" },
                { date: "3/12/2025", opponent: "Stumps Institute", venue: "Away" }
            ]
        },
        badminton: {
            name: "University Badminton Team",
            image: "images/teams/badminton.jpg",
            overview: "Our badminton team combines speed, agility, and precision to deliver exceptional performances. With skilled doubles and singles players, they represent our university with pride in regional and national tournaments.",
            achievements: [
                "Regional Championships Bronze 2024",
                "Doubles Tournament Winners 2023",
                "Most Improved Team 2024",
                "University Sports Spirit Award 2024"
            ],
            matches: [
                { date: "2/14/2025", opponent: "Shuttle Academy", venue: "Home" },
                { date: "2/21/2025", opponent: "Racquet University", venue: "Away" },
                { date: "2/28/2025", opponent: "Smash College", venue: "Home" },
                { date: "3/7/2025", opponent: "Net Institute", venue: "Away" }
            ]
        }
    };

    /* ========================
       Simple Card Display - No Complex Animations
    ======================== */
    // Ensure all team cards are visible
    document.querySelectorAll('.team-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });

    /* ========================
       Modal Functionality
    ======================== */
    const modal = document.getElementById('teamModal');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    // Elements to populate
    const modalTeamImage = document.getElementById('modalTeamImage');
    const modalTeamName = document.getElementById('modalTeamName');
    const modalTeamOverview = document.getElementById('modalTeamOverview');
    const achievementsList = document.getElementById('achievementsList');
    const matchesList = document.getElementById('matchesList');

    // Open modal function
    function openModal(teamKey) {
        const team = teamData[teamKey];
        if (!team) return;

        // Populate modal content
        modalTeamImage.src = team.image;
        modalTeamImage.alt = team.name;
        modalTeamName.textContent = team.name;
        modalTeamOverview.textContent = team.overview;

        // Clear and populate achievements
        achievementsList.innerHTML = '';
        team.achievements.forEach(achievement => {
            const achievementItem = document.createElement('div');
            achievementItem.className = 'achievement-item';
            achievementItem.textContent = achievement;
            achievementsList.appendChild(achievementItem);
        });

        // Clear and populate matches
        matchesList.innerHTML = '';
        team.matches.forEach(match => {
            const matchRow = document.createElement('div');
            matchRow.className = 'match-row';
            matchRow.innerHTML = `
                <span>${match.date}</span>
                <span>${match.opponent}</span>
                <span>${match.venue}</span>
            `;
            matchesList.appendChild(matchRow);
        });

        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for modal
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ========================
       View Details Button Clicks with Enhanced Debugging
    ======================== */
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details-btn')) {
            e.preventDefault();
            const teamKey = e.target.getAttribute('data-team');
            console.log('Clicked team:', teamKey); // Debug log
            
            if (teamKey && teamData[teamKey]) {
                openModal(teamKey);
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                e.target.appendChild(ripple);

                const rect = e.target.getBoundingClientRect();
                ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
                ripple.style.left = e.clientX - rect.left - (ripple.offsetWidth / 2) + 'px';
                ripple.style.top = e.clientY - rect.top - (ripple.offsetHeight / 2) + 'px';

                ripple.addEventListener('animationend', () => {
                    ripple.remove();
                });
            } else {
                console.error('Team data not found for:', teamKey);
            }
        }
    });

    /* ========================
       Team Card Hover Effects
    ======================== */
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.team-sport-icon');
            if (icon) {
                icon.style.animation = 'bounce 1s ease-in-out';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.team-sport-icon');
            if (icon) {
                icon.style.animation = 'bounce 2s infinite';
            }
        });
    });

    /* ========================
       Stat Number Animation on Hover
    ======================== */
    document.querySelectorAll('.stat-item').forEach(statItem => {
        statItem.addEventListener('mouseenter', function() {
            const statNumber = this.querySelector('.stat-number');
            const originalNumber = statNumber.textContent;
            
            // Simple counting animation effect
            if (!isNaN(parseInt(originalNumber))) {
                let currentNumber = 0;
                const targetNumber = parseInt(originalNumber);
                const increment = Math.ceil(targetNumber / 20);
                
                const countingInterval = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(countingInterval);
                    }
                    statNumber.textContent = currentNumber + (originalNumber.includes('+') ? '+' : '');
                }, 50);
            }
        });
    });

    /* ========================
       Smooth scroll for any anchor links within the page
    ======================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ========================
       Add loading animation to images
    ======================== */
    document.querySelectorAll('.team-image img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    /* ========================
       Accessibility improvements
    ======================== */
    // Focus management for modal
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });

    // When modal opens, focus the close button
    const originalOpenModal = openModal;
    openModal = function(teamKey) {
        originalOpenModal(teamKey);
        setTimeout(() => {
            modalClose.focus();
        }, 100);
    };
});