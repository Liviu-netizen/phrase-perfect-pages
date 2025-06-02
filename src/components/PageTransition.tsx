
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsVisible(false);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsVisible(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible, location]);

  return (
    <div 
      className={`transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
