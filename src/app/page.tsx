'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Modal Component with scroll lock
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto mx-4 shadow-2xl border border-sage-200/50">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-sage-100 hover:bg-sage-200 hover:border-2 hover:border-sage-400 transition-all duration-200"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

// Interactive Background Component with colored dots
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [orbs, setOrbs] = useState<Array<{ id: number, x: number, y: number, size: number, opacity: number, color: string }>>([]);
  const [dots, setDots] = useState<Array<{ id: number, x: number, y: number, opacity: number, scale: number }>>([]);

  useEffect(() => {
    // Generate floating orbs
    const generateOrbs = () => {
      const newOrbs = [];
      for (let i = 0; i < 8; i++) {
        newOrbs.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 80 + 40,
          opacity: Math.random() * 0.15 + 0.05,
          color: i % 2 === 0 ? 'rgba(138, 157, 115, 0.15)' : 'rgba(245, 228, 193, 0.15)'
        });
      }
      setOrbs(newOrbs);
    };

    // Generate colored dots
    const generateDots = () => {
      const newDots = [];
      for (let i = 0; i < 25; i++) {
        newDots.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.7 + 0.2,
          scale: Math.random() * 0.8 + 0.4,
        });
      }
      setDots(newDots);
    };

    generateOrbs();
    generateDots();
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Animate dots with smoother transitions
    const animateDots = () => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          opacity: Math.random() * 0.7 + 0.2,
          scale: Math.random() * 0.8 + 0.4,
        }))
      );
    };

    const dotInterval = setInterval(animateDots, 1500);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating orbs */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-2xl transition-all duration-[2000ms] ease-out"
          style={{
            left: `${orb.x + (mousePosition.x - 50) * 0.02}%`,
            top: `${orb.y + (mousePosition.y - 50) * 0.02}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            opacity: orb.opacity,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
      
      {/* Colored dots with smooth fading */}
      {dots.map((dot) => (
        <div
          key={`dot-${dot.id}`}
          className="absolute rounded-full transition-all duration-[1500ms] ease-in-out cursor-pointer"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: '10px',
            height: '10px',
            backgroundColor: dot.id % 3 === 0 ? '#8a9d73' : dot.id % 3 === 1 ? '#a8b895' : '#e6bc6a',
            opacity: dot.opacity,
            transform: `translate(-50%, -50%) scale(${dot.scale})`,
            boxShadow: '0 0 20px rgba(138, 157, 115, 0.3)',
          }}
        />
      ))}
    </div>
  );
};

// Fixed Width Rotating Text Component
const RotatingText = () => {
  const technologies = ['Python', 'C++', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Azure', 'ROS 2'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % technologies.length);
        setIsAnimating(false);
      }, 250);
    }, 2500);

    return () => clearInterval(interval);
  }, [technologies.length]);

  return (
    <span className="inline-block w-32 text-center">
      <span className={`font-bold text-sage-600 transition-all duration-500 inline-block ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        {technologies[currentIndex]}
      </span>
    </span>
  );
};

