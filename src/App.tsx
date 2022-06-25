import { Header } from './components/Header'
import { TaskList } from './components/TaskList'

import styles from './App.module.css'
import './global.css'

function App() {
  return (
    <div className="App">
      <Header />
      <div className={styles.taskList}>
        <TaskList />
      </div>
    </div>
  )
}

export default App
