import { ReactNode } from 'react';
import { Loader, Check, LayoutList, Pause, X } from 'lucide-react';

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export const StatusSortOrder: { [key in Status]: number } = {
  [Status.TODO]: 0,
  [Status.IN_PROGRESS]: 1,
  [Status.PENDING]: 2,
  [Status.COMPLETED]: 3,
  [Status.CANCELED]: 4
}

export interface IStatusOption {
  icon: ReactNode
  value: Status
  label: string
  className: string
}

export const StatusOption: IStatusOption[] = [
  {
    value: Status.TODO,
    label: 'To Do',
    icon: <LayoutList strokeWidth={1.8} size={16} color='#686D76' />,
    className: 'text-[#686D76] bg-[#686D76]',
  },
  {
    value: Status.IN_PROGRESS,
    label: 'In Progress',
    icon: <Loader strokeWidth={1.8} size={16} color='#10439F' />,
    className: 'text-[#10439F] bg-[#10439F]',
  },
  {
    value: Status.PENDING,
    label: 'Pending',
    icon: <Pause strokeWidth={1.8} size={16} color='#10439F' />,
    className: 'text-[#10439F] bg-[#10439F]',
  },
  {
    value: Status.COMPLETED,
    label: 'Completed',
    icon: <Check strokeWidth={1.8} size={16} color='#41B06E' />,
    className: 'text-[#41B06E] bg-[#41B06E]',
  },
  {
    value: Status.CANCELED,
    label: 'Canceled',
    icon: <X strokeWidth={1.8} size={16} color='#41B06E' />,
    className: 'text-[#41B06E] bg-[#41B06E]',
  },
]