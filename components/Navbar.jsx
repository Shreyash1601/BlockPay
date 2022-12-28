import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
const  Navbar=()=>{
    return(
        <>
        <div className={styles.Navbar}>
        <div className={styles.list}>
            <div className={styles.bill}><Link href="/"> Bill </Link></div>
            <div className={styles.Verify}><Link href="/Check"> Verify </Link></div>
        </div>

        </div>
        </>
    )
}
export default Navbar