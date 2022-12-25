import styles from '../styles/Form.module.css'
import {useState} from 'react';
import loader from '../public/loading.gif'
import Image from 'next/image'
const Form=()=>{
    const [hash,setHash]=useState(null)
    const [display,setDisplay]=useState("none")
    const [display2,setDisplay2]=useState("none")
    const [bill,setBill]=useState({
        PName:"",
        IMEI:"",
        PPrice:"",
        email:"",
        Aadhar:"",
        DOM:"",
        DOP:"",
        LTS:"",
        IMEI:"",
        Servicing:""
    })
    const handleInput=(e)=>{
        const name=e.target.name;
        const val=e.target.value;
        setBill({...bill,[name]:val})
    }
    const getStaticProps=async (e)=>{
        e.preventDefault()
        console.log(bill)
        if(display2==="none")
        setDisplay2("inline")
        try{
            const res=await fetch("http://localhost:5000/ipfs",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*"
                },
                body:JSON.stringify(bill)
            })
            const result=await res.json();
    
            if(res.status>=400 ||!result){
                window.alert("Error occurred at IPFS server")
            }
            else{
                window.alert("Bill generated and sent on Email")
                console.log(result.data)
                setHash(result.data)
                if(display==="none") setDisplay("block")
            }
        }
        catch(err){
            console.log(err)
        }
        setDisplay2("none")
    }
    return(
        <>
        <div className={styles.Form}>
        <form>
        <div className={styles.list}>
        Enter Product Details
        </div>
        <div>
        <input onChange={handleInput}name="PName" value={bill.PName}type="text" placeholder='Enter Product Name' className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="PPrice" value={bill.PPrice} type="text" placeholder='Enter Product Price' className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="PPrice" value={bill.IMEI} type="text" placeholder='Enter IMEI number of Phone' className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="Aadhar" value={bill.Aadhar}type="text" placeholder='Enter Aadhar Card of Owner'className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="IMEI" value={bill.IMEI}type="text" placeholder='Enter IMEI Number'className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="DOM" value={bill.DOM} type="text" placeholder='Date of Manufacture' className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="email" value={bill.email}type="text" placeholder='Enter Email of Customer' className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="DOP" value={bill.DOP}type="text" placeholder='Date of Purchase'className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}name="LTS" value={bill.LTS}type="text" placeholder='Last time serviced'className={styles.field}/>
        </div>
        <div>
        <input onChange={handleInput}type="text" name="Servicing" value={bill.Servicing}placeholder='Servicing Details'className={styles.field}/>
        </div>
        <div onClick={getStaticProps}className={styles.button}>
        Purchase
        </div>
        <div className={styles.loader}>
            <Image alt="Loading.." src={loader} width={150} height={80} style={{display:display2}}></Image>
            <div style={{display:display2}}>Loading..</div>
        </div>
        <div className={styles.result} style={{display:display}}>
        <div style={{textAlign:"center",color:'rgb(20,126,112)',fontSize:"5vw",fontWeight:"bold"}}>Your unique Hash ID is</div>
        <div style={{textAlign:"center",color:'crimson',fontSize:"4vw",fontWeight:"bold",wordBreak:"break-all",margin:"20px",marginTop:"50px"}}>{hash}</div>
        </div>
        </form>
        
        </div>
       
        </>
    )
}
export default Form