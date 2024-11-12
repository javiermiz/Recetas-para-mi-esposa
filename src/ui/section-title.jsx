import { Children } from 'react';

const SectionTitle = ({ className, children }) => {
  return (
    <h2 className={`text-xl font-black capitalize ${className}`}>{children}</h2>
  );
};

export { SectionTitle };
