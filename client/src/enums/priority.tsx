import { ReactNode } from 'react';
import { ChevronDown, Equal, ChevronUp } from 'lucide-react';

export enum Priority {
  LOW,
  MEDIUM,
  HIGH
}

export interface IPriorityOption {
  icon: ReactNode
  className: string
  value: number
  label: string
}

export const PriorityOption: IPriorityOption[] = [
  {
    value: Priority.LOW,
    label: 'Low',
    icon: <ChevronDown color='#4783EB' />,
    className: 'bg-[#4783EB]'
  },
  {
    value: Priority.MEDIUM,
    label: 'Medium',
    icon: <Equal color='#FBB323' />,
    className: 'bg-[#FBB323]'
  },
  {
    value: Priority.HIGH,
    label: 'High',
    icon: <ChevronUp color='#EA0B16' />,
    className: 'bg-[#EA0B16]'
  }
]