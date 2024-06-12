import { Common } from "@/interfaces";

export const SortOption: Common.Option[] = [
  {
    label: 'Newest',
    value: '-createdAt'
  },
  {
    label: 'Highest Priority',
    value: '-priority'
  },
  {
    label: 'Lowest Priority',
    value: 'priority'
  },
  {
    label: 'Closest Deadline',
    value: 'deadline'
  },
  {
    label: 'Furthest Deadline',
    value: '-deadline'
  }
]