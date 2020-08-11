import { ReactElement } from "react";
import ScrollingFeed from "../../../components/ScrollingFeed/ScrollingFeed";
import json from './todos.json'
import style from './styles.module.sass'

type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}

const Feedtodos = (): ReactElement => {
    const { todo, todos } = style
    const { todo_id, todo_userid, todo_title, todo_completed, todo_uncompleted } = style
    return <ScrollingFeed container={todos}
        maxDataLength={json.length}
        responseData={({ start, end }) => json.slice(start, end)}
        children={(data: Todo, key: number) =>
            <div key={key} className={`${todo} ${data.completed ? todo_completed : todo_uncompleted}`}>
                <div className={todo_title}>{data.title}</div>
                <span className={todo_id}>{data.id}</span>
                <span className={todo_userid}>{data.userId}</span>
            </div>
        } />
}

export default Feedtodos