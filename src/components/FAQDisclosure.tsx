import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

export function FAQDisclosure({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      {isOpen ? <ExpandLess aria-hidden /> : <ExpandMore aria-hidden />}
      <dt>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}_desc`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <b>{title}</b>
        </button>
      </dt>
      <dd
        id={`${id}_desc`}
        style={isOpen ? { display: 'block' } : { display: 'none' }}
      >
        {children}
      </dd>
    </div>
  );
}
