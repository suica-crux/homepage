import React from 'react';
import Text from './Text';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card-bg border-t border-border mt-16 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-main-text opacity-50 font-medium">
          &copy; 2025-{new Date().getFullYear()} Vipelar. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
