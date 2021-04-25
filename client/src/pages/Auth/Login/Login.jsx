import {Typography, Card} from 'antd'
import {Link} from 'react-router-dom'

import { LoginForm } from './components/form'

const {Text} = Typography

const Login = () => {
    return (
        <div className="auth-wrapper">
            <Card
                className="auth-card"
                title={<Text strong>Welcome back!</Text>}
                actions={[<Link to="/signup">Don't have an account yet?</Link>]}
            >
                <LoginForm />
            </Card>
        </div>
    )
}

export default Login
