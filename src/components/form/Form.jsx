import { useState } from 'react'
import style from './index.module.scss'
import { Input, Button } from 'antd'

export default function Form({ createTask }) {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        createTask(inputValue)
        setInputValue('')
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <Input  
            className={style.input}
            type="text" 
            placeholder="введите задачу" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value.trimStart())}/>
            <Button type='primary' htmlType="submit" disabled={!inputValue}>создать</Button>
        </form>
    )
}