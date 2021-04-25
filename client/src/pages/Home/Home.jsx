import { useContext } from 'react'
import {Button, PageHeader} from 'antd'
import {Link} from 'react-router-dom'

import {AuthContext} from '../../context/auth'
import { FormsList } from './components/formsList'

import './home.scss'

const Home = () => {
    const {logout, user} = useContext(AuthContext)

    return (
        <div className="main-wrapper">
            <div className="page">
                <PageHeader
                    title={`Hello, ${user.username}`}
                    className="page-header"
                    extra={[
                        <Button type="primary" key="new">
                            <Link to="/form/new">New Form</Link>
                        </Button>,
                        <Button onClick={logout} key="logout">Logout</Button>
                    ]}
                />
                <div className="container">
                    <FormsList />
                </div>
            </div>
        </div>
    )
}

export default Home
