import { useState, useEffect, useRef } from 'react';
import { StepFormSlice } from '@features/FirstStepForm/slice/FirstStepFormSlice';
import { useAtomValue } from 'jotai';
import { Menu, X } from 'lucide-react';
import cls from './Header.module.scss';



function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const $currentResumeStep = StepFormSlice.initialState.$currentResumeStep;
  const $resumePhoto = StepFormSlice.initialState.$resumePhoto;
  const currentStep = useAtomValue($currentResumeStep);
  const resumePhoto = useAtomValue($resumePhoto);
  // The last step index is 4 (ResumeContainer)
  const isLastStep = currentStep === 4;

  // For displaying the uploaded photo in the header
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const prevPhotoUrl = useRef<string>("");

  useEffect(() => {
    if (resumePhoto) {
      const url = URL.createObjectURL(resumePhoto);
      setPhotoUrl(url);
      // Clean up previous URL
      if (prevPhotoUrl.current) URL.revokeObjectURL(prevPhotoUrl.current);
      prevPhotoUrl.current = url;
    } else {
      setPhotoUrl("");
      if (prevPhotoUrl.current) URL.revokeObjectURL(prevPhotoUrl.current);
      prevPhotoUrl.current = "";
    }
    // Clean up on unmount
    return () => {
      if (prevPhotoUrl.current) URL.revokeObjectURL(prevPhotoUrl.current);
    };
  }, [resumePhoto]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={cls.root}>
      <div className={cls.container}>
        <div className={cls.content}>
          {/* Logo */}
          <a href="/" className={cls.logo}>
            <div>
              <img src="/div.png" alt="Logo"  className={cls.logoSvg} />
            </div>
            <span className={cls.logoText}>ResumeAI</span>
          </a>
      <div className={cls.navPar}>
          {/* Desktop Navigation */}
          <nav className={cls.nav}>
            <a href="/features" className={cls.navLink}>Features</a>
            <a href="/templates" className={cls.navLink}>Templates</a>
            <a href="/pricing" className={cls.navLink}>Pricing</a>
            <a href="/login" className={cls.navLink}>Login</a>
          </nav>

          {/* Desktop CTA */}
          <div className={cls.cta}>
            {isLastStep ? (
              photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Uploaded"
                  style={{ height: 40, width: 40, borderRadius: '50%', objectFit: 'cover', imageRendering: 'auto', background: '#fff' }}
                  fetchPriority="high"
                  decoding="async"
                  loading="eager"
                  draggable={false}
                />
              ) : (
                <img src="/upload.png" alt="Uploaded" style={{ height: 40, width: 40, borderRadius: '50%' }} />
              )
            ) : (
              <button className={cls.ctaButton}>Sign Up Free</button>
            )}
          </div>
      </div>
          {/* Mobile Menu Toggle */}
          <div className={cls.mobileToggle}>
            <button 
              className={cls.mobileButton}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className={cls.mobileIcon} />
              ) : (
                <Menu className={cls.mobileIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cls.mobileMenu}>
            <nav className={cls.mobileNav}>
              <a href="/features" className={cls.mobileLink}>Features</a>
              <a href="/templates" className={cls.mobileLink}>Templates</a>
              <a href="/pricing" className={cls.mobileLink}>Pricing</a>
              <a href="/login" className={cls.mobileLink}>Login</a>
              {isLastStep ? (
                photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Uploaded"
                    style={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'cover', imageRendering: 'auto', background: '#fff' }}
                    fetchPriority="high"
                    decoding="async"
                    loading="eager"
                    draggable={false}
                  />
                ) : (
                  <img src="/upload.png" alt="Uploaded" style={{ height: 36, width: 36, borderRadius: '50%' }} />
                )
              ) : (
                <button className={cls.mobileCta}>Sign Up Free</button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };