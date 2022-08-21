import { useEffect } from 'react'
import './view.css'
export default function ViewUser(props){
    
    useEffect(()=>{

        console.log(props.id)
    },[props])
    return(
        <>       

<div className="modal fade" id={"viewModal"+props.id._id} tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div >      
      <div>    
      <div class="page-content page-container modal-content"
      style={{background:"none",border:"none"}}
      >
    <div class="padding">
        <div class="row container d-flex justify-content-center">
<div class="col-xl-6 col-md-12">
                                                <div class="card user-card-full">
                                                    <div class="row m-l-0 m-r-0" >
                                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                                            <div class="card-block text-center text-white">
                                                                <div class="m-b-25">
                                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                                                                </div>
                                                                <h6 class="f-w-600">{props.id.firstName+" "+props.id.lastName}</h6>
                                                                <p>{props.id.qualification}</p>
                                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-8" >
                                                            <div class="card-block">
                                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600" style={{paddingTop:"5%"}}>Information</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Email</p>
                                                                        <h6 class="text-muted f-w-400">{props.id.email}</h6>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Phone</p>
                                                                        <h6 class="text-muted f-w-400">{props.id.phoneNumber}</h6>
                                                                    </div>
                                                                </div>
                                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Address</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        
                                                                        <h6 class="text-muted f-w-400">{props.id.address1} {props.id.address2}</h6>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                              
                                                                        <h6 class="text-muted f-w-400">{props.id.city}, {props.id.state}, {props.id.country}</h6>
                                                                    </div>
                                                                </div>   
                                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600" style={{paddingTop:"5%"}}>Comments</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                      
                                                                        <h6 class="text-muted f-w-400">{props.id.comments}</h6>
                                                                    </div>
                                                                  
                                                                </div>                                                         
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                             </div>
                                                </div>
                                            </div>
      </div>
      <div >
       
      </div>
    </div>
  </div>
</div>
        </>
    )
}