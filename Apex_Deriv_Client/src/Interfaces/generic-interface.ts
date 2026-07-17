export interface GenericInterface { }
export interface UserRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;        
    confirmPassword: string;
}
export interface UserResponse {
    message: string;
}
export interface UserLogin {
    email: string;
    password: string;
}