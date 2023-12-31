import { useSelector, useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {

    const filter = useSelector(state => state.filter)
    // actions are dispached with useDispatch, triggering a state change
    const dispatch = useDispatch()

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      dispatch(setFilter(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
    return (
        <div style={style}>
          filter <input
            value={filter}
            onChange={handleChange}
          />
        </div>
      )
    }

export default Filter