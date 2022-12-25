import styles from '../styles/Verify.module.css'
import {useState} from 'react';
import loader from '../public/loading.gif'
import Image from 'next/image'
const Verify=()=>{
    const [disp,setDisp]=useState("none")
    const [disp1,setDisp1]=useState("none")
    const [CID,setCID]=useState("");
    const [bill,setBill]=useState({
        PName:"",
        PPrice:"",
        IMEI:"",
        email:"",
        Aadhar:"",
        DOM:"",
        DOP:"",
        LTS:"",
        Servicing:""
    });
    const handleInput=(e)=>{
        setCID(e.target.value)
    }
    const getStaticProps=async (e)=>{
        setDisp1("block")
        e.preventDefault()
        if(disp!="none") setDisp("none")
        try{
        const res=await fetch(`https://gateway.ipfs.io/ipfs/${CID}`,{
            method:"GET"
        })
        const result=await res.json();
        if(res.status>=400) window.alert("Error")
        else{
        console.log(result)
        setBill(result)
        setDisp1("none")
        setDisp("block")
        }
    }catch(err){
        setDisp("none");
        setDisp1("none")
        window.alert("Some Error Occured")
    }
    setDisp1("none")
    }
    return(
        <>
         <div className={styles.verify}>
            <div className={styles.head}>Please enter your Product Hash ID</div>
            <input className={styles.input} type="text" name="CID" value={CID} placeholder='Enter Product Hash ID' onChange={handleInput}></input>
            <div className={styles.button} onClick={getStaticProps}>Verify</div>
            <div className={styles.loader} style={{display:disp1}}>
            <Image src={loader} width={150} height={100}></Image>
            <div>Loading...</div>
            </div>

            <div className={styles.bill} style={{display:disp}}>
           <div className={styles.data}>
               <div>Product Name</div>
               <div>{bill.PName}</div>
           </div>
           <div className={styles.data}>
               <div>IMEI Number</div>
               <div>{bill.IMEI}</div>
           </div>
           
           <div className={styles.data}>
               <div>Product Price</div>
               <div>{bill.PPrice}</div>
           </div>
           <div className={styles.data}>
               <div>Email of Customer</div>
               <div>{bill.email}</div>
           </div>
           <div className={styles.data}>
               <div>Aadhar Number of Customer</div>
               <div>{bill.Aadhar}</div>
           </div>
           <div className={styles.data}>
               <div>Date of Manufacture</div>
               <div>{bill.DOM}</div>
           </div>
           <div className={styles.data}>
               <div>Date of Purchase</div>
               <div>{bill.DOP}</div>
           </div>
           <div className={styles.data}>
               <div>Last Time Manufacture</div>
               <div>{bill.LTS}</div>
           </div>
           <div className={styles.data}>
               <div>Servicing Details</div>
               <div>{bill.Servicing}</div>
           </div>
  </div>
            </div>

        </>
    )
}
export default Verify;