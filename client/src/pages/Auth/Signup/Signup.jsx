import {Typography, Card} from 'antd'
import {Link} from 'react-router-dom'

import { SignupForm } from './components/form'

import '../auth.scss'

const {Text} = Typography

const Signup = () => {
    return (
        <div className="auth-wrapper">
            <Card
                className="auth-card"
                title={<Text strong>Join Us!</Text>}
                actions={[<Link to="/login">Already have an account?</Link>]}
            >
                <SignupForm />
            </Card>
        </div>
    )
}

export default Signup
