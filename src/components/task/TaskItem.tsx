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

const SWIPE_THRESHOLD = -80;
const DELETE_THRESHOLD = -150;

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

  const bind = useDrag(
    ({ movement: [mx], direction: [dx], down }) => {
      const isLeftSwipe = dx < 0;

      if (down) {
        const constrainedX = Math.max(DELETE_THRESHOLD, Math.min(0, mx));
        api.start({ x: constrainedX, immediate: true });
      } else {
        if (mx <= DELETE_THRESHOLD && isLeftSwipe) {
          handleDelete();
        } else if (mx < SWIPE_THRESHOLD / 2) {
          api.start({ x: SWIPE_THRESHOLD, config: { tension: 300, friction: 30 } });
        } else {
          api.start({ x: 0, config: { tension: 300, friction: 30 } });
        }
      }
    },
    {
      axis: 'x',
      from: () => [x.get(), 0],
      filterTaps: true,
      rubberband: 0.2,
    },
  );

  const bgOpacity = x.to((val) => Math.min(1, Math.abs(val) / Math.abs(SWIPE_THRESHOLD)));
  const confirmOpacity = x.to((val) => (val <= DELETE_THRESHOLD ? 1 : 0.8));

  return (
    <animated.div
      ref={itemRef}
      data-testid='task-item'
      className='relative overflow-hidden rounded-xl'
      style={{ opacity }}
    >
      {/* Delete background layer */}
      <animated.div
        className='absolute inset-0 flex items-center justify-end rounded-xl'
        style={{
          backgroundColor: x.to((val) =>
            val <= DELETE_THRESHOLD ? 'rgb(220, 38, 38)' : 'rgb(239, 68, 68)',
          ),
          opacity: bgOpacity,
        }}
      >
        <animated.div
          className='flex items-center gap-2 pr-4 text-white'
          style={{ opacity: bgOpacity }}
        >
          <animated.span
            className='text-sm font-medium'
            style={{
              opacity: confirmOpacity,
            }}
          >
            {x.to((val) => (val <= DELETE_THRESHOLD ? 'Release to delete' : 'Delete'))}
          </animated.span>
          <RemoveIcon className='h-5 w-5' />
        </animated.div>
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

          <TaskActions
            expanded={isExpanded}
            onToggle={toggleExpand}
            onRemove={() => {
              removeTaskMutation.mutate(task.id);
            }}
          />
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
