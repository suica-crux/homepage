'use client';

// import { forwardRef } from 'react';
import Text from './Text';
// import ExternalLink from './ExternalLink';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-16 py-8 flex flex-col items-center">
      {/* <Text size="xl">Links</Text>
      <div className="flex space-x-6">
        <ExternalLink href="" />
      </div> */}
      <div className="text-center mt-4 text-sm">
        <Text color="gray">&copy; 2025 Vipelar. All Rights Reserved.</Text>
      </div>
    </footer>
  );
}
