import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';
import getService from './services/getservice';
import postService from './services/postservice'
import { sampleUser, sampleUserErrorMsgs } from './user';
import axios from 'axios';
import putService from './services/putservice';
import deleteService from './services/deleteservice';
import ViewUser from './viewUser';


function App() {
  axios.defaults.baseURL ="http://54.202.218.249:9501"
  const [user,setUser] =  useState( {...sampleUser})
  const [userError,setUserError] =  useState( {...sampleUser,code:"",phone1:"",phone2:""})
  const [phone,setPhone] = useState({code:"",phone1:"",phone2:""})
  const[editFlag, setEditFlag]= useState(false)
  const [table, setTable] =useState([])
  
  const validateEmail=(value)=>{    
    var validator = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!validator.test(value)) {
      
setUserError({
  ...userError,
  "email":sampleUserErrorMsgs["email"]
})
return sampleUserErrorMsgs["email"] 
    }else{
      setUserError({
        ...userError,
        "email":""
      })
      return ""
    }
    
  }
  const validateValue=(name,value)=>{    
    if(name=="email"){
      validateEmail(value)
    }else{
     
      if(value.length<1){
        
        setUserError({
          ...userError,
          [name]:sampleUserErrorMsgs[name]
        })
      }else{
        setUserError({
          ...userError,
          [name]:""
        })
      }
    }
  }
  const refresh=()=>{
    getService('api/users').then((res)=>{
      console.log(res)
      setTable(res.data)
    })
  }
  useEffect(()=>{
   refresh()
  },[])
  const editFill=(id)=>{
    getService('api/users/'+id).then((res)=>{
      console.log(res)
      setUser(res.data)
      setUserError({...sampleUser,code:"",phone1:"",phone2:""})
      setPhone({
        code:res.data.phoneNumber.substring(0,2),
        phone1:res.data.phoneNumber.substring(2,7),
        phone2:res.data.phoneNumber.substring(7,12),
      })
      setEditFlag(true)
    })
  }
  const onInput=(e)=>{
    validateValue(e.target.name,e.target.value)
    if(e.target.name=="firstName" || e.target.name=="lastName"){
      if(/^[a-zA-Z]*$/.test(e.target.value)){
        setUser({
          ...user,
          [e.target.name]:e.target.value
        })
      }else{
        if(e.target.value.length==1){
          setUserError({
            ...userError,
            [e.target.name]:sampleUserErrorMsgs[e.target.name]
          })
        }
      }
      
    }else{
      setUser({
        ...user,
        [e.target.name]:e.target.value
      })
    }
   
  }
  const validatePhone=(temp)=>{    
    let ret=true
    if(phone.code<10){
      ret=false
      temp["code"]=sampleUserErrorMsgs["code"]
    }
    if(phone.phone1<9999){
      ret=false
      temp["phone1"]=sampleUserErrorMsgs["phone1"]
    }
    if(phone.phone2<9999){
      ret=false
      temp["phone2"]=sampleUserErrorMsgs["phone2"]
    }
    setUserError({    
      ...userError ,
      ...temp
    })
    return ret
  }
  const deleteUser=(id)=>{
    deleteService("/api/users/"+id).then((res)=>{
      console.log(res)
      refresh()
    })
  }
  const checkFinal=()=>{
    let temp={}
    let ret=true
    for(let key of Object.keys(user)){
      if(user[key]===""){       
        temp[key]=sampleUserErrorMsgs[key]
      }
    }
    
    temp["email"]=validateEmail(user["email"])
    ret=validatePhone(temp)
    return ret
  }
  const createUser=()=>{
    console.log(user)    
    if(checkFinal()){
      let req={
        ...user,
        phoneNumber:phone.code+phone.phone1+phone.phone2        
      }
      console.log("req obj-->",req)
      postService("/api/users",req).then((res)=>{
        console.log(res)
        refresh()
      })
    }
    
    // 
  }
