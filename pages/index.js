import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Block Pay</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Block Pay.jpeg" />
      </Head>
      <h1 className="welcome">Welcome to Block Pay</h1>
      <Navbar/>
      <Form/>
    </div>
  )
}
