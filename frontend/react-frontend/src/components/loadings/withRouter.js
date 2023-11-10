import {useLocation} from 'react-router-dom'

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const history = useLocation()
        return <Component location={history} {...props} />
    }
    return Wrapper
}
