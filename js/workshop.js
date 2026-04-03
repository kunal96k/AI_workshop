// ============================================================
// AI WORKSHOP — COUNTDOWN + FORM + CHATBOT + POPUP
// Capernaum Solutions — Designed by TechnoKraft
// ============================================================

// ===== POPUP ENQUIRY FORM =====
(function () {
    const overlay = document.getElementById('wsPopupOverlay');
    const closeBtn = document.getElementById('wsPopupClose');
    const form = document.getElementById('wsPopupForm');
    const formBody = document.getElementById('wsPopupFormBody');
    const successEl = document.getElementById('wsPopupSuccess');
    const submitBtn = document.getElementById('wsPopupSubmitBtn');

    if (!overlay) return;

    function openPopup() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Show popup after preloader finishes (2.5 seconds after load)
    setTimeout(function () {
        openPopup();
    }, 2500);

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // Close on overlay click (outside modal)
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closePopup();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup();
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('popupName').value.trim();
            var email = document.getElementById('popupEmail').value.trim();
            var phone = document.getElementById('popupPhone').value.trim();
            var course = document.getElementById('popupCourse').value;

            if (!name || !email || !phone || !course) {
                alert('Please fill in all required fields.');
                return;
            }

            if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> Submitting...';

            setTimeout(function () {
                formBody.style.display = 'none';
                if (successEl) successEl.classList.add('active');

                // Auto-close popup after showing success
                setTimeout(closePopup, 3000);
            }, 1200);
        });
    }
})();


(function () {
    const workshopDate = new Date('2026-04-15T11:00:00+05:30').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = workshopDate - now;

        const elDays = document.getElementById('cdDays');
        const elHours = document.getElementById('cdHours');
        const elMins = document.getElementById('cdMins');
        const elSecs = document.getElementById('cdSecs');

        if (!elDays || !elHours || !elMins || !elSecs) return;

        if (diff <= 0) {
            elDays.textContent = '00';
            elHours.textContent = '00';
            elMins.textContent = '00';
            elSecs.textContent = '00';
            const cdContainer = document.getElementById('wsCountdown');
            if (cdContainer) {
                const header = cdContainer.querySelector('h4');
                if (header) header.textContent = 'Workshop Has Started!';
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        elDays.textContent = String(days).padStart(2, '0');
        elHours.textContent = String(hours).padStart(2, '0');
        elMins.textContent = String(mins).padStart(2, '0');
        elSecs.textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();

// ===== ENQUIRY FORM =====
(function () {
    const form = document.getElementById('workshopForm');
    const successEl = document.getElementById('wsFormSuccess');
    const submitBtn = document.getElementById('wsSubmitBtn');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('wsName').value.trim();
        const email = document.getElementById('wsEmail').value.trim();
        const phone = document.getElementById('wsPhone').value.trim();
        const course = document.getElementById('wsCourse').value;

        if (!name || !email || !phone || !course) {
            alert('Please fill in all required fields, including selecting a course.');
            return;
        }

        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        // Simulate submission
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> Submitting...';

        setTimeout(function () {
            form.style.display = 'none';
            if (successEl) successEl.classList.add('active');
        }, 1500);
    });
})();

// ===== FLOATING CTA & CHATBOT VISIBILITY =====
(function () {
    const floatingCta = document.getElementById('wsFloatingCta');
    const chatbot = document.getElementById('wsChatbot');

    window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;
        if (scrollY > 600) {
            if (floatingCta) floatingCta.style.transform = 'translateY(0)';
            if (chatbot && !chatbot.classList.contains('open')) chatbot.style.transform = 'translateY(0)';
        } else {
            if (floatingCta) floatingCta.style.transform = 'translateY(150%)';
            if (chatbot && !chatbot.classList.contains('open')) chatbot.style.transform = 'translateY(200px)';
        }
    });

    // Initially hidden
    if (floatingCta) {
        floatingCta.style.transform = 'translateY(150%)';
        floatingCta.style.transition = 'transform 0.4s ease';
    }
    if (chatbot) {
        chatbot.style.transform = 'translateY(200px)';
        chatbot.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    }
})();

