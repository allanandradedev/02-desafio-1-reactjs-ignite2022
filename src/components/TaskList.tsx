import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BiPlusCircle } from 'react-icons/bi';

import { Task } from './Task';

import styles from './TaskList.module.css';

interface Task {
    id: string;
    title: string;
    isComplete: boolean;
}

export function TaskList() {

    const [tasks, setTasks] = useState<Task[]>([])

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const createdTasks = tasks.length
    const concludedTasks = tasks.filter(task => task.isComplete).length

    function handleRemove(taskId: string) {
        const tasksWithoutRemovedOne = tasks.filter(task => task.id !== taskId)
        setTasks(tasksWithoutRemovedOne)
    }

    function handleComplete(taskId: string) {
        const tasksWithTaskCompleted = tasks.map(task => {
            if (task.id == taskId) {
                return {...task, isComplete: !task.isComplete}
            }
            return task
        })
        setTasks(tasksWithTaskCompleted)
    }

    function handleNewTaskCreation(event: FormEvent) {
        event.preventDefault()

        const newTask = {
            id: uuidv4(),
            title: newTaskTitle,
            isComplete: false,
        }

        setTasks([...tasks, newTask])
        setNewTaskTitle('')
    }

    function handleNewTaskTitleChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setNewTaskTitle(event.target.value)
    }

    function handleInvalidCommentTitle(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Insira um título válido.')
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleNewTaskCreation} className={styles.formContainer}>
                <input 
                    className={styles.taskInput}
                    type="text" 
                    placeholder='Adicione uma nova tarefa'
                    onChange={handleNewTaskTitleChange}
                    value={newTaskTitle}
                    onInvalid={handleInvalidCommentTitle}
                    required
                />
                <button 
                    type='submit' 
                    className={styles.addButton}
                >
                    Criar <BiPlusCircle size={16}/>
                </button>
            </form>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.createdTasks}>
                        <p>Tarefas criadas</p>
                        <div className={styles.counter}>
                            <span>{createdTasks}</span>
                        </div>
                    </div>
                    <div className={styles.concludedTasks}>
                        <p>Tarefas concluídas</p>
                        <div className={styles.counter}>
                            <span>{concludedTasks} de {createdTasks}</span>
                        </div>
                    </div>
                </header>
                <main className={styles.list}>
                    {tasks.map(task => (
                        <Task 
                            key={task.id} 
                            title={task.title} 
                            isComplete={task.isComplete}
                            onComplete={() => handleComplete(task.id)}
                            onRemove={() => handleRemove(task.id)}
                        />
                    ))} 
                </main>
            </div>
        </div>
    )
}