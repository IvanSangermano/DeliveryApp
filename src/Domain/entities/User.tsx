import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {
    id?:              string;
    name:            string;
    lastname:        string;
    email:           string;
    image?:          string;
    phone:           string;
    password:        string;
    confirmPassword: string;
    session_token?:  string;
    roles?:           Rol[];
    address?:       Address;
} 