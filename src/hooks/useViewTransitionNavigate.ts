import { flushSync } from 'react-dom';
import { useNavigate, type NavigateOptions, type To } from 'react-router';

export function useViewTransitionNavigate(type: string = '') {
  const navigate = useNavigate();

  return (to: To | number, options?: NavigateOptions) => {
    document.documentElement.classList.add(type);

    const doNavigate = () => {
      flushSync(() => {
        if (typeof to === 'number') {
          navigate(to);
        } else {
          navigate(to, options);
        }
      });
    };

    if ('startViewTransition' in document) {
      const transition = document.startViewTransition({ update: doNavigate, types: [type] });
      transition.finished.then(() => {
        document.documentElement.classList.remove(type);
      });
    } else {
      doNavigate();
    }
  };
}
