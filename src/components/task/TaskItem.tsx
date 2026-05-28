import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';

import { TransitionLink } from '@/components/TransitionLink';
import type { Task } from '@/domain/Task';
import { useDeleteTaskMutation } from '@/hooks/useDeleteTaskMutation';
import { usePrefetchOnVisible } from '@/hooks/usePrefetchOnVisible';
import { useUpdateTaskMutation } from '@/hooks/useUpdateTaskMutation';

import { Checkbox } from './Checkbox';
import { RemoveIcon } from './RemoveIcon';
import { TaskActions } from './TaskActions';
import { TaskBadges } from './TaskBadges';
import { TaskNotes } from './TaskNotes';
import { TaskTitle } from './TaskTitle';

type Props = {
  task: Task;
  onDelete?: () => void;
};

const SWIPE_DELETE_THRESHOLD = -80;
const DELETE_THRESHOLD = -150;
const COMPLETE_THRESHOLD = 50;

export const TaskItem = ({ task, onDelete }: Props) => {
  console.log('TaskItem rendered.');
  const [isExpanded, setIsExpand] = useState(true);
  const itemRef = usePrefetchOnVisible(task.id);
  const updateTaskMutation = useUpdateTaskMutation();
  const removeTaskMutation = useDeleteTaskMutation({ onDelete });

  const [{ x, opacity }, api] = useSpring(() => ({ x: 0, opacity: 1 }));

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpand((prev) => !prev);
  };

  const handleDelete = () => {
    api.start({
      x: -window.innerWidth,
      opacity: 0,
      onRest: () => removeTaskMutation.mutate(task.id),
    });
  };

  const handleToggleComplete = () => {
    api.start({
      x: 0,
      config: { tension: 300, friction: 30 },
      onRest: () => {
        updateTaskMutation.mutate({ ...task, completed: !task.completed });
      },
    });
  };

  const bind = useDrag(
    ({ movement: [mx], down }) => {
      // Constrain drag between -150 (left) and +50 (right)
      const xPos = Math.max(DELETE_THRESHOLD, Math.min(COMPLETE_THRESHOLD, mx));

      if (down) {
        // Dragging - update position immediately
        api.start({ x: xPos, immediate: true });
        return;
      }

      // Released - check thresholds
      if (xPos <= DELETE_THRESHOLD) return handleDelete();
      if (xPos >= COMPLETE_THRESHOLD) return handleToggleComplete();

      // Partial swipe - snap back or reveal delete
      const target = xPos < SWIPE_DELETE_THRESHOLD / 2 ? SWIPE_DELETE_THRESHOLD : 0;
      api.start({ x: target, config: { tension: 300, friction: 30 } });
    },
    {
      axis: 'x',
      from: () => [x.get(), 0],
      filterTaps: true,
      rubberband: 0.2,
    },
  );

  return (
    <animated.div
      ref={itemRef}
      data-testid='task-item'
      className='relative overflow-hidden rounded-xl'
      style={{ opacity }}
    >
      {/* Background layer - Green for right (complete), Red for left (delete) */}
      <animated.div
        className='absolute inset-0 flex items-center rounded-xl'
        style={{
          backgroundColor: x.to((val) => (val > 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)')),
          display: x.to((val) => (Math.abs(val) > 1 ? 'flex' : 'none')),
        }}
      >
        {/* Left side - Check icon for complete */}
        <div className='flex flex-1 items-center pl-4'>
          <animated.svg
            className='h-6 w-6 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            style={{ opacity: x.to((val) => (val > 0 ? Math.min(1, val / 60) : 0)) }}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
          </animated.svg>
        </div>

        {/* Right side - Trash icon for delete */}
        <div className='flex flex-1 items-center justify-end pr-4'>
          <animated.div
            className='flex items-center gap-2 font-medium text-white'
            style={{ opacity: x.to((val) => (val < 0 ? Math.min(1, Math.abs(val) / 60) : 0)) }}
          >
            <animated.span className='text-sm tracking-wide uppercase'>
              {x.to((val) => (val <= SWIPE_DELETE_THRESHOLD / 2 ? 'Release to Delete' : 'Delete'))}
            </animated.span>
            <RemoveIcon className='h-5 w-5' />
          </animated.div>
        </div>
      </animated.div>

      {/* Main content layer */}
      <animated.div
        className='relative flex cursor-grab touch-pan-y flex-col gap-2 rounded-xl bg-slate-200 px-4 pt-2 pb-4 active:cursor-grabbing dark:bg-gray-800/50'
        style={{ x }}
        {...bind()}
      >
        <div className='flex gap-4'>
          <Checkbox
            id={`task-complete-${task.id}`}
            checked={task.completed}
            onChange={(value: boolean) => {
              updateTaskMutation.mutate({ ...task, completed: value });
            }}
          />

          <TransitionLink to={`/task/${task.id}`} className='flex-1'>
            <TaskTitle title={task.title} completed={task.completed} />
          </TransitionLink>

          <TaskActions expanded={isExpanded} onToggle={toggleExpand} />
        </div>

        <TaskBadges priority={task.priority} type={task.type} />

        <TaskNotes
          expanded={isExpanded}
          value={task.notes}
          onUpdate={(notes) => {
            updateTaskMutation.mutate({ ...task, notes: notes });
          }}
        />
      </animated.div>
    </animated.div>
  );
};
