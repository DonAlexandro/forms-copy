import {Button, Form, Input} from 'antd'

import {useAuth} from '../../utils/useAuth'
import { LOGIN_MUTATION } from '../../../../graphql/mutations/auth'

export const LoginForm = () => {
    const [form] = Form.useForm()

    const {authUser, loading} = useAuth(LOGIN_MUTATION, 'login', form.getFieldsValue())

    return (
        <Form form={form} onFinish={authUser}>
            <Form.Item
                hasFeedback
                validateTrigger="onBlur"
                name="email"
                rules={[
                    {required: true, message: 'Please enter your Email'},
                    {type: 'email', message: 'Please enter valid Email'},
                ]}
            >
                <Input type="email" placeholder="Email"/>
            </Form.Item>
            <Form.Item
                hasFeedback
                validateTrigger="onBlur"
                name="password"
                rules={[
                    {required: true, message: 'Please enter your password'},
                    {min: 8, message: 'Password should contain at least 8 characters'},
                ]}
            >
                <Input type="password" placeholder="Password"/>
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                loading={loading}
            >
                Login
            </Button>
        </Form>
    )
}
