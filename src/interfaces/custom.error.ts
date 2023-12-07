export default interface CustomErrorResponse {
	object: string;
	type: string;
	merchant_message: string;
	user_message?: string;
	param?: string;
}