// ===== CHATBOT ENGINE (Disabled per user request) =====
/*
(function () {
    const chatbot = document.getElementById('wsChatbot');
    const toggle = document.getElementById('wsChatToggle');
    const closeBtn = document.getElementById('wsChatClose');
    const chatBody = document.getElementById('wsChatBody');
    const chatInput = document.getElementById('wsChatInput');
    const sendBtn = document.getElementById('wsChatSend');
    const suggestionsContainer = document.getElementById('wsChatSuggestions');

    if (!chatbot || !toggle) return;
...
})();
*/
/*
(function () {
    const chatbot = document.getElementById('wsChatbot');
    const toggle = document.getElementById('wsChatToggle');
    const closeBtn = document.getElementById('wsChatClose');
    const chatBody = document.getElementById('wsChatBody');
    const chatInput = document.getElementById('wsChatInput');
    const sendBtn = document.getElementById('wsChatSend');
    const suggestionsContainer = document.getElementById('wsChatSuggestions');

    if (!chatbot || !toggle) return;

    // ---- Knowledge Base ----
    const KB = {
        greeting: "👋 Hi there! Welcome to Capernaum Solutions. I'm here to help you with our <b>Job-Oriented IT Training & Placements</b>. Which course would you like to explore today?",

        responses: {
            // Institute details
            'institute details': "🎓 <b>Capernaum Solutions</b> is Pune's leading IT training center.<br><br>📍 <b>Venue:</b> 507, 5th Floor, East Court Phoenix Mall, Viman Nagar, Pune - 411014<br>✅ <b>Courses:</b> Java, Python, MERN, Data Science, AI, App Dev, CCNA.<br>💼 <b>Placements:</b> 100% Support with hiring partners like TCS, Infosys, and more.<br><br>Would you like to speak with a counselor?",

            // Schedule
            'schedule': "📋 <b>Batch Timings:</b><br><br>🕒 <b>Morning Batch:</b> 10:00 AM - 12:30 PM<br>🕑 <b>Afternoon Batch:</b> 2:00 PM - 4:30 PM<br>🕕 <b>Evening Batch:</b> 6:30 PM - 8:30 PM<br><br>We also have special <b>Weekend Batches</b> for working professionals!",

            // Fees / Cost
            'fees': "💰 Our course fees are highly competitive and include training, projects, and placement support. We also offer <b>No-Cost EMI</b> options and scholarships for meritorious students. Please fill the enquiry form for a detailed fee structure of your preferred course.",

            'free': "🎁 We offer <b>Free Demo Sessions</b> for all our courses! You can experience the training quality first-hand before enrolling. Simply register on the website to book your slot.",

            // Certificate
            'certificate': "🏆 Yes! Upon successful completion of the course and projects, you will receive an <b>Industry-Recognized Professional Certification</b> from Capernaum Solutions and TechnoKraft.",

            // Location / Venue
            'location': "📍 <b>Institute Address:</b><br><br>Capernaum Solutions Pvt. Ltd<br>507, 5th Floor, East Court Phoenix Mall,<br>Viman Nagar, Pune, Maharashtra - 411014<br><br>It's easily accessible and centrally located in Viman Nagar. You can use Google Maps for directions!",

            'venue': "📍 <b>How to reach us:</b><br><br>Capernaum Solutions Pvt. Ltd<br>507, 5th Floor, East Court Phoenix Mall,<br>Viman Nagar, Pune, Maharashtra - 411014<br><br>Landmark: Inside Phoenix Mall, East Court, 5th Floor.",

            // Registration / Enroll
            'register': "📝 To register for any course or book a demo, simply scroll down to the <b>Enquiry Form</b> at the bottom of this page and fill in your details. or call <b>8956745093</b>.",

            'enroll': "📝 Ready to start your career? Just scroll down to the <b>registration form</b> below or visit us in Viman Nagar to enroll today!",

            'how to register': "📝 Registration is simple:<br>1. Choose your <a href='#ws-enquiry' style='color: var(--gold-dark); font-weight: 600;'>Course</a><br>2. Fill the enquiry form<br>3. Visit us for counseling<br>4. Begin your training!<br><br>Batches start every month!",

            // Contact
            'contact': "📞 Contact Details:<br><br>📱 <b>Phone:</b> <a href='tel:8956745093' style='color: var(--gold-dark); font-weight: 600;'>8956745093</a><br>📧 <b>Email:</b> info@capernaumsolutions.com<br>📍 <b>Visit:</b> 507, 5th Floor, East Court Phoenix Mall, Viman Nagar, Pune<br><br>Our team is available from 9 AM to 8 PM!",

            'phone': "📱 Call us at <b><a href='tel:8956745093' style='color: var(--gold-dark); font-weight: 600;'>8956745093</a></b> for any admissions-related queries!",

            // Timing
            'timing': "🕒 We have flexible timings to accommodate students and professionals. Batches run from <b>10:00 AM to 8:30 PM</b>. Weekday and Weekend options available.",

            'time': "🕒 Current batches start at 10 AM, 2 PM, and 6:30 PM. Each session is approximately 2.5 hours.",

            // Date
            'date': "📅 Admissions are currently open for the <b>new batch starting this month!</b> Check the hero section for the exact start date.",

            'when': "📅 <b>New Batches</b> start twice every month. Enroll now to secure your seat!",

            // AI topics
            'what is ai': "🤖 <b>Artificial Intelligence (AI)</b> is a core part of our Data Science & AI course. You'll learn everything from fundamentals to advanced Generative AI and ChatGPT integration.",

            'chatgpt': "💬 We teach <b>ChatGPT and Prompt Engineering</b> as part of our modern IT curriculum, helping you leverage AI tools to code faster and work smarter!",

            'machine learning': "🧠 Our <b>Machine Learning</b> module covers Supervised, Unsupervised, and Reinforcement Learning with hands-on projects in Python.",

            // Career / Jobs
            'career': "💼 IT is the most rewarding career path today! Our training ensures you have the skills needed for high-paying roles like Full Stack Developer, Data Scientist, or AI Engineer.",

            'jobs': "💼 <b>Placement Assistance:</b><br><br>We provide 100% support including:<br>• Mock Interviews<br>• Resume Design<br>• Soft Skills Training<br>• Direct Interview Referrals",

            'salary': "💰 <b>Market Salaries:</b><br><br>• Freshers: ₹4-8 LPA<br>• 2+ Years Exp: ₹10-18 LPA<br>• Lead Roles: ₹25+ LPA<br><br>The right skills lead to the right package!",

            // Capernaum
            'about capernaum': "🏢 <b>Capernaum Solutions Pvt. Ltd</b> is a premium IT training and BPO solutions institute in Pune. We focus on outcome-based education and real-world results.",

            'about technokraft': "🏢 <b>TechnoKraft</b> is our strategic partner for industrial training and placement solutions. Together, we ensure our students are 100% industry-ready.",

            // Courses
            'courses': "📚 Our core programs include:<br><br>• Full Stack Java / Python<br>• MERN Stack Development<br>• Data Science & AI<br>• App Development (Flutter/React Native)<br>• CCNA Networking<br><br>Select a course in the enquiry form to get the full syllabus!",

            // Help / default
            'help': "I can assist you with:\n\n• 📋 Course Details & Fees\n• 🎓 Placement Support\n• 📅 Batch Timings\n• 📍 Location & Contact\n\nWhat can I help you with today?",
        },

        // Fallback response
        fallback: "🤔 I'm not sure about that specific query. You can call our counselor directly at <b><a href='tel:8956745093' style='color: var(--gold-dark)'>8956745093</a></b> for expert guidance!<br><br>Try asking about: courses, fees, placements, or batch timings.",
    };

    // Initial suggestions
    const initialSuggestions = [
        'Course Details',
        'Placement Support',
        'Batch Timings',
        'How to Register?',
        'Institute Location',
        'Certification',
    ];

    const followUpSuggestions = [
        'Job Roles',
        'Fees Structure',
        'Contact Counselor',
        'Browse Courses',
        'Weekend Batches',
        'Career Path',
    ];

    // ---- State ----
    let isOpen = false;
    let hasGreeted = false;

    // ---- Toggle Chat ----
    toggle.addEventListener('click', function () {
        isOpen = !isOpen;
        chatbot.classList.toggle('open', isOpen);
        if (isOpen && !hasGreeted) {
            hasGreeted = true;
            setTimeout(function () {
                showTyping();
                setTimeout(function () {
                    removeTyping();
                    addBotMessage(KB.greeting);
                    showSuggestions(initialSuggestions);
                }, 1200);
            }, 400);
        }
        if (isOpen) {
            setTimeout(function () { chatInput.focus(); }, 400);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            isOpen = false;
            chatbot.classList.remove('open');
        });
    }

    // ---- Send Message ----
    function sendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        chatInput.value = '';

        // Process after short delay
        showTyping();
        setTimeout(function () {
            removeTyping();
            const response = getResponse(text);
            addBotMessage(response);
            showSuggestions(followUpSuggestions);
        }, 800 + Math.random() * 800);
    }

    sendBtn.addEventListener('click', sendUserMessage);
    chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendUserMessage();
        }
    });

    // ---- Response Matching ----
    function getResponse(input) {
        const lower = input.toLowerCase().trim();

        // Direct key match
        for (const key in KB.responses) {
            if (lower === key) {
                return KB.responses[key];
            }
        }

        // Keyword matching with scoring
        let bestMatch = null;
        let bestScore = 0;

        const keywordMap = {
            'course details': ['course', 'syllabus', 'curriculum', 'learning', 'modules', 'topics', 'what will i learn', 'training'],
            'schedule': ['schedule', 'batch timings', 'time', 'batches', 'timings', 'morning batch', 'evening batch', 'afternoon batch'],
            'fees': ['fees', 'cost', 'fee structure', 'price', 'payment', 'charge', 'emi'],
            'free': ['free', 'demo', 'trial', 'free class', 'complimentary'],
            'certificate': ['certificate', 'certification', 'internship', 'proof'],
            'location': ['location', 'address', 'where', 'place', 'directions', 'office'],
            'venue': ['venue', 'phoenix', 'mall', 'viman nagar', 'east court'],
            'register': ['register', 'registration', 'enroll', 'enrolment', 'sign up', 'book'],
            'contact': ['contact', 'call', 'phone', 'email', 'reach', 'number'],
            'career': ['career', 'future', 'scope', 'growth', 'opportunity', 'placement', 'job'],
            'courses': ['courses', 'full stack', 'data science', 'ai', 'mern', 'app dev', 'ccna', 'linux'],
            'thank': ['thank', 'thanks', 'ty'],
            'bye': ['bye', 'goodbye', 'see you'],
            'help': ['help', 'assist', 'options', 'menu'],
        };

        for (const responseKey in keywordMap) {
            const keywords = keywordMap[responseKey];
            let score = 0;
            for (const kw of keywords) {
                if (lower.includes(kw)) {
                    score += kw.length; // longer matches = higher score
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = responseKey;
            }
        }

        if (bestMatch && bestScore >= 3) {
            return KB.responses[bestMatch];
        }

        // Greeting patterns
        if (/^(hi|hello|hey|hii|heyy|good morning|good afternoon|good evening|namaste)/.test(lower)) {
            return KB.greeting;
        }

        // Yes / OK
        if (/^(yes|yep|yeah|ok|okay|sure|yea|ya)$/.test(lower)) {
            return "Great! 😊 Feel free to ask anything about our courses, fees structure, placements, or how to register for a free demo!";
        }

        // No
        if (/^(no|nope|nah)$/.test(lower)) {
            return "No worries! If you have any questions later, I'm always here to help. You can also call us at <b>8956745093</b>. Have a great day! 😊";
        }

        return KB.fallback;
    }

    // ---- FAQ Accordion (Moved here) ----
})();

// ===== FAQ ACCORDION ENGINE (Event Delegation Model) =====
(function () {
    // Delegated click handler on document to ensure reliability
    document.addEventListener('click', function(e) {
        const questionBtn = e.target.closest('.ws-faq-question');
        if (!questionBtn) return;

        const item = questionBtn.closest('.ws-faq-item');
        const answer = item.querySelector('.ws-faq-answer');
        if (!answer) return;

        const isActive = item.classList.contains('active');
        
        // Close other items in the same list
        const parentList = item.closest('.ws-faq-list');
        if (parentList) {
            parentList.querySelectorAll('.ws-faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.ws-faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                        otherAnswer.style.paddingTop = '0';
                    }
                }
            });
        }
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = (answer.scrollHeight + 50) + "px";
            answer.style.paddingTop = '10px';
        } else {
            item.classList.remove('active');
            answer.style.maxHeight = null;
            answer.style.paddingTop = '0';
        }
    });

    // Optional: Re-calculate heights on window resize
    window.addEventListener('resize', function() {
        document.querySelectorAll('.ws-faq-item.active .ws-faq-answer').forEach(answer => {
            answer.style.maxHeight = (answer.scrollHeight + 50) + "px";
        });
    });
})();

/*
(function () {
    // ---- DOM Helpers ----
    function addBotMessage(html) {
        const msg = document.createElement('div');
        msg.className = 'ws-msg ws-msg-bot';
        msg.innerHTML = `
            <div class="ws-msg-avatar"><img src="images/favicon.png" alt="Bot"></div>
            <div class="ws-msg-bubble">${html}</div>
        `;
        chatBody.appendChild(msg);
        scrollToBottom();
    }

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'ws-msg ws-msg-user';
        msg.innerHTML = `
            <div class="ws-msg-bubble">${escapeHtml(text)}</div>
        `;
        chatBody.appendChild(msg);
        scrollToBottom();
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'ws-msg ws-msg-bot ws-msg-typing';
        typing.innerHTML = `
            <div class="ws-msg-avatar"><img src="images/capernaum_12.png" alt="Bot"></div>
            <div class="ws-msg-bubble">
                <div class="ws-typing">
                    <div class="ws-typing-dot"></div>
                    <div class="ws-typing-dot"></div>
                    <div class="ws-typing-dot"></div>
                </div>
            </div>
        `;
        chatBody.appendChild(typing);
        scrollToBottom();
    }

    function removeTyping() {
        const typing = chatBody.querySelector('.ws-msg-typing');
        if (typing) typing.remove();
    }

    function showSuggestions(items) {
        if (!suggestionsContainer) return;
        suggestionsContainer.innerHTML = '';
        items.forEach(function (item) {
            const btn = document.createElement('button');
            btn.className = 'ws-suggest-btn';
            btn.textContent = item;
            btn.addEventListener('click', function () {
                addUserMessage(item);
                showTyping();
                setTimeout(function () {
                    removeTyping();
                    const response = getResponse(item);
                    addBotMessage(response);
                    // Rotate suggestions
                    const nextSuggestions = items === initialSuggestions ? followUpSuggestions : initialSuggestions;
                    showSuggestions(nextSuggestions);
                }, 600 + Math.random() * 600);
            });
            suggestionsContainer.appendChild(btn);
        });
    }

    function scrollToBottom() {
        if (chatBody) {
            requestAnimationFrame(function () {
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();
*/

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});
