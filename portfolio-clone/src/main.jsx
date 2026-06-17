import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ChevronUp, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?auto=format&fit=crop&w=1300&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85',
];

const workImages = [
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=85',
];

function App() {
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-item, .mail-link', {
        y: -20,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });

      gsap.from('.hero-word span', {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.2,
      });

      gsap.from('.hero-image', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.inOut',
        delay: 0.45,
      });

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 80,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
          },
        });
      });

      gsap.utils.toArray('.work-card').forEach((card) => {
        gsap.from(card, {
          y: 110,
          scale: 0.96,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
      });

      gsap.to('.marquee-track', {
        xPercent: -50,
        repeat: -1,
        duration: 18,
        ease: 'none',
      });

      gsap.to('.float-a', {
        y: -90,
        rotate: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.float-b', {
        y: 80,
        rotate: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    const cursor = cursorRef.current;
    const label = cursorLabelRef.current;
    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.28, ease: 'power3' });
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.28, ease: 'power3' });

    const moveCursor = (event) => {
      quickX(event.clientX);
      quickY(event.clientY);
    };

    const enter = (text) => {
      label.textContent = text;
      gsap.to(cursor, { scale: 1, autoAlpha: 1, duration: 0.25 });
    };
    const leave = () => gsap.to(cursor, { scale: 0.35, autoAlpha: 0.65, duration: 0.25 });

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => enter(el.dataset.cursor));
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      ctx.revert();
    };
  }, []);

  return (
    <main>
      <div className="custom-cursor" ref={cursorRef}>
        <span ref={cursorLabelRef}>Drag</span>
      </div>

      <header className="fixed left-0 top-0 z-40 grid w-full grid-cols-[1fr_auto_1fr] items-start px-5 py-5 text-[13px] uppercase tracking-normal md:px-8">
        <a className="mail-link lowercase" href="mailto:jhosuemesias@gmail.com">
          jhosuemesias@gmail.com
        </a>
        <nav className="flex gap-8">
          <a className="nav-item" href="#work">Index</a>
          <a className="nav-item" href="#work">Work</a>
          <a className="nav-item" href="#contact">Contact</a>
        </nav>
        <a className="nav-item justify-self-end" href="#top">You are here</a>
      </header>

      <section id="top" className="hero-section min-h-screen px-4 pt-24 md:px-8 md:pt-20">
        <div className="hero-title">
          <h1 className="hero-word"><span># DIGITAL</span></h1>
          <h1 className="hero-word"><span>DESIGNER</span></h1>
        </div>
        <div className="hero-layout">
          <img className="hero-image hero-main" src={heroImages[0]} alt="Black and white designer portrait workspace" data-cursor="View" />
          <img className="hero-image hero-small-a" src={heroImages[1]} alt="Minimal studio desk" data-cursor="Drag" />
          <img className="hero-image hero-small-b" src={heroImages[2]} alt="Abstract architecture detail" data-cursor="View" />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index}># DIGITAL DESIGNER</span>
          ))}
        </div>
      </div>

      <section className="about-section grid min-h-screen grid-cols-1 gap-12 px-4 py-24 md:grid-cols-[0.65fr_1fr] md:px-8">
        <div className="relative min-h-[540px]">
          <img className="float-a about-image top-0 left-[5%]" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85" alt="Creative team around a table" data-cursor="Drag" />
          <img className="float-b about-image right-[6%] bottom-0" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85" alt="Design presentation wall" data-cursor="View" />
        </div>
        <div className="about-copy reveal">
          <p>I collaborate with businesses, brands and entrepreneurs to create digital products and achieve their goals.</p>
          <p>I create unique experiences that transform how users interact with the digital world, each project is an opportunity to blend aesthetics and functionality, providing solutions that inspire and enrich.</p>
          <p>My commitment is to go beyond the conventional to create memorable and valuable experiences, where every detail matters and every interaction counts.</p>
        </div>
      </section>

      <section id="work" className="work-section px-4 py-16 md:px-8">
        <h2 className="section-title reveal"># SELECTED&nbsp; WORK</h2>
        <div className="work-grid">
          {workImages.map((image, index) => (
            <article className={`work-card work-card-${index + 1}`} key={image} data-cursor="View">
              <img src={image} alt={`Selected digital design project ${index + 1}`} />
              <div className="work-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <MoveUpRight size={18} strokeWidth={1.5} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section min-h-screen px-4 py-20 md:px-8">
        <h2 className="section-title reveal"># CONTACT ME</h2>
        <div className="contact-panel reveal">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85" alt="Digital product interface on laptop" />
          <div className="contact-text">
            <p>LETS WORK TOGETHER!</p>
            <p>SEND ME A DM</p>
            <div className="contact-links">
              <a href="mailto:jhosuemesias@gmail.com">EMAIL <ArrowUpRight size={24} /></a>
              <span>OR</span>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={24} /></a>
            </div>
          </div>
        </div>
        <a className="top-button" href="#top" aria-label="To the top">
          <ChevronUp size={42} strokeWidth={1.25} />
          <span>To the top</span>
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
