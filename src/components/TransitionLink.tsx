import { Link, type LinkProps } from 'react-router';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router';

export function TransitionLink({ to, children, ...props }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();

    document.documentElement.classList.add('vt-link');

    const doNavigate = () => {
      flushSync(() => navigate(to));
    };

    if ('startViewTransition' in document) {
      const transition = document.startViewTransition(doNavigate);
      transition.finished.then(() => {
        document.documentElement.classList.remove('vt-link');
      });
    } else {
      doNavigate();
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
