import { flushSync } from 'react-dom';
import { useNavigate, type NavigateOptions, type To } from 'react-router';

export type TransitionType = 'forward' | 'backwards' | '';

export function useViewTransitionNavigate(type: TransitionType = 'forward') {
  const navigate = useNavigate();

  return (to: To | number, options?: NavigateOptions) => {
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
      document.startViewTransition({
        update: doNavigate,
        types: type ? [type] : [],
      });
    } else {
      doNavigate();
    }
  };
}
