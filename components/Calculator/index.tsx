import { evaluate } from 'mathjs'
import { ChangeEvent, ReactElement, useMemo, useRef, useState } from 'react'

import style from './calculator.module.sass'

//Project creating on the prototype https://dev.to/theranbrig/build-a-react-calculator-with-hooks-and-context-api-on

type Action = {
    key: string
    className: string
    onClick: () => void
}

const isDigit = (key: string) => key >= "0" && key <= "9";

const Calculator = (): ReactElement => {
    const { calculator, info, action, zero } = style
    const { sign, num, compute } = style

    const [result, setResult] = useState<string>(null!)
    const inputRef = useRef<HTMLInputElement>(null!)

    const computing = (value: string) => {
        try {
            const expressions = evaluate(value)
            if (typeof expressions === 'number')
                setResult(expressions.toString())
            else setResult('Error')
        }
        catch (error) {
            setResult('Error')
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        if (value == '') {
            e.target.value = '0'
            return
        }
        computing(value)
    }

    const Input = (Key: string) => {
        const key = Key.slice(0, 1).toLowerCase()
        const { current } = inputRef
        const { value } = current

        const lastValueChar = value.slice(-1)

        //TODO '(' ')' to bad work
        switch (key) {
            case 'c':
                current.value = '0'
                break
            case '<':
                current.value = value.slice(0, value.length - 1)
                current.value = current.value == '' ? '0' : current.value
                break
            case '(':
                if (isDigit(lastValueChar))
                    return
            case ')':
                if (lastValueChar == '(') return
            default:
                if (value == '0' && key != '.') {
                    current.value = key
                } else if (!isDigit(key) && !isDigit(lastValueChar) &&
                    key != '(' && key != ')' &&
                    lastValueChar != '(' && lastValueChar != ')')
                    current.value = value.slice(0, value.length - 1) + key
                else current.value = value + key
        }

        current.scrollTo({ left: current.scrollWidth })
        computing(current.value)
    }

    const onClick = (key) => Input(key)
    const CreateAction = (key, className) => ({ key, className, onClick: () => onClick(key) })

    const Sign = (key) => CreateAction(key, sign)
    const Num = (key) => CreateAction(key, num)
    const Com = (key) => CreateAction(key, compute)
    const Zero = (key) => CreateAction(key, `${num} ${zero}`)

    const elemAction = ({ key, className, onClick }: Action) =>
        <button className={className} onClick={onClick} key={key}>{key}</button>

    const actions = useMemo(() => [
        Sign('C'), Sign('<-'), Sign('('), , Sign(')'),
        Num('7'), Num('8'), Num('9'), Com('/'),
        Num('4'), Num('5'), Num('6'), Com('*'),
        Num('1'), Num('2'), Num('3'), Com('-'),
        Zero('0'), Num('.'), Com('+')
    ].map(elemAction), [])

    return <div className={calculator}>
        <header>CALCULATOR</header>
        <div className={info}>
            <input ref={inputRef} onChange={onChange} defaultValue='0' />
            <p>{result ?? 'RESULT'}</p>
        </div>
        <div className={action}>
            {actions}
        </div>
    </div>
}

export default Calculator