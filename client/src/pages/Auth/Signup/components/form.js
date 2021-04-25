import {Button, Form, Input} from 'antd'

import { SIGNUP_MUTATION } from '../../../../graphql/mutations/auth'
import { useAuth } from '../../utils/useAuth'

export const SignupForm = () => {
    const [form] = Form.useForm()

    const {authUser, loading} = useAuth(SIGNUP_MUTATION, 'signup', form.getFieldsValue())

    return (
        <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={authUser}
        >
            <Form.Item
                hasFeedback
                validateTrigger="onBlur"
                name="username"
                rules={[
                    {required: true, message: 'Please enter your username'}
                ]}
            >
                <Input placeholder="Username"/>
            </Form.Item>
            <Form.Item
                hasFeedback
                validateTrigger="onBlur"
                name="email"
                rules={[
                    {required: true, message: 'Please enter your email'},
                    {type: 'email', message: 'Please enter valid email'}
                ]}
            >
                <Input placeholder="Email"/>
            </Form.Item>
            <Form.Item
                hasFeedback
                validateTrigger="onBlur"
                name="password"
                rules={[
                    {required: true, message: 'Please enter your password'},
                    {min: 8, message: 'Password should contain at least 8 characters'}
                ]}
            >
                <Input type="password" placeholder="Password"/>
            </Form.Item>
            <Form.Item
                hasFeedback
                validateTrigger="onBlur"
                name="confirm"
                dependencies={['password']}
                rules={[
                    {required: true, message: 'Please confirm your password'},
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match'));
                        },
                    }),
                ]}
            >
                <Input type="password" placeholder="Confirm password"/>
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                loading={loading} 
            >Signup</Button>
        </Form>
    )
}
