import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Badge } from '@/components/task/Badge';

describe('Badge', () => {
  it('renders the label text', () => {
    render(<Badge label='Personal' />);
    expect(screen.getByText('Personal')).toBeInTheDocument();
  });

  it('sets text color via props', () => {
    render(<Badge label='High' textColor='#22c55e' />);
    expect(screen.getByText('High').parentElement).toHaveStyle({ color: '#22c55e' });
  });
});
