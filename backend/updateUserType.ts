import UserData from './userType';

export default interface UpdateUserData extends Partial<UserData>{
    id : string;
}