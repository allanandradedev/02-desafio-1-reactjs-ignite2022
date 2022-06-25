import styles from './Task.module.css';
import { BiTrash } from 'react-icons/bi';

interface TaskProps {
    title: string;
    isComplete: boolean
    onComplete: () => void;
    onRemove: () => void;
}

export function Task({
    title, isComplete, onComplete, onRemove
}: TaskProps) {
    return (
        <div className={styles.container}>
            <input 
                type='checkbox'
                checked={isComplete}
                onChange={onComplete} 
                className={styles.checkBox}
            ></input>
            <p>{title}</p> 
            <button onClick={onRemove}><BiTrash size={24}/></button>
        </div>  
    )
}