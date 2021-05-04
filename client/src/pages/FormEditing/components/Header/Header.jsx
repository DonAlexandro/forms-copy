import {Button} from 'antd'
import {BgColorsOutlined} from '@ant-design/icons'
import {PageHeader} from 'antd'
import {useHistory} from 'react-router-dom'

const Header = ({form}) => {
	const history = useHistory()

	return (
		<PageHeader
			className="page-header"
			title={form.title}
			subTitle={form.description || 'Description'}
			onBack={() => history.push('/')}
			extra={[<Button key="color" icon={<BgColorsOutlined />} />]}
		/>
	)
}

export default Header
