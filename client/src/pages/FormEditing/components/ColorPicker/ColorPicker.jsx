import {useMemo} from 'react'
import {Menu, Dropdown, Button} from 'antd'
import {BgColorsOutlined, CheckOutlined} from '@ant-design/icons'

import {colors} from '../../../../utils/colors'

import './ColorPicker.scss'

const ColorPicker = ({currentColor, setColor}) => {
	const menu = useMemo(
		() => (
			<Menu>
				{colors.map(color => (
					<Menu.Item
						key={color}
						style={{backgroundColor: color}}
						className="pick-color"
						onClick={() => setColor(color)}
						icon={currentColor === color && <CheckOutlined twoToneColor="#fff" />}
					></Menu.Item>
				))}
			</Menu>
		),
		[currentColor, setColor]
	)

	return (
		<Dropdown overlay={menu} trigger={['click']}>
			<Button icon={<BgColorsOutlined />} />
		</Dropdown>
	)
}

export default ColorPicker
