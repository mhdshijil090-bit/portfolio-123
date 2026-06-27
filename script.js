/* ==========================================================================
   SHIJIL.SEC - Custom JavaScript (Premium Portfolio Engine)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at the end of the word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }
        setTimeout(type, 1000);
    }

    // --- Interactive Mobile Nav Navigation ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'rgba(10, 11, 13, 0.95)';
                navMenu.style.padding = '20px';
                navMenu.style.borderBottom = '1px solid rgba(0, 240, 255, 0.1)';
            } else {
                icon.className = 'fa-solid fa-bars';
                navMenu.style.display = '';
            }
        });

        // Close mobile nav when link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                navMenu.style.display = '';
            });
        });
    }

    // --- Active Link Observer ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- Copy to Clipboard Visual Handlers ---
    const copyCards = document.querySelectorAll('.contact-item-card[data-copy]');
    copyCards.forEach(card => {
        card.addEventListener('click', async () => {
            const textToCopy = card.getAttribute('data-copy');
            const copyHintIcon = card.querySelector('.copy-hint i');
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Show visual feedback
                const origClass = copyHintIcon.className;
                copyHintIcon.className = 'fa-solid fa-check';
                copyHintIcon.style.color = '#39ff14';
                
                // Create a temporary toast/bubble alert inside card
                const toast = document.createElement('span');
                toast.textContent = 'COPIED!';
                toast.style.position = 'absolute';
                toast.style.right = '45px';
                toast.style.fontSize = '0.75rem';
                toast.style.color = '#39ff14';
                toast.style.fontFamily = 'var(--font-mono)';
                toast.style.fontWeight = 'bold';
                card.appendChild(toast);
                
                setTimeout(() => {
                    copyHintIcon.className = origClass;
                    copyHintIcon.style.color = '';
                    toast.remove();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });

    // --- Contact Form Transmit Handler ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Simulating packet transmission
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-satellite-dish fa-spin"></i> TRANSMITTING DATA...';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                formStatus.className = 'form-status-msg success';
                formStatus.innerHTML = '[✓] TRANSMISSION SUCCESSFUL: Payload delivered safely to Mohamed Shijil P.';
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
            }, 1500);
        });
    }

    // --- Interactive Terminal Simulator Engine ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalBody = document.getElementById('interactive-terminal-body');

    // Focus terminal input on click inside terminal console
    if (terminalBody && terminalInput) {
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                executeTerminalCommand(command);
                terminalInput.value = '';
            }
        });
    }

    const commandRegistry = {
        'help': `Available Shell Commands:
  [+] <span class="highlight-cmd">about</span>     - Outputs a briefing of Mohamed Shijil P
  [+] <span class="highlight-cmd">skills</span>    - Displays detailed tool & security registries
  [+] <span class="highlight-cmd">projects</span>  - Prints log entries on recent security project
  [+] <span class="highlight-cmd">education</span> - Prints academic credentials
  [+] <span class="highlight-cmd">contact</span>   - Displays encrypted contact records
  [+] <span class="highlight-cmd">clear</span>     - Purges command history records
  [+] <span class="highlight-cmd">linkedin</span>  - Displays professional social link`,

        'about': `[+] INITIATING BIO DECRYPTION...
--------------------------------------------------
* Full Name: Mohamed Shijil P
* Objective: Motivated and detail-oriented entry-level cybersecurity professional.
* Target: Strengthening network & application integrity via assessment workflows.
* Experience: Hands-on scanning (Nmap, Nessus) and basic web penetration tests.
--------------------------------------------------`,

        'skills': `[+] SECURITY TOOL & REGISTRY LOGS:
--------------------------------------------------
* Assessment:  Vulnerability Assessments, Pen Testing, Port Mapping
* Tools:       Nmap, Nessus, Burp Suite (Basic), Wireshark (Basic)
* Standards:   OWASP Top 10 (SQLi, XSS, Authentication Issues)
* Platform:    Kali Linux, Network Protocols, Password Hygiene
--------------------------------------------------`,

        'projects': `[+] SCANNING PROJECTS ENGINE...
--------------------------------------------------
* Project:   Vulnerability Assessment & Password Security
* Tools:     Nmap, Nessus, Burp Suite proxy
* Scope:     Conducted network mapping and service enumeration; categorized 
             risk levels; intercepted HTTP requests; suggested mitigations.
* Outcome:   Built robust foundations in risk analysis and threat models.
--------------------------------------------------`,

        'education': `[+] RETRIEVING ACADEMIC RECORDS...
--------------------------------------------------
* Yenepoya University:
  - Bachelor of Computer Application (BCA)
* GVHSS, Malampuzha Higher Secondary School:
  - Higher Secondary Education
--------------------------------------------------`,

        'contact': `[+] DECRYPTING SECURE CONTACT LOGS:
--------------------------------------------------
* Email:      Mhdshijil090@gmail.com
* Phone:      8848983740
* Location:   Bangalore, India
* LinkedIn:   www.linkedin.com/in/mohamed-shijil-48a53a310
--------------------------------------------------`,

        'linkedin': `Opening link: <a href="https://www.linkedin.com/in/mohamed-shijil-48a53a310" target="_blank" class="highlight-cmd">LinkedIn Profile</a>...`
    };

    function executeTerminalCommand(cmd) {
        if (!terminalHistory) return;

        const cmdLower = cmd.toLowerCase().trim();
        
        // Add prompt line to history
        const promptLine = document.createElement('div');
        promptLine.className = 'history-item';
        promptLine.innerHTML = `<span class="prompt-user">guest@shijil-sec:~$</span> <span class="term-cmd">${escapeHTML(cmd)}</span>`;
        terminalHistory.appendChild(promptLine);

        if (cmdLower === '') {
            scrollTerminalToBottom();
            return;
        }

        const outputLine = document.createElement('div');
        outputLine.className = 'history-output';

        if (cmdLower === 'clear') {
            terminalHistory.innerHTML = '';
            scrollTerminalToBottom();
            return;
        }

        if (commandRegistry.hasOwnProperty(cmdLower)) {
            outputLine.innerHTML = commandRegistry[cmdLower];
            
            if (cmdLower === 'linkedin') {
                setTimeout(() => {
                    window.open('https://www.linkedin.com/in/mohamed-shijil-48a53a310', '_blank');
                }, 800);
            }
        } else {
            outputLine.innerHTML = `shijil_os: command not found: <span style="color: var(--accent-red);">${escapeHTML(cmd)}</span>. Type <span class="highlight-cmd">help</span> for commands.`;
        }

        terminalHistory.appendChild(outputLine);
        scrollTerminalToBottom();
    }

    function scrollTerminalToBottom() {
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
