import * as yup from 'yup'
import validator from 'validator'

export const ProjectFormSchema = yup.object().shape({
    title: yup.string()
        .required('Title is a required field!'),
    imageCover: yup.string()
        .required('Cover image is a required field!'),
    description: yup.string()
        .required('Description is a required field!'),
});

export const ProjectContributorSchema = yup.object().shape({
    email: yup.string()
        .required('Please provide an email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
});