const updateUser=()=>{
  if(checkFinal()){
    let req={
      ...user,
      phoneNumber:phone.code+phone.phone1+phone.phone2        
    }
    console.log("req obj-->",req)
    putService("/api/users/"+user._id,req).then((res)=>{
      console.log(res)
      refresh()
    })
  }
}

  return (
   <>
   
   <div className="container">
    	 <div className="register col-md-5 col-sm-6">
                <h1 className="title"><strong>Bio Data</strong>
				</h1>
				
				
                <form role="form">
                    <div className="form-group">
                    <label className="reg_txt">Name <span>*</span></label>
                        <div className="controls form-inline">    
                        <div>                        
                          <input 
name="firstName"
onChange={onInput}
value={user.firstName} 
 type="text"  className={"input-name"+(userError.firstName?" error-elements":"")} placeholder="First" />

 </div>  
 <div>
                          <input 
name="lastName"
onChange={onInput}
value={user.lastName} 
type="text" className={"input-name"+(userError.lastName?" error-elements":"")} placeholder="Last" />

</div>
<span style={{color:'red',marginRight:"50%"}}>{userError.firstName}</span> 
<span style={{color:'red',}}>{userError.lastName}</span>


<br/>
   					    </div>                        
                    </div>
                    <div className="clearfix"></div>
                    
                    <div className="form-group">
                    <label className="reg_txt">Email  <span>*</span></label>
                        <input 
name="email"
onChange={onInput}
value={user.email} type="text" 
className={"form-register text"+(userError.email?" error-elements":"")} 
id="" placeholder="E-mail" />
<span style={{color:'red'}}  >{userError.email}</span>
                    </div>
                    <div className="clearfix"></div>
                    
                    <div className="form-group" style={{"height":"70px",marginBottom:"5%"}}>
                    <label className="reg_txt">Phone Number  <span>*</span></label>
                    	<div className="clearfix"></div>
                       <div className="wsite-form">
							<input 

onChange={(e)=>{
  if(!isNaN(e.target.value)){
  if(e.target.value.length<2){
    setUserError({
      ...userError,
      code:sampleUserErrorMsgs["code"]
    })
  }else{
    setUserError({
      ...userError,
      code:""
    })
    
  }
  
  if(e.target.value.length<3 ){
    setPhone({
      ...phone,
      code:e.target.value
    })
  }
}
 
}}
value={phone.code} type="text"  
className={"text input-name1"+(userError.code?" error-elements":"")}
 />
					   </div>
                       <div className="line">-</div>
                       <div className="wsite-form">
							<input 

onChange={(e)=>{
  if(!isNaN(e.target.value)){
    if(e.target.value.length<5){
      setUserError({
        ...userError,
        phone1:sampleUserErrorMsgs["phone1"]
      })
    }else{
      setUserError({
        ...userError,
        phone1:""
      })
      
    }
    
    if(e.target.value.length<6 ){
      setPhone({
        ...phone,
        phone1:e.target.value
      })
    }
  }
  
}}
value={phone.phone1} type="text" max={5} 
className={"text input-name1"+(userError.phone1?" error-elements":"")}

/>


					   </div>

                       <div className="line">-</div>
                       <div className="wsite-form">
							<input 

onChange={(e)=>{
  if(!isNaN(e.target.value)){
    if(e.target.value.length<5){
      setUserError({
        ...userError,
        phone2:sampleUserErrorMsgs["phone2"]
      })
    }else{
      setUserError({
        ...userError,
        phone2:""
      })
      
    }
    
    if(e.target.value.length<6){
      setPhone({
        ...phone,
        phone2:e.target.value
      })
    }
  }
}}
value={phone.phone2} type="text" max={5} 
className={"text input-name1"+(userError.phone2?" error-elements":"")}
/>
					   </div>
             <span style={{color:"red", marginRight:"9%"}}>{userError.code}</span>
    
<span style={{color:"red",marginLeft:"1%",marginRight:"10%"}}>{userError.phone1}</span>
{"   "}
<span style={{color:"red",marginLeft:"1%"}}>{userError.phone2}</span>
                       
                    </div>
                    
                    
                    
                    <div className="form-group" style={{marginTop:"10%"}}>
                    <label className="reg_txt">Address  <span>*</span></label>
                        <input 
name="address1"
onChange={onInput}
value={user.address1} type="text"
className={"form-register text"+(userError.address1?" error-elements":"")}
 id="" placeholder="Line 1"  />
<div style={{color:"red","margin-bottom":"15px"}}>{userError.address1}</div>
                        <input 
name="address2"
onChange={onInput}
value={user.address2} type="text" 
className={"form-register text"+(userError.address2?" error-elements":"")}
id="" placeholder="Line 2" />
<span style={{color:"red"}}>{userError.address2}</span>
                    </div>
                    
                    <div className="form-group" >                    
                        <div className="controls form-inline" >  
                        <div >
                          <input 
name="city"
onChange={onInput}
value={user.city} 
type="text"
className={"input-name"+(userError.city?" error-elements":"")} 
placeholder="City" />

                          <input 
name="state"
onChange={onInput}
value={user.state} type="text" 
className={"input-name"+(userError.state?" error-elements":"")}
placeholder="State" />
<span style={{color:"red", marginBottom:"10%", marginRight:"20%"}} >{userError.city}</span>
<span style={{color:"red",}}>{userError.state}</span>
</div>     
   					    </div>                        
                    </div>
                    
                    <div className="form-group" style={{marginTop:"10%"}}>                    
                        <div className="controls form-inline">       
                          <input 
name="zipCode"
onChange={onInput}
value={user.zipCode} type="text" 
className={"input-name"+(userError.zipCode?" error-elements":"")}
placeholder="Zip Code" />

                          <input 
name="country"
onChange={onInput}
value={user.country} type="text" 
className={"input-name"+(userError.country?" error-elements":"")}
placeholder="Country" />
<span style={{color:"red",marginRight:"15%"}}>{userError.zipCode}</span>
<span style={{color:"red",}} >{userError.country}</span>
   					    </div>                        
                    </div>
					
					<div className="form-group" style={{marginTop:"10%"}}>
                    <label className="reg_txt">Write Your qualification <span>*</span></label>
                        <input 
name="qualification"
onChange={onInput}
value={user.qualification} type="text" 
className={"form-register text"+(userError.qualification?" error-elements":"")}
id="" placeholder="" />
<span style={{color:"red", "margin-bottom":"15px"}}>{userError.qualification}</span>
                        {/* <!-- <input 
name="some"
onChange={onInput}
value={user.some} type="text" className="form-register text" id="" placeholder="Add your qualification"> <span><img alt="" src="images/plus.png" className="add"></span> --> */}
                    </div>
                    
                    
                    <div className="clearfix"></div>
                    
                    <div className="form-group">
                    <label className="reg_txt">Comment  <span>*</span></label>                        
                        <textarea
                        name="comments"
                        onChange={onInput}
                        value={user.comments}
                        className={"form-register text"+(userError.comments?" error-elements":"")}
                        ></textarea>
                        <span style={{color:"red"}}>{userError.comments}</span>
                    </div>
                    
                    <div className="form-group">
                        {!editFlag && <button onClick={createUser} type="button" className="btn btn-default submit" style={{"width":"97%"}} >Submit</button>}
                        {editFlag && <button onClick={updateUser} type="button" className="btn btn-default submit" style={{"width":"97%"}} >Update</button>}
                    </div>
                </form>
             
        </div>
		
		<div className="col-md-6 tabt">
		    <table className="table">
  
          <tbody>
		  <tr className="ztxt">
	  <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Edit</th>
	  <th>Delete</th>
	  <th>View</th>
      </tr>
      {table.map((obj,ind)=>{
return(
  <>
  <ViewUser id={obj} />
    <tr key={ind}>
	  <td>{obj.firstName}</td>
      <td>{obj.email}</td>
      <td>{obj.phoneNumber}</td>
	  <td><button className="ed" onClick={()=>{editFill(obj._id)}}>Edit</button></td>
	  <td><button className="ed" onClick={()=>{deleteUser(obj._id)}} style={{"background":"#f00"}} >Delete</button></td>
	  <td><button className="ed"style={{"background":"#000"}}   
    data-bs-toggle="modal" data-bs-target={"#viewModal"+obj._id}
    >View</button></td>
    </tr>
  </>
)
      })}
  
	</tbody>
	</table>
		</div>
       
    </div>
    
   </>
  );
}

export default App;
