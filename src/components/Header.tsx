import styles from './Header.module.css'
import logo from '../assets/logo.svg'

export function Header () {
    return (
        <header className={styles.container}>
            <img className={styles.logo} src={logo} alt="Logo" />
        </header>
    )
}