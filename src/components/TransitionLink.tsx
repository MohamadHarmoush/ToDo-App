import { Link, type LinkProps } from 'react-router';

import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';

export function TransitionLink({ to, children, ...props }: LinkProps) {
  const navigate = useViewTransitionNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <Link to={to} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
