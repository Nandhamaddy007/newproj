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
    "city": "Enter a valid city",
    "state": "Enter a valid state",
    "zipCode": "Enter a valid zipcode",
    "country": "Enter a valid country",
    "qualification": "Please provide your qualification",
    "comments": "Please provide a comment if not put NA",
    code:"Code missing",
    phone1:"5 digits min",
    phone2:"5 digits min"
}