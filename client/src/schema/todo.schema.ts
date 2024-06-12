import { Priority } from '@/enums';
import * as yup from 'yup'

export const TodoFormSchema = yup.object().shape({
    title: yup.string()
        .required('Title is a required field!')
        .max(50, 'Title should not have more than 50 characters')
        .min(10, 'Title should not have less than 10 characters'),
    deadline: yup.date()
        .required('Deadline is a required field!'),
    should_notify: yup.boolean().required(),
    priority: yup.mixed().oneOf(Object.values(Priority)).required(),
    description: yup.string()
        .required('Description is a required field!'),
});


