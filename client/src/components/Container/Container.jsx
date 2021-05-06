import './container.scss'

const Container = ({children, size = 'large'}) => <div className={`container ${size}`}>{children}</div>

export default Container
