import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';
import getService from './services/getservice';
import postService from './services/postservice'
import { sampleUser } from './user';
import axios from 'axios';


function App() {
  axios.defaults.baseURL ="http://54.202.218.249:9501"
  const [user,setUser] =  useState( {...sampleUser})
  const [table, setTable] =useState([])
  useEffect(()=>{
    getService('api/users').then((res)=>{
      console.log(res)
      setTable(res.data)
    })
  },[])
  const onInput=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  const createUser=()=>{
    console.log(user)
    postService("/api/users",user)
  }
  return (
   <>
   
   <div class="container">
    	 <div class="register col-md-5 col-sm-6">
                <h1 class="title"><strong>Bio Data</strong>
				</h1>
				
				
                <form role="form">
                    <div class="form-group">
                    <label class="reg_txt">Name <span>*</span></label>
                        <div class="controls form-inline">       
                          <input 
name="firstName"
onChange={onInput}
value={user.firstName} 
 type="text"  class="input-name" placeholder="First" />
                          <input 
name="lastName"
onChange={onInput}
value={user.lastName} 
type="text" class="input-name" placeholder="Last" />
   					    </div>                        
                    </div>
                    <div class="clearfix"></div>
                    
                    <div class="form-group">
                    <label class="reg_txt">Email  <span>*</span></label>
                        <input 
name="email"
onChange={onInput}
value={user.email} type="text" class="form-register text" id="" placeholder="E-mail" />
                    </div>
                    <div class="clearfix"></div>
                    
                    <div class="form-group" style={{"height":"70px"}}>
                    <label class="reg_txt">Phone Number  <span>*</span></label>
                    	<div class="clearfix"></div>
                       <div class="wsite-form">
							<input 
name="phoneNumber"
onChange={onInput}
value={user.phoneNumber} type="text" class="text input-name1" />
					   </div>
                       <div class="line">-</div>
                       <div class="wsite-form">
							<input 
name="address1"
onChange={onInput}
value={user.address1} type="text" class="text input-name1" />
					   </div>
                       <div class="line">-</div>
                       <div class="wsite-form">
							<input 
name="address2"
onChange={onInput}
value={user.address2} type="text" class="text input-name1" />
					   </div>
                       
                    </div>
                    
                    <div class="clearfix"></div>
                    
                    <div class="form-group">
                    <label class="reg_txt">Address  <span>*</span></label>
                        <input 
name="address1"
onChange={onInput}
value={user.address1} type="text" class="form-register text" id="" placeholder="Line 1" style={{"margin-bottom":"15px"}} />
                        <input 
name="address2"
onChange={onInput}
value={user.address2} type="text" class="form-register text" id="" placeholder="Line 2" />
                    </div>
                    
                    <div class="form-group">                    
                        <div class="controls form-inline">       
                          <input 
name="city"
onChange={onInput}
value={user.city} type="text" class="input-name" placeholder="City" />
                          <input 
name="state"
onChange={onInput}
value={user.state} type="text" class="input-name" placeholder="State" />
   					    </div>                        
                    </div>
                    
                    <div class="form-group">                    
                        <div class="controls form-inline">       
                          <input 
name="zipCode"
onChange={onInput}
value={user.zipCode} type="text" class="input-name" placeholder="Zip Code" />
                          <input 
name="country"
onChange={onInput}
value={user.country} type="text" class="input-name" placeholder="Country" />
   					    </div>                        
                    </div>
					
					<div class="form-group">
                    <label class="reg_txt">Write Your qualification <span>*</span></label>
                        <input 
name="qualification"
onChange={onInput}
value={user.qualification} type="text" class="form-register text" id="" placeholder="" style={{"margin-bottom":"15px"}} />
                        {/* <!-- <input 
name="some"
onChange={onInput}
value={user.some} type="text" class="form-register text" id="" placeholder="Add your qualification"> <span><img alt="" src="images/plus.png" class="add"></span> --> */}
                    </div>
                    
                    
                    <div class="clearfix"></div>
                    
                    <div class="form-group">
                    <label class="reg_txt">Comment  <span>*</span></label>                        
                        <textarea
                        name="comments"
                        onChange={(e)=>{}}
                        value={user.comments}
                        class="form-register text" ></textarea>
                    </div>
                    
                    <div class="form-group">
                        <button onClick={createUser} type="button" class="btn btn-default submit" style={{"width":"97%"}} >Submit</button>
                    </div>
                </form>
             
        </div>
		
		<div class="col-md-6 tabt">
		    <table class="table">
  
          <tbody>
		  <tr class="ztxt">
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
    <tr key={ind}>
	  <td>{obj.firstName}</td>
      <td>{obj.email}</td>
      <td>{obj.phoneNumber}</td>
	  <td><button class="ed">Edit</button></td>
	  <td><button class="ed" style={{"background":"#f00"}} >Delete</button></td>
	  <td><button class="ed"style={{"background":"#000"}}>View</button></td>
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
