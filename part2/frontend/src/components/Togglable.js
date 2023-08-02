import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    // this is used to expose the toggleVisibility function to the parent component
    // in this case the App component
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {/* props.children is used for refrencing the child components of a component
                e.g the usage for togglable is placing another component inside the toggle component
                or rather passing it as a child of Togglable component */}
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable