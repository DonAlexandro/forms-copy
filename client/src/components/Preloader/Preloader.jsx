import {Spin} from 'antd'

import './preloader.scss'

const Preloader = () => {
	return (
		<div className="loader-wrapper">
			<Spin tip="Loading..." />
		</div>
	)
}

export default Preloader
