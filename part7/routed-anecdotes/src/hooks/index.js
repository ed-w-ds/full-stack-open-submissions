// file for custom hooks
import { useState } from 'react'

export const useField = () => {
    const [value, setValue] = useState('')
    
    const onChange = (e) => {
        setValue(e.target.value)
        console.log('value', value)
    }

    const reset = () => {
        setValue('')
    }
    
    return {
        value,
        onChange,
        reset
    }
}