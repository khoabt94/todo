import validator from 'validator'
import * as yup from 'yup'

export const UpdateInfoSchema = yup.object().shape({
    name: yup.string()
        .required('Please tell us your name'),
    email: yup.string()
        .required('Please provide your email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
    avatar: yup.string()
});

export const ChangePasswordSchema = yup.object().shape({
    old_password: yup.string()
        .required('Please provide current password')
        .min(6, 'A password should have at least 6 characters'),
    new_password: yup.string()
        .required('Please provide new password')
        .min(6, 'A password should have at least 6 characters'),
    confirm_password: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('new_password')], 'Passwords not match'),
});
