export interface RegisterResponse {
    status:Number;
    message: string;
}
export interface ApiResponse {
    message: string;
    data?: any; 
    token?: string;
}