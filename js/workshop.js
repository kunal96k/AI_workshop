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
            var phone = document.getElementById('popupPhone').value.trim();

            if (!name || !phone) return;

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

        if (!elDays) return;

        if (diff <= 0) {
            elDays.textContent = '00';
            elHours.textContent = '00';
            elMins.textContent = '00';
            elSecs.textContent = '00';
            const cdContainer = document.getElementById('wsCountdown');
            if (cdContainer) {
                cdContainer.querySelector('h4').textContent = 'Workshop Has Started!';
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

        if (!name || !email || !phone) return;

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

// ===== CHATBOT ENGINE =====
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
        greeting: "👋 Hi there! Welcome to Capernaum Solutions. I'm here to help you with our <b>FREE 2-Day AI Workshop</b> happening on <b>15-16 April 2026</b>. What would you like to know?",

        responses: {
            // Workshop details
            'workshop details': "🎓 <b>2 Days Free Workshop on Artificial Intelligence</b><br><br>📅 <b>Dates:</b> 15-16 April 2026<br>🕐 <b>Time:</b> 11:00 AM Onwards<br>📍 <b>Venue:</b> 507, 5th Floor, East Court Phoenix Mall, Viman Nagar, Pune - 411014<br>💰 <b>Fee:</b> Absolutely FREE!<br><br>Would you like to enroll?",

            // Schedule
            'schedule': "📋 <b>Workshop Schedule:</b><br><br><b>Day 1 (15 April):</b><br>• Introduction to Deep Learning, Machine Learning & AI<br>• SDLC (Software Development Life Cycle)<br>• Benefits and Scope of AI<br><br><b>Day 2 (16 April):</b><br>• ChatGPT & Generative AI<br>• Job Verticals in AI<br>• Live Project on AI<br><br>Both days start at 11:00 AM!",

            // Fees / Cost
            'fees': "💰 Great news! This workshop is <b>completely FREE</b>! There are no hidden charges. You just need to register and show up. We believe in making AI education accessible to everyone.",

            'free': "💰 Yes! This is a <b>completely FREE workshop</b> — no registration fee, no hidden charges. Just bring your curiosity and a laptop if you have one!",

            // Certificate
            'certificate': "🏆 Yes! All participants will receive an official <b>Participation Certificate</b> upon completing the 2-day workshop. It's a great addition to your resume and LinkedIn profile!",

            // Location / Venue
            'location': "📍 <b>Workshop Venue:</b><br><br>Capernaum Solutions Pvt. Ltd<br>507, 5th Floor, East Court Phoenix Mall,<br>Viman Nagar, Pune, Maharashtra - 411014<br><br>It's easily accessible and centrally located in Viman Nagar. You can use Google Maps for directions!",

            'venue': "📍 <b>Workshop Venue:</b><br><br>Capernaum Solutions Pvt. Ltd<br>507, 5th Floor, East Court Phoenix Mall,<br>Viman Nagar, Pune, Maharashtra - 411014<br><br>Landmark: Inside Phoenix Mall, East Court, 5th Floor.",

            // Registration / Enroll
            'register': "📝 To register for the workshop, simply scroll down to the <b>Enquiry Form</b> on this page and fill in your details. Or you can call us directly at <b>8956745093</b>.<br><br><a href='#ws-enquiry' style='color: var(--gold-dark); font-weight: 600;'>👉 Click here to go to the form</a>",

            'enroll': "📝 You can enroll right now! Just scroll down to the <b>registration form</b> below, or call <b>8956745093</b> to reserve your seat.<br><br><a href='#ws-enquiry' style='color: var(--gold-dark); font-weight: 600;'>👉 Click here to register</a>",

            'how to register': "📝 Registration is easy! You can:<br>1. Fill out the <a href='#ws-enquiry' style='color: var(--gold-dark); font-weight: 600;'>enquiry form</a> on this page<br>2. Call us at <b>8956745093</b><br>3. Visit our office at Viman Nagar, Pune<br><br>Seats are limited, so register early!",

            // Contact
            'contact': "📞 You can reach us at:<br><br>📱 <b>Phone:</b> <a href='tel:8956745093' style='color: var(--gold-dark); font-weight: 600;'>8956745093</a><br>📧 <b>Email:</b> info@capernaumsolutions.com<br>📍 <b>Visit:</b> 507, 5th Floor, East Court Phoenix Mall, Viman Nagar, Pune<br><br>Our team is available to answer all your questions!",

            'phone': "📱 Call us at <b><a href='tel:8956745093' style='color: var(--gold-dark); font-weight: 600;'>8956745093</a></b> for any queries about the workshop! Our team is happy to help.",

            // Prerequisites
            'prerequisites': "📚 <b>Prerequisites:</b><br><br>• No prior programming experience required!<br>• Basic computer knowledge is helpful<br>• Bring a laptop if possible (not mandatory)<br>• Enthusiasm to learn AI! 🚀<br><br>This workshop is designed for absolute beginners as well as intermediate learners.",

            'requirements': "📋 <b>What to bring:</b><br>• A laptop (recommended but not mandatory)<br>• A notebook for taking notes<br>• Your curiosity and eagerness to learn!<br><br>No prior programming experience is needed. We start from the basics!",

            // Who can attend
            'who can attend': "👥 This workshop is open to:<br><br>• College Students (any stream)<br>• Fresh Graduates<br>• Working Professionals<br>• Anyone interested in AI & Technology<br><br>Whether you're a beginner or have some experience, you'll find value in this workshop!",

            'eligibility': "✅ <b>Everyone is eligible!</b> This workshop is open to students, graduates, and working professionals from any background. No prior coding experience required!",

            // Timing
            'timing': "🕐 <b>Workshop Timing:</b><br><br>Both days (15 & 16 April) start at <b>11:00 AM</b> and run through the day with breaks for lunch and refreshments.<br><br>Please arrive 15 minutes early for registration on Day 1.",

            'time': "🕐 The workshop starts at <b>11:00 AM</b> on both days (15 & 16 April 2026). We recommend arriving by 10:45 AM on Day 1 for a smooth check-in.",

            // Date
            'date': "📅 The workshop is on <b>15th April 2026 (Tuesday)</b> and <b>16th April 2026 (Wednesday)</b>. Both days from 11:00 AM onwards.",

            'when': "📅 The workshop is scheduled for <b>15-16 April 2026</b> (Tuesday & Wednesday). Sessions start at <b>11:00 AM</b> each day.",

            // AI topics
            'what is ai': "🤖 <b>Artificial Intelligence (AI)</b> is the simulation of human intelligence by computer systems. It includes learning, reasoning, and self-correction.<br><br>In our workshop, you'll learn:<br>• Machine Learning<br>• Deep Learning<br>• ChatGPT & Generative AI<br>• Real-world AI applications<br><br>Join us to explore this exciting field!",

            'chatgpt': "💬 <b>ChatGPT</b> is a powerful AI language model by OpenAI. In Day 2 of our workshop, you'll get hands-on experience with ChatGPT, learn prompt engineering, and understand how generative AI is transforming industries!",

            'machine learning': "🧠 <b>Machine Learning</b> is a subset of AI where systems learn from data and improve without explicit programming. We cover ML fundamentals on Day 1, including supervised & unsupervised learning concepts.",

            'deep learning': "🧬 <b>Deep Learning</b> uses neural networks with multiple layers to analyze complex data patterns. We'll introduce you to the core concepts and architectures on Day 1 of the workshop.",

            // Career / Jobs
            'career': "💼 AI is one of the highest-paying fields in tech! Our workshop covers:<br><br>• Job Verticals in AI (Day 2)<br>• Skill-based Career Guidance<br>• Industry insights and trends<br><br>AI Engineers in India earn ₹8-30 LPA on average. This is the perfect time to start!",

            'jobs': "💼 <b>AI Career Opportunities:</b><br><br>• AI/ML Engineer<br>• Data Scientist<br>• NLP Engineer<br>• Computer Vision Engineer<br>• AI Research Scientist<br><br>We cover job verticals and career paths in detail on Day 2 of the workshop!",

            'salary': "💰 <b>AI Salary Ranges in India:</b><br><br>• Entry Level: ₹6-10 LPA<br>• Mid Level: ₹12-25 LPA<br>• Senior Level: ₹25-50+ LPA<br><br>AI professionals are among the highest-paid in the tech industry. Start your journey at our free workshop!",

            // Capernaum
            'about capernaum': "🏢 <b>Capernaum Solutions Pvt. Ltd</b> is a leading BPO & IT Solutions company offering training, placement, and technology services. We are committed to empowering careers through quality education and industry partnerships.",

            'about technokraft': "🏢 <b>TechnoKraft Training & Solution Pvt. Ltd</b> is our association partner for this workshop. They specialize in technology training and professional development. Visit them at <a href='https://tts.net.in/' target='_blank' style='color: var(--gold-dark); font-weight: 600;'>tts.net.in</a>",

            // Courses
            'courses': "📚 Besides this workshop, Capernaum Solutions also offers full courses in:<br><br>• Full Stack Java / Python / MERN / MEAN<br>• Data Science & AI<br>• Data Analytics<br>• Linux Administration<br>• App & Web Development<br>• CCNA Networking<br><br>Ask about any specific course!",

            // Thanks
            'thank': "😊 You're welcome! Is there anything else you'd like to know about the workshop? We're here to help!",

            'thanks': "😊 You're welcome! Feel free to ask if you have any more questions. See you at the workshop! 🎉",

            'bye': "👋 Goodbye! Looking forward to seeing you at the AI Workshop on 15-16 April! Don't forget to register. Have a great day! 🌟",

            // Seats
            'seats': "🪑 Seats are <b>limited</b> and filling up fast! We recommend registering as soon as possible to secure your spot. Registration is free, so don't wait!",

            'limited seats': "⚡ Yes, seats are limited! We can only accommodate a certain number of participants for a quality learning experience. <a href='#ws-enquiry' style='color: var(--gold-dark); font-weight: 600;'>Register now</a> before it's full!",

            // Lunch / Food
            'lunch': "🍽️ Light refreshments and snacks will be provided during the workshop breaks. For lunch, there are several food options available within and around Phoenix Mall.",

            // Language
            'language': "🗣️ The workshop will be conducted primarily in <b>English and Hindi</b> (bilingual) to ensure everyone can follow along comfortably.",

            // Laptop
            'laptop': "💻 Having a laptop is <b>recommended but not mandatory</b>. If you have one, please bring it for the hands-on session on Day 2. If you don't have one, you can still participate and learn!",

            // Online / Offline
            'online': "🏢 This is an <b>offline (in-person)</b> workshop held at our center in Viman Nagar, Pune. We believe in-person interaction leads to better learning. There is no online option for this particular workshop.",

            'offline': "✅ Yes, this is a completely <b>offline/in-person</b> workshop. You'll get face-to-face interaction with our expert instructors and fellow participants.",

            // Age
            'age': "👤 There's no strict age requirement. The workshop is suitable for anyone above 16 years — college students, graduates, and working professionals are all welcome!",

            // Help / default
            'help': "I can help you with:\n\n• 📋 Workshop Details & Schedule\n• 💰 Fees & Registration\n• 📍 Venue & Location\n• 🏆 Certificate Info\n• 📚 Prerequisites\n• 💼 Career Opportunities in AI\n• 📞 Contact Information\n\nJust type your question or tap a suggestion below!",
        },

        // Fallback response
        fallback: "🤔 I'm not sure about that, but I'm happy to help with workshop details! You can also call us directly at <b><a href='tel:8956745093' style='color: var(--gold-dark)'>8956745093</a></b> for specific queries.<br><br>Try asking about: workshop schedule, fees, venue, certificate, or registration.",
    };

    // Initial suggestions
    const initialSuggestions = [
        'Workshop Details',
        'Schedule',
        'Is it Free?',
        'How to Register?',
        'Location',
        'Certificate',
    ];

    const followUpSuggestions = [
        'Prerequisites',
        'Career in AI',
        'Contact',
        'Courses',
        'Who Can Attend?',
        'Timing',
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
            'workshop details': ['workshop', 'details', 'about workshop', 'tell me about', 'what is this', 'info'],
            'schedule': ['schedule', 'agenda', 'syllabus', 'curriculum', 'topics', 'what will', 'day 1', 'day 2', 'learn'],
            'fees': ['fee', 'fees', 'cost', 'price', 'charge', 'paid', 'payment', 'money', 'how much'],
            'free': ['free', 'no cost', 'complimentary', 'no charge'],
            'certificate': ['certificate', 'certification', 'certified', 'proof'],
            'location': ['location', 'address', 'where', 'place', 'directions', 'map'],
            'venue': ['venue', 'phoenix', 'mall', 'viman nagar', 'east court'],
            'register': ['register', 'registration', 'sign up', 'signup', 'book', 'reserve'],
            'enroll': ['enroll', 'enrolment', 'join', 'participate', 'apply'],
            'how to register': ['how to register', 'how can i register', 'how to join', 'how to enroll', 'how to apply'],
            'contact': ['contact', 'email', 'reach', 'support', 'connect'],
            'phone': ['phone', 'call', 'number', 'mobile', 'whatsapp'],
            'prerequisites': ['prerequisite', 'prerequisites', 'prior', 'needed', 'requirement', 'required', 'need to know', 'background'],
            'requirements': ['bring', 'carry', 'what to bring', 'materials'],
            'who can attend': ['who can', 'eligible', 'audience', 'for whom', 'target', 'can i attend', 'students', 'professionals'],
            'eligibility': ['eligibility', 'qualify', 'qualification'],
            'timing': ['timing', 'duration', 'how long', 'hours', 'start time'],
            'time': ['time', 'what time', 'when does', 'starts at'],
            'date': ['date', 'which date', 'on which'],
            'when': ['when', 'which day', 'april'],
            'what is ai': ['what is ai', 'what is artificial intelligence', 'explain ai', 'define ai'],
            'chatgpt': ['chatgpt', 'chat gpt', 'gpt', 'openai', 'generative'],
            'machine learning': ['machine learning', 'ml'],
            'deep learning': ['deep learning', 'neural network', 'dl'],
            'career': ['career', 'future', 'scope', 'growth', 'opportunity'],
            'jobs': ['job', 'jobs', 'employment', 'hiring', 'placement', 'role', 'roles'],
            'salary': ['salary', 'pay', 'package', 'lpa', 'ctc', 'income', 'earning'],
            'about capernaum': ['capernaum', 'your company', 'organizer'],
            'about technokraft': ['technokraft', 'tts', 'association', 'partner'],
            'courses': ['course', 'courses', 'training', 'programs', 'full stack', 'data science'],
            'thank': ['thank', 'thank you', 'thanks a lot', 'appreciated'],
            'thanks': ['thanks', 'thx', 'ty'],
            'bye': ['bye', 'goodbye', 'see you', 'later', 'good night', 'good day'],
            'seats': ['seats', 'seat', 'capacity', 'how many people', 'available'],
            'limited seats': ['limited', 'filling', 'full'],
            'lunch': ['lunch', 'food', 'refreshments', 'snacks', 'meals', 'tea', 'breakfast'],
            'language': ['language', 'hindi', 'english', 'marathi', 'medium'],
            'laptop': ['laptop', 'computer', 'pc', 'system', 'device'],
            'online': ['online', 'virtual', 'zoom', 'teams', 'remote', 'webinar'],
            'offline': ['offline', 'in-person', 'in person', 'physical', 'face to face'],
            'age': ['age', 'old', 'young', 'age limit', 'minor'],
            'help': ['help', 'what can you', 'options', 'menu', 'assist'],
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
            return "Great! 😊 Feel free to ask anything about the workshop — schedule, venue, registration, certificates, or career opportunities in AI!";
        }

        // No
        if (/^(no|nope|nah)$/.test(lower)) {
            return "No worries! If you have any questions later, I'm always here to help. You can also call us at <b>8956745093</b>. Have a great day! 😊";
        }

        return KB.fallback;
    }

    // ---- FAQ Accordion ----
    (function () {
        const faqItems = document.querySelectorAll('.ws-faq-item');
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.ws-faq-question');
            const answer = item.querySelector('.ws-faq-answer');
            if (questionBtn && answer) {
                questionBtn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.ws-faq-answer').style.maxHeight = null;
                        otherItem.querySelector('.ws-faq-answer').style.paddingTop = '0';
                    });
                    
                    // Open if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 30 + "px";
                        answer.style.paddingTop = '10px';
                    }
                });
            }
        });
    })();

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
