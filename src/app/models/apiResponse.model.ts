export interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
    data?: any; 
    token?: string;
}