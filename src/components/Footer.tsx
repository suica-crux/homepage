import React from 'react';
import Text from './Text';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-16 py-8 flex flex-col items-center">
      <div className="text-center mt-4 text-sm">
        <Text color="gray">&copy; 2025-2026 Vipelar. All Rights Reserved.</Text>
      </div>
    </footer>
  );
};

export default Footer;
