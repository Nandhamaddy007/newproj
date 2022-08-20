class User{
    
       constructor(obj){
        this.firstName=obj.firstName
        this.lastName= "example"
        this.email= "test1@example.com"
        this.phoneNumber= "1111222233"
        this.address1= "sample"
        this.address2= "sample"
        this.city= "sample"
        this.state= "sample"
        this.zipCode= "111111"
        this.country= "sample"
        this.qualification= "sample"
        this.comments= "sample"
       }
    
}
export const sampleUser={
    "firstName": "",
    "lastName": "",
    "email": "",
    "phoneNumber": "",
    "address1": "",
    "address2": "",
    "city": "",
    "state": "",
    "zipCode": "",
    "country": "",
    "qualification": "",
    "comments": ""
}
export const sampleUserErrorMsgs={
    "firstName": "Please enter first name",
    "lastName": "Please enter last name",
    "email": "Please enter a valid email id",
    "phoneNumber": "Please enter a valid mobile number",
    "address1": "Please fill in your Door no & Street name",
    "address2": "Please fill in your area name",
    "city": "Please enter a valid city name",
    "state": "Please enter a valid state name",
    "zipCode": "Please enter a valid zipcode",
    "country": "Please enter a valid country name",
    "qualification": "Please provide your qualification",
    "comments": "Please provide a comment if not put NA",
    code:"Country code missing",
    phone1:"5 digits minimum",
    phone2:"5 digits minimum"
}