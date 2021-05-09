import './MainLayout.scss'

const MainLayout = ({children}) => {
	return (
		<div className="main-wrapper">
			<div className="page">{children}</div>
		</div>
	)
}

export default MainLayout
