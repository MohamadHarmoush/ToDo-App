import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { TaskBadges } from '@/components/task/TaskBadges';
import { priorityColors } from '@/domain/Priority';
import { taskTypeColors, type TaskType } from '@/domain/TaskType';

describe('TaskBadges', () => {
  it('renders both priority and type badges', () => {
    render(<TaskBadges priority='High' type='Work' />);

    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('applies correct text colors for all priority levels', () => {
    const { rerender } = render(<TaskBadges priority='Low' type='General' />);
    expect(screen.getByText('Low')).toHaveStyle({ color: priorityColors.Low });

    rerender(<TaskBadges priority='Medium' type='General' />);
    expect(screen.getByText('Medium')).toHaveStyle({ color: priorityColors.Medium });

    rerender(<TaskBadges priority='High' type='General' />);
    expect(screen.getByText('High')).toHaveStyle({ color: priorityColors.High });
  });

  it('applies correct text colors for all task types', () => {
    const { rerender } = render(<TaskBadges priority='High' type='Work' />);

    const entries = Object.entries(taskTypeColors) as [TaskType, string][];
    for (const [type, value] of entries) {
      rerender(<TaskBadges priority='High' type={type} />);
      expect(screen.getByText(type)).toBeInTheDocument();
      expect(screen.getByText(type)).toHaveStyle({ color: value });
    }
  });
});
