import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Optional: Add a quick GSAP transition effect on toggle
  gsap.fromTo('body', { opacity: 0.8 }, { opacity: 1, duration: 0.5 });
});

// --- 3 Second Glitch Typewriter Intro ---
const introOverlay = document.getElementById('intro-overlay');
const introNameSpan = document.getElementById('intro-name-span');
const symbolicName = "Supriya";
const symbolicImages = [
  'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80', // S - Sunlight (Warmth)
  'https://images.unsplash.com/photo-1501747162991-322ca16a1a09?auto=format&fit=crop&q=80', // u - Hands (Connection)
  'https://images.unsplash.com/photo-1495231916356-a86217efa7d2?auto=format&fit=crop&q=80', // p - Flower (Growth)
  'https://images.unsplash.com/photo-1490237014491-8aa29811ea61?auto=format&fit=crop&q=80', // r - Candle (Comfort)
  'https://images.unsplash.com/photo-1505118380757-91f5f5832de0?auto=format&fit=crop&q=80', // i - Calm Water (Peace)
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80', // y - Soft Smile (Kindness)
  'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80'  // a - Glow (Final effect)
];

let symbolicIndex = 0;

function runSymbolicIntro() {
  const introInterval = setInterval(() => {
    if (symbolicIndex < symbolicName.length) {
      const char = symbolicName[symbolicIndex];
      const img = symbolicImages[symbolicIndex];
      
      // Update Name
      introNameSpan.innerText += char;
      
      // Update Background
      introOverlay.style.backgroundImage = `url(${img})`;
      introOverlay.style.backgroundSize = 'cover';
      introOverlay.style.backgroundPosition = 'center';
      
      // Add Zoom Effect
      introOverlay.classList.remove('intro-zoom');
      void introOverlay.offsetWidth; // Trigger reflow
      introOverlay.classList.add('intro-zoom');

      symbolicIndex++;
    } else {
      clearInterval(introInterval);
      
      // Transition to Disco Mode
      introOverlay.classList.add('disco-mode');
      
      // Final hide
      setTimeout(() => {
        gsap.to(introOverlay, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            introOverlay.style.display = 'none';
          }
        });
      }, 1000); // 1s of disco!
    }
  }, 400); // 0.4s per letter = 2.8s total + disco
}

runSymbolicIntro();
toolJourney();

// --- Project Data & Modal Logic ---
const projectData = {
  millet: {
    title: "Sri Sai Millets – E-commerce Experience Design",
    desc: "Designed a clean and intuitive e-commerce platform focused on usability and clarity. The goal was to prioritize functionality over visual clutter, ensuring users can browse, select, and purchase products effortlessly.",
    contributions: [
      "Simplified product browsing and navigation",
      "Designed structured product pages for better decision-making",
      "Optimized checkout flow for minimal friction",
      "Focused on accessibility and user-friendly layouts"
    ],
    outcome: "A seamless shopping experience that enhances user trust and conversion efficiency."
  },
  skillhive: {
    title: "Skill Hive – Mobile App & Admin System",
    desc: "Designed a complete ecosystem including a user-facing mobile application and an admin dashboard to manage tasks and users efficiently.",
    contributions: [
      "Designed onboarding flow for smooth user entry",
      "Built chat and task management interfaces",
      "Created admin panel for monitoring and control",
      "Maintained consistency across mobile and web interfaces"
    ],
    outcome: "A scalable system that improves workflow efficiency and user engagement."
  },
  budgetbee: {
    title: "Budget Bee – AI-Powered Expense Tracker",
    desc: "A smart expense tracking application that helps users manage finances with AI-driven insights and budgeting tools.",
    contributions: [
      "Designed intuitive expense logging system",
      "Created budget tracking dashboards",
      "Integrated alert system for spending control",
      "Structured AI insights for better financial decisions"
    ],
    outcome: "An intelligent finance tool that promotes better money habits and awareness."
  },
  aara: {
    title: "Aara – Brand Identity Redesign",
    desc: "Redesigned the logo for Aara with a focus on creating a modern, memorable, and scalable brand identity. The redesign aimed to enhance visual clarity while retaining the essence of the brand.",
    contributions: [
      "Explored multiple logo concepts and directions",
      "Refined typography and symbol integration",
      "Built a cohesive color palette and visual style",
      "Ensured scalability across digital and print"
    ],
    outcome: "A strong and versatile brand identity that improves recognition and visual consistency."
  },
  karaoke: {
    title: "Karaoke App – Interactive Music Experience",
    desc: "Designed a fun and engaging karaoke application that enhances the music experience through interaction and real-time feedback.",
    contributions: [
      "Designed intuitive song selection and search flow",
      "Created real-time lyrics display interface",
      "Built engaging performance screens",
      "Focused on user engagement and smooth navigation"
    ],
    outcome: "An immersive and enjoyable experience that encourages user participation and retention."
  },
  irctc: {
    title: "IRCTC Redesign – UX Case Study",
    desc: "Reimagined the IRCTC platform to improve usability, navigation, and booking efficiency. The focus was on solving real user pain points in a complex system.",
    contributions: [
      "Identified usability issues in existing flow",
      "Simplified ticket booking process",
      "Improved information hierarchy and clarity",
      "Designed a cleaner, user-friendly interface"
    ],
    outcome: "A streamlined experience that reduces user frustration and booking complexity."
  },
  reme: {
    title: "Re-Me – Self Worth & Wellness App",
    desc: "Designed a self-improvement application focused on helping users build self-worth, track emotions, and develop positive habits.",
    contributions: [
      "Designed onboarding focused on emotional connection",
      "Created mood tracking and journaling flows",
      "Built habit-building and reflection features",
      "Focused on calm, minimal, and supportive UI"
    ],
    outcome: "A meaningful digital experience that promotes mental well-being and personal growth."
  },
  temple: {
    title: "Perungotukavu Amman Temple – Website Design",
    desc: "Designed a website for Perungotukavu Amman Temple to create a digital presence that reflects tradition while ensuring easy accessibility for devotees.",
    contributions: [
      "Designed clean and respectful UI aligned with cultural aesthetics",
      "Structured information for events, timings, and rituals",
      "Created easy navigation for all age groups",
      "Focused on readability and accessibility"
    ],
    outcome: "A meaningful digital platform that improves information access and community engagement."
  },
  netflix: {
    title: "Netflix UI Recreation – Interface Study",
    desc: "Recreated the Netflix homepage to study and understand layout hierarchy, spacing, and content prioritization in a real-world product.",
    contributions: [
      "Rebuilt homepage layout with precision",
      "Focused on visual hierarchy and content grouping",
      "Studied user flow and interaction patterns",
      "Improved spacing and alignment consistency"
    ],
    outcome: "A refined understanding of industry-level UI design principles and scalability."
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalContributions = document.getElementById('modal-contributions');
const modalOutcome = document.getElementById('modal-outcome');
const modalClose = document.getElementById('modal-close');

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.innerText = data.title;
    modalDesc.innerText = data.desc;
    modalContributions.innerHTML = data.contributions.map(c => `<li>${c}</li>`).join('');
    modalOutcome.innerText = data.outcome;

    modal.style.display = 'block';
    
    // Hard lock background scroll
    document.documentElement.classList.add('no-scroll');
    lenis.stop(); 
    
    gsap.fromTo(modal, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
    
    // Push state to history
    history.pushState({ modalOpen: true }, "", "");
}

const closeProjectModal = () => {
  if (modal.style.display === 'block') {
    gsap.to(modal, { opacity: 0, y: 50, duration: 0.3, onComplete: () => {
      modal.style.display = 'none';
      
      // Unlock background scroll
      document.documentElement.classList.remove('no-scroll');
      lenis.start(); 
    }});
  }
};

document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('click', () => {
    const id = item.getAttribute('data-project');
    openModal(id);
  });
});

