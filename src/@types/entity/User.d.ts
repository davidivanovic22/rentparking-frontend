import { Identifiable } from "./Identifiable";
import { Role } from  "./Role"

export interface User extends Identifiable {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	password: string;
	cvv: string;
	bank_name: string;
	bank_account: string;
	roles: Role[];
}
