import { Link, type LinkProps } from 'react-router';

import { useViewTransitionNavigate, type TransitionType } from '@/hooks/useViewTransitionNavigate';

interface TransitionLinkProps extends LinkProps {
  transitionType?: TransitionType;
}

export function TransitionLink({ to, children, transitionType = 'forward', ...props }: TransitionLinkProps) {
  const navigate = useViewTransitionNavigate(transitionType);

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