modalClose.addEventListener('click', () => {
  if (history.state && history.state.modalOpen) {
    history.back();
  } else {
    closeProjectModal();
  }
});

window.addEventListener('popstate', () => {
  closeProjectModal();
});

// --- Horizontal Project Scroll ---
const projectsContainer = document.getElementById('projects-container');
const projectItems = gsap.utils.toArray('.project-item');

if (projectsContainer && projectItems.length > 0) {
  gsap.to(projectItems, {
    x: () => -(projectsContainer.scrollWidth - window.innerWidth + 100),
    ease: 'none',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top top',
      end: () => `+=${projectsContainer.scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });
}

// --- Visual Reveals ---
gsap.from('.interest-img, .experience-timeline > div', {
    scrollTrigger: {
        trigger: '#interests',
        start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out'
});

// --- Tool Journey Animation ---
const toolJourney = () => {
    const path = document.querySelector('#journey-path');
    const traveler = document.querySelector('#path-traveler');
    const travelerCore = document.querySelector('#path-traveler-core');
    const milestones = document.querySelectorAll('.tool-milestone');
    
    if (!path || !traveler) return;

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#tools",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });

    timeline.to([traveler, travelerCore], {
        motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5]
        },
        ease: "none"
    });

    // Milestone triggers based on progress
    milestones.forEach((milestone, i) => {
        ScrollTrigger.create({
            trigger: "#tools",
            start: `${15 + (i * 18)}% center`,
            onEnter: () => {
                gsap.to(milestone, { 
                    opacity: 1, 
                    scale: 1, 
                    filter: 'blur(0px)', 
                    duration: 0.5, 
                    ease: "back.out(1.7)" 
                });
            },
            onLeaveBack: () => {
                gsap.to(milestone, { 
                    opacity: 0, 
                    scale: 0.75, 
                    filter: 'blur(4px)', 
                    duration: 0.3 
                });
            }
        });
    });
};

// --- Wave Surge Animation ---
gsap.to('#wave-1', {
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 90%',
    end: 'top 20%',
    scrub: 2
  },
  bottom: '0',
  ease: 'sine.inOut'
});

gsap.to('#wave-2', {
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 80%',
    end: 'top 10%',
    scrub: 1.5
  },
  bottom: '-50px',
  ease: 'sine.inOut'
});

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Light Cones
    document.querySelectorAll('.light-cone-pink, .light-cone-blue').forEach(cone => {
        gsap.to(cone, {
            rotation: (clientX - centerX) / 25,
            duration: 0.8
        });
    });
});

// Grain Jitter Effect
gsap.to('.grain-overlay', {
  duration: 0.2,
  x: 'random(-5, 5)',
  y: 'random(-5, 5)',
  repeat: -1,
  ease: 'none'
});
