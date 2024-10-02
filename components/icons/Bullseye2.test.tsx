import React from 'react';
import { render } from '@testing-library/react';
import Bullseye2 from './Bullseye2';

describe('Bullseye2', () => {
  it('renders correctly', () => {
    const { container } = render(<Bullseye2 />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Bullseye2 className="custom-class" />);
    expect(container.querySelector('svg')).toHaveClass('custom-class');
  });

  it('has correct viewBox', () => {
    const { container } = render(<Bullseye2 />);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('has correct path', () => {
    const { container } = render(<Bullseye2 />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', expect.stringContaining('M11.9989 2.01423C6.4759 2.01423 1.9989 6.49123 1.9989 12.0142C1.9989 17.5372 6.4759 22.0142 11.9989 22.0142C17.5219 22.0142 21.9989 17.5372 21.9989 12.0142C21.9989 6.49123 17.5219 2.01423 11.9989 2.01423Z'));
  });
});