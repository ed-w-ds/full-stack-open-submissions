// file for custom hooks
import { useState } from 'react'

export const useField = () => {
    const [value, setValue] = useState('')
    
    const onChange = (e) => {
        setValue(e.target.value)
    }
    
    return {
        value,
        onChange
    }
}