// Enhanced Navigation Component with active section detection
const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card bg-white/80 backdrop-blur-md border-b border-sage-200/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 
          onClick={scrollToTop}
          className="text-2xl font-bold text-sage-900 cursor-pointer hover:text-sage-700 hover:border-b-2 hover:border-sage-400 transition-all duration-200 pb-1"
        >
          Rowan Arora
        </h1>
        <div className="hidden md:flex space-x-8 items-center">
          {[
            { name: 'About', id: 'about' },
            { name: 'Experience', id: 'experience' },
            { name: 'Projects', id: 'projects' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-lg font-medium transition-all duration-200 px-3 py-2 rounded-lg border-2 ${
                activeSection === item.id 
                  ? 'text-sage-900 border-sage-400 bg-sage-100/50' 
                  : 'text-sage-700 border-transparent hover:text-sage-900 hover:border-sage-300 hover:bg-sage-50/50'
              }`}
            >
              {item.name}
            </button>
          ))}
          <a 
            href="/Rowan-Arora-Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-sage-600 text-cream-50 px-6 py-2 rounded-full font-semibold hover:bg-sage-700 hover:border-2 hover:border-sage-800 transition-all duration-200 shadow-md"
          >
            📄 Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

// Enhanced Hero Section with colored border on profile photo
const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-24 relative z-10">
      <div className="text-center max-w-5xl mx-auto">
        {/* Profile Image with enhanced colored border */}
        <div className="relative mb-12 group">
          <div className="w-72 h-72 mx-auto rounded-full border-4 border-sage-400 shadow-2xl bg-gradient-to-br from-sage-200 to-cream-200 overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl group-hover:border-sage-500 group-hover:border-6">
            <Image src="/profile-photo.jpeg" alt="Rowan Arora" width={500} height={500} className="object-cover w-full h-full" />
          </div>
          {/* Enhanced floating decorative elements */}
          <div className="absolute top-8 right-1/4 w-6 h-6 bg-sage-400 rounded-full animate-pulse shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
          <div className="absolute bottom-12 left-1/4 w-4 h-4 bg-cream-400 rounded-full animate-bounce shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
          <div className="absolute top-16 left-1/3 w-3 h-3 bg-sage-500 rounded-full animate-pulse delay-1000 shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
          <div className="absolute bottom-8 right-1/3 w-5 h-5 bg-cream-500 rounded-full animate-bounce delay-500 shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
        </div>

        {/* Name - Normal Case */}
        <h1 className="text-7xl md:text-8xl font-bold mb-8 gradient-text tracking-tight hover:text-sage-500 transition-colors duration-300">
          Rowan Arora
        </h1>

        {/* Fixed Width Rotating Tagline */}
        <h2 className="text-3xl md:text-4xl text-sage-700 mb-8 font-medium">
          Building with <RotatingText />
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-sage-800 mb-12 max-w-4xl mx-auto leading-relaxed">
          Backend developer & AI enthusiast with <span className="font-bold text-sage-600">5 years</span> of programming experience.<br />
          Currently building the future of legal tech at <span className="font-bold text-sage-600">ContractPodAI</span>.
        </p>

        {/* Enhanced CTA Buttons with hover borders */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <a 
            href="https://www.linkedin.com/in/rowanarora/" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-12 py-5 hover:scale-110 hover:border-2 hover:border-sage-700 transition-all duration-300 border-2 border-transparent"
          >
            Let's Connect
          </a>
          <a
            href="https://github.com/rowanarora" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-lg px-12 py-5 hover:scale-110 hover:border-2 hover:border-sage-500 transition-all duration-300 border-2 border-transparent"
          >
            View GitHub
          </a>
        </div>

        {/* Enhanced Stats with hover borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-2xl mx-auto">
          <div className="text-center p-4 rounded-xl bg-sage-100/50 hover:bg-sage-100/70 hover:border-2 hover:border-sage-400 transition-all duration-300 border-2 border-transparent">
            <div className="text-5xl font-bold text-sage-600 mb-3">5</div>
            <div className="text-sage-700 font-medium">Years Coding</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-cream-100/50 hover:bg-cream-100/70 hover:border-2 hover:border-cream-400 transition-all duration-300 border-2 border-transparent">
            <div className="text-5xl font-bold text-sage-600 mb-3">15+</div>
            <div className="text-sage-700 font-medium">Projects Built</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-sage-100/50 hover:bg-sage-100/70 hover:border-2 hover:border-sage-400 transition-all duration-300 border-2 border-transparent">
            <div className="text-5xl font-bold text-sage-600 mb-3">10+</div>
            <div className="text-sage-700 font-medium">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Significantly Expanded About Section
const AboutSection = () => {
  const languages = ['Python', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'];
  const frameworks = ['FastAPI', 'Flask', 'Django', 'React.js', 'Next.js', 'Vue.js', 'TensorFlow', 'Keras', 'PyTorch', 'NumPy'];
  const databases = ['MongoDB', 'PostgreSQL', 'Azure Service Bus'];
  const tools = ['Git/GitHub', 'Bitbucket', 'Jira', 'Docker', 'Azure Functions', 'Microsoft Azure', 'ROS 2', 'Gazebo', 'Postman', 'pytest', 'pandas', 'scikit-learn', 'nltk', 'LaTeX', 'Linux', 'Agile', 'REST APIs', 'Vite', 'GDScript'];

  return (
    <section id="about" className="py-24 px-6 relative z-10 bg-gradient-to-b from-sage-50/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold text-center mb-20 gradient-text hover:text-sage-500 transition-colors duration-300">
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <div className="glass-card p-10 bg-gradient-to-br from-white/30 to-sage-50/30 border-2 border-sage-200/50 hover:border-sage-300/70 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-sage-800 mb-8 text-center">My Story & Approach</h3>
            
            <div className="space-y-6">
                             <div>
                 <h4 className="text-xl font-bold text-sage-700 mb-3">🎮 My Journey</h4>
                 <p className="text-lg text-sage-800 leading-relaxed">
                   I started coding in <span className="font-bold text-sage-600">2020</span> during my senior year of high school, 
                   initially drawn to programming through my love of video games because I wanted to understand how they actually worked under the hood. 
                   What began as curiosity about game development quickly evolved into a passion for backend systems and architecture.
                 </p>
               </div>
              
              <div>
                <h4 className="text-xl font-bold text-sage-700 mb-3">💼 Current Focus</h4>
                <p className="text-lg text-sage-800 leading-relaxed">
                                   Currently at <span className="font-bold text-sage-600">ContractPodAI</span>, I'm building Leah, an AI-powered 
                 legal assistant that's revolutionizing how Fortune 500 companies handle contract analysis. I've architected backend 
                  systems processing millions of legal documents, designed Azure cloud infrastructure, and built APIs serving thousands of users daily.
                </p>
              </div>

                             <div>
                 <h4 className="text-xl font-bold text-sage-700 mb-3">🎯 How I Code</h4>
                 <p className="text-lg text-sage-800 leading-relaxed">
                   I start by understanding the problem deeply before writing any code, then build a simple brute-force solution and iterate 
                   until it's as efficient as I can make it. Clean code matters too. Poorly named variables and missing comments drive me absolutely 
                   crazy. If you can't understand what your code does six months later, you're doing it wrong.
                 </p>
               </div>
               

            </div>
          </div>

          <div className="glass-card p-10 bg-gradient-to-br from-sage-100/30 to-cream-100/30 border-2 border-sage-200/50 hover:border-sage-300/70 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-sage-800 mb-8 text-center">Tools and Technologies I Use</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-sage-700 mb-4">Languages</h4>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang, idx) => (
                    <span key={idx} className="px-4 py-2 bg-sage-200 text-sage-700 rounded-full font-semibold shadow-sm hover:bg-sage-300 hover:border-2 hover:border-sage-500 transition-all duration-200 border-2 border-transparent cursor-pointer">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-sage-700 mb-4">Frameworks</h4>
                <div className="flex flex-wrap gap-3">
                  {frameworks.map((framework, idx) => (
                    <span key={idx} className="px-4 py-2 bg-cream-200 text-sage-700 rounded-full font-semibold shadow-sm hover:bg-cream-300 hover:border-2 hover:border-cream-500 transition-all duration-200 border-2 border-transparent cursor-pointer">
                      {framework}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-sage-700 mb-4">Databases</h4>
                <div className="flex flex-wrap gap-3">
                  {databases.map((db, idx) => (
                    <span key={idx} className="px-4 py-2 bg-sage-300 text-sage-800 rounded-full font-semibold shadow-sm hover:bg-sage-400 hover:border-2 hover:border-sage-600 transition-all duration-200 border-2 border-transparent cursor-pointer">
                      {db}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-sage-700 mb-4">Tools & Platforms</h4>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool, idx) => (
                    <span key={idx} className="px-4 py-2 bg-cream-300 text-sage-800 rounded-full font-semibold shadow-sm hover:bg-cream-400 hover:border-2 hover:border-cream-600 transition-all duration-200 border-2 border-transparent cursor-pointer">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

// Experience Section Component with enhanced hover effects
const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  const experiences = [
    {
      title: "Python Developer Intern",
      company: "ContractPodAI",
      companyUrl: "https://contractpodai.com",
      location: "Toronto, ON",
      period: "May 2025 - Present",
      description: "Building the future of legal tech",
      details: "Architecting and developing Leah, an AI-powered legal assistant revolutionizing contract analysis for Fortune 500 companies.",
      previewAchievements: [
        "Built 15+ FastAPI endpoints handling document processing pipelines",
        "Designed Azure Functions reducing processing overhead by 18%"
      ],
      achievements: [
        "Built 15+ FastAPI endpoints handling document processing pipelines with sub-100ms response times",
        "Designed Azure Functions reducing processing overhead by 18% through optimized serverless architecture",
        "Architected MongoDB schemas for 50+ collections supporting millions of legal documents",
        "Collaborated with 7+ senior engineers in Agile environment delivering features every 2 weeks",
        "Implemented caching strategies that improved API response times by 35%",
        "Developed automated testing suite achieving 95% code coverage",
        "Integrated machine learning models for contract clause extraction and analysis",
        "Built real-time document processing pipeline handling 10,000+ documents daily"
      ],
      tags: ["Python", "FastAPI", "Azure", "MongoDB", "Docker", "Redis", "PostgreSQL", "Machine Learning", "REST APIs", "Microservices"],
      fullDescription: "At ContractPodAI, I'm working on Leah, an revolutionary AI-powered legal assistant that's transforming how Fortune 500 companies handle contract analysis. My role involves architecting scalable backend systems that process millions of legal documents daily. I've been responsible for designing the core API infrastructure, implementing cloud-based processing pipelines, and ensuring the system can handle enterprise-scale workloads with high availability and performance."
    },
    {
      title: "Lead Software Developer", 
      company: "InkTank",
      companyUrl: "https://inktank.io",
      location: "Toronto, ON",
      period: "May 2024 - May 2025",
      description: "Revolutionizing tattoo design with AI",
      details: "Led development of a cutting-edge 3D tattoo visualization platform using generative AI for realistic body modeling.",
      previewAchievements: [
        "Built 3D visualization platform with Vue.js and Vite",
        "Integrated generative AI for realistic body modeling"
      ],
      achievements: [
        "Built 3D visualization platform with Vue.js and Vite achieving 60fps render performance",
        "Integrated generative AI for realistic body modeling using custom ML models",
        "Optimized performance achieving 25% faster page loads through code splitting and lazy loading",
        "Served 100+ artists and clients with 99.9% uptime",
        "Implemented real-time collaboration features for artist-client interactions",
        "Developed custom WebGL shaders for realistic tattoo rendering on 3D models",
        "Built custom payment processing system with Stripe integration",
        "Implemented user authentication and authorization system supporting OAuth"
      ],
      tags: ["Vue.js", "JavaScript", "WebGL", "Three.js", "AI/ML", "Python", "TensorFlow", "3D Graphics", "Stripe", "OAuth"],
      fullDescription: "At InkTank, I led the development of a groundbreaking 3D tattoo visualization platform that allows customers to see how tattoos would look on their actual body before getting inked. This involved complex 3D rendering, machine learning for body modeling, and real-time collaboration tools for artists and clients to work together remotely."
    },
    {
      title: "Software/Robotics Intern",
      company: "Evodyne Robotics Academy", 
      companyUrl: "https://www.evodyneacademy.com",
      location: "Mountain View, CA",
      period: "Jun 2024 - Aug 2024",
      description: "Building the future of robotics",
      details: "Mastered advanced robotics technologies, recreating complex robotic models using cutting-edge simulation frameworks.",
      previewAchievements: [
        "Recreated Evodyne robotic model in ROS 2 and Gazebo",
        "Reduced resource usage by 50% with optimized virtual simulations"
      ],
      achievements: [
        "Recreated Evodyne robotic model in ROS 2 and Gazebo with physics-accurate simulation",
        "Reduced resource usage by 50% with optimized virtual simulations and efficient algorithms", 
        "Saved 100+ hours of testing time through automated simulation testing frameworks",
        "Improved design accuracy by 25% using advanced sensor modeling and calibration",
        "Implemented SLAM algorithms for autonomous navigation in simulated environments",
        "Developed custom ROS 2 packages for educational robotics curriculum",
        "Built automated testing framework for robotics algorithms validation",
        "Created comprehensive documentation and tutorials for student learning"
      ],
      tags: ["ROS 2", "Gazebo", "Python", "C++", "SLAM", "Computer Vision", "Robotics", "Simulation", "Linux", "Git"],
      fullDescription: "During my internship at Evodyne Robotics Academy, I worked on advanced robotics simulation and educational technology. I recreated complex robotic models in simulation environments, developed educational content for students learning robotics, and contributed to the academy's curriculum development for AI-enabled robotics programs."
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-gradient-to-b from-transparent to-cream-50/50 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold text-center mb-20 gradient-text hover:text-sage-500 transition-colors duration-300">
          Experience
        </h2>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="glass-card p-10 bg-gradient-to-r from-white/20 to-sage-50/20 hover:from-white/30 hover:to-sage-50/30 hover:shadow-2xl transform hover:scale-[1.01] hover:border-sage-400 transition-all duration-300 border-2 border-sage-200/30 cursor-pointer group" onClick={() => setSelectedExperience(exp)}>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-3xl font-bold text-sage-800 mb-3 group-hover:text-sage-600 transition-colors">{exp.title}</h3>
                  <a 
                    href={exp.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sage-600 font-bold text-xl mb-2 hover:text-sage-700 hover:border-b-2 hover:border-sage-500 transition-all duration-200 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {exp.company} • {exp.location}
                  </a>
                  <p className="text-sage-500 font-medium">{exp.description}</p>
                </div>
                <span className="text-sage-600 font-bold bg-sage-100 px-6 py-3 rounded-full text-sm whitespace-nowrap shadow-sm border border-sage-200 group-hover:border-sage-300 transition-all duration-200">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-sage-800 text-lg mb-6 leading-relaxed">{exp.details}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {exp.previewAchievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-sage-50/50 rounded-lg border border-sage-200/50 hover:border-sage-300 transition-all duration-200">
                    <span className="text-sage-600 font-bold text-lg">•</span>
                    <span className="text-sage-700">{achievement}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.tags.slice(0, 6).map((tag, tagIdx) => (
                  <span key={tagIdx} className="px-3 py-1 bg-sage-200 text-sage-700 rounded-full text-sm font-medium border border-transparent hover:border-sage-400 transition-all duration-200">
                    {tag}
                  </span>
                ))}
                {exp.tags.length > 6 && (
                  <span className="px-3 py-1 bg-cream-200 text-sage-700 rounded-full text-sm font-medium">
                    +{exp.tags.length - 6} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-sage-600 font-medium text-lg group-hover:text-sage-800 transition-colors">
                <span>View Details</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Modal */}
        <Modal isOpen={!!selectedExperience} onClose={() => setSelectedExperience(null)}>
          {selectedExperience && (
            <div>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div className="mb-4 lg:mb-0">
                  <h2 className="text-4xl font-bold text-sage-800 mb-3">{selectedExperience.title}</h2>
                  <a 
                    href={selectedExperience.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sage-600 font-bold text-xl mb-2 hover:text-sage-700 hover:border-b-2 hover:border-sage-500 transition-all duration-200"
                  >
                    {selectedExperience.company} • {selectedExperience.location}
                  </a>
                  <p className="text-sage-500 font-medium text-lg">{selectedExperience.description}</p>
                </div>
                <span className="text-sage-600 font-bold bg-sage-100 px-6 py-3 rounded-full whitespace-nowrap shadow-sm border border-sage-200">
                  {selectedExperience.period}
                </span>
              </div>
              
              <p className="text-sage-800 text-lg mb-8 leading-relaxed">{selectedExperience.fullDescription}</p>
              
              <h3 className="text-2xl font-bold text-sage-800 mb-6">Key Achievements</h3>
              <div className="grid gap-4 mb-8">
                {selectedExperience.achievements.map((achievement: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-sage-50/50 rounded-lg border border-sage-200/50 hover:border-sage-300 transition-all duration-200">
                    <span className="text-sage-600 font-bold text-lg">•</span>
                    <span className="text-sage-700">{achievement}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold text-sage-800 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {selectedExperience.tags.map((tag: string, tagIdx: number) => (
                  <span key={tagIdx} className="px-4 py-2 bg-sage-200 text-sage-700 rounded-full font-medium shadow-sm hover:bg-sage-300 hover:border-2 hover:border-sage-500 transition-all duration-200 border-2 border-transparent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

// Projects Section Component with comprehensive tags and fixed GitHub titles
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [githubProjects, setGithubProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const featuredProjects = [
    {
      title: "Key-Value Database System API",
      subtitle: "Advanced Systems Engineering", 
      description: "Engineered a high-performance database system from scratch using advanced data structures: Memtables, SSTs, LSM-Trees, and Bloom Filters. Achieved 30% improvement in query efficiency with sub-millisecond latencies on 10GB+ datasets.",
      tags: ["C++", "System Design", "Performance", "Scalability", "LSM-Trees", "Bloom Filters", "Memory Management", "Concurrency", "Benchmarking"],
      githubUrl: "https://github.com/rowanarora/Key-Value-Database-System-API",
      link: "Explore the Architecture →",
      fullDescription: "This project involved building a complete database system from the ground up, implementing advanced data structures like Log-Structured Merge Trees (LSM-Trees), Sorted String Tables (SSTs), and Bloom Filters. The system was designed to handle massive datasets efficiently with sub-millisecond query response times. I implemented custom memory management, disk I/O optimization, and concurrent access patterns to ensure high performance under load.",
      technicalDetails: [
        "Implemented LSM-Tree architecture for write-optimized performance",
        "Custom Bloom Filter implementation reducing false positive rates by 15%",
        "Memory-mapped file I/O for efficient disk operations",
        "Concurrent read/write operations using fine-grained locking",
        "Compression algorithms reducing storage overhead by 40%",
        "Comprehensive benchmarking suite testing various workload patterns",
        "Custom memory allocator for optimized performance",
        "WAL (Write-Ahead Logging) implementation for crash recovery"
      ]
    },
    {
      title: "mhapy Sentiment Analysis Model",
      subtitle: "AI/ML Production System",
      description: "Built production-ready sentiment analysis model achieving 98% accuracy on 10,000+ user-generated content pieces. Designed scalable Flask API architecture with real-time processing capabilities.",
      tags: ["Python", "TensorFlow", "NLP", "Flask API", "BERT", "Docker", "REST APIs", "Machine Learning", "Data Processing", "Model Deployment"],
      githubUrl: "https://github.com/rowanarora/mhapy-Sentiment-Analysis-Model",
      link: "View ML Pipeline →",
      featured: true,
      fullDescription: "mhapy is a comprehensive sentiment analysis system designed for real-world deployment. The project involved training custom NLP models, building scalable API infrastructure, and implementing real-time processing capabilities. The system processes thousands of text inputs daily with high accuracy and low latency.",
      technicalDetails: [
        "Custom BERT-based model fine-tuned on domain-specific data",
        "Real-time inference API with <50ms response times",
        "Automated data preprocessing and feature extraction pipeline",
        "Model versioning and A/B testing framework",
        "Comprehensive evaluation metrics and monitoring dashboard",
        "Docker containerization for easy deployment and scaling",
        "Redis caching for frequently analyzed content",
        "Batch processing capabilities for large-scale analysis"
      ]
    }
  ];

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/rowanarora/repos?sort=updated&per_page=100');
        const repos = await response.json();
        
        // Filter out personal-website and rowanArora repos, and get only public repos
        const filteredRepos = repos
          .filter((repo: any) => 
            !repo.private && 
            repo.name !== 'personal-website' && 
            repo.name !== 'rowanArora' &&
            repo.name !== '.github'
          )
          .slice(0, 8) // Get top 8 most recently updated repos
          .map((repo: any) => ({
            name: repo.name.length > 25 ? `${repo.name.substring(0, 22)}...` : repo.name,
            fullName: repo.name,
            description: repo.description || 'No description available',
            language: repo.language || 'Text',
            stars: repo.stargazers_count,
            url: repo.html_url,
            starred: repo.stargazers_count > 0
          }));
        
        setGithubProjects(filteredRepos);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Fallback data in case API fails
        setGithubProjects([
          { name: "Loading GitHub repos...", description: "Fetching latest repositories", language: "JavaScript", url: "#", starred: false }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 relative z-10 bg-gradient-to-b from-sage-50/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold text-center mb-20 gradient-text hover:text-sage-500 transition-colors duration-300">
          Featured Projects
        </h2>
        
        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {featuredProjects.map((project, index) => (
            <div key={index} className="glass-card p-10 bg-gradient-to-br from-white/20 to-cream-100/20 hover:from-white/30 hover:to-cream-100/30 hover:shadow-2xl transform hover:scale-[1.02] hover:border-sage-400 transition-all duration-300 border-2 border-sage-200/40 cursor-pointer group" onClick={() => setSelectedProject(project)}>
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-sage-200 to-sage-300 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 bg-sage-600 rounded shadow-sm"></div>
                </div>
                {project.featured && <div className="text-sage-500 text-2xl animate-pulse">★</div>}
              </div>
              
              <h3 className="text-3xl font-bold text-sage-800 mb-3 group-hover:text-sage-600 transition-colors">{project.title}</h3>
              <p className="text-sage-600 font-bold text-lg mb-6">{project.subtitle}</p>
              <p className="text-sage-700 text-lg mb-8 leading-relaxed">{project.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sage-600 font-semibold text-sm">Click to view full details →</span>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sage-600 font-bold text-lg hover:text-sage-700 hover:border-b-2 hover:border-sage-500 transition-all duration-200 hover:scale-110 transform"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.link}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Latest from GitHub */}
        <div>
          <h3 className="text-4xl font-bold text-center mb-16 text-sage-800">Latest from GitHub</h3>
          {loading ? (
            <div className="text-center text-sage-600">Loading latest repositories...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {githubProjects.map((project, index) => (
                <a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 bg-gradient-to-br from-white/15 to-sage-50/15 hover:from-white/25 hover:to-sage-50/25 hover:shadow-lg transform hover:scale-[1.02] hover:border-sage-400 transition-all duration-300 border border-sage-200/30 cursor-pointer group"
                  title={project.fullName}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-sage-800 group-hover:text-sage-600 transition-colors leading-tight">{project.name}</h4>
                    {project.starred && <span className="text-sage-500 text-xl">★</span>}
                  </div>
                  <p className="text-sage-700 mb-6 leading-relaxed text-sm">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block px-3 py-1 bg-sage-200 text-sage-700 rounded-full text-xs font-semibold shadow-sm border border-transparent group-hover:border-sage-400 transition-all duration-200">
                      {project.language}
                    </span>
                    {project.stars > 0 && (
                      <span className="text-sage-600 text-sm">★ {project.stars}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div>
            <h2 className="text-4xl font-bold text-sage-800 mb-4">{selectedProject.title}</h2>
            <h3 className="text-2xl font-semibold text-sage-600 mb-6">{selectedProject.subtitle}</h3>
            
            <p className="text-lg text-sage-800 leading-relaxed mb-8">{selectedProject.fullDescription}</p>
            
            <h4 className="text-2xl font-bold text-sage-800 mb-6">Technical Implementation</h4>
            <div className="grid gap-4 mb-8">
              {selectedProject.technicalDetails?.map((detail: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sage-700">{detail}</span>
                </div>
              ))}
            </div>
            
            <h4 className="text-2xl font-bold text-sage-800 mb-6">Technologies & Tools</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedProject.tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-4 py-2 bg-sage-200 text-sage-700 rounded-full font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            
            <a 
              href={selectedProject.githubUrl} 
          target="_blank"
          rel="noopener noreferrer"
              className="inline-block bg-sage-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-sage-700 transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
};

// Call to Action Section Component
const CallToActionSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-t from-cream-50/50 to-transparent relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-6xl md:text-7xl font-bold mb-12 gradient-text hover:text-sage-500 transition-colors duration-300">
          Let's Build Something Epic
        </h2>
        
        <p className="text-2xl text-sage-800 mb-16 max-w-4xl mx-auto leading-relaxed">
          I'm always excited about new opportunities, innovative projects, and connecting with 
          fellow builders. Whether it's discussing the latest in AI, debating system architecture, 
          or collaborating on the next big thing, let's create something extraordinary together!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <a 
            href="https://www.linkedin.com/in/rowanarora/" 
          target="_blank"
          rel="noopener noreferrer"
            className="btn-primary text-xl px-12 py-6 hover:scale-110 hover:border-2 hover:border-sage-700 transition-all duration-300 border-2 border-transparent"
          >
            LinkedIn
        </a>
        <a
            href="https://github.com/rowanarora" 
          target="_blank"
          rel="noopener noreferrer"
            className="btn-secondary text-xl px-12 py-6 hover:scale-110 hover:border-2 hover:border-sage-500 transition-all duration-300 border-2 border-transparent"
          >
            GitHub
          </a>
          <a 
            href="mailto:rowan.arora@icloud.com"
            className="btn-secondary text-xl px-12 py-6 hover:scale-110 hover:border-2 hover:border-sage-500 transition-all duration-300 border-2 border-transparent"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-sage-200/30 relative z-10 bg-gradient-to-t from-sage-50/30 to-transparent">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sage-600 text-lg mb-3">
          © 2025 Rowan Arora. Built with Next.js, Tailwind CSS, and endless ☕
        </p>
        <p className="text-sage-500">
          Thanks for exploring! Keep building amazing things 🚀
        </p>
      </div>
      </footer>
  );
};

// Main Page Component
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
