import { Children } from 'react';

const SectionTitle = ({ className, children }) => {
  return (
    <h2 className={`text-2xl font-black capitalize ${className}`}>
      {children}
    </h2>
  );
};

export { SectionTitle };
