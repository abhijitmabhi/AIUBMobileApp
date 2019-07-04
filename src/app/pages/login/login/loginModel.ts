export class CredModel{
    public access_token: string;
    public token_type: string;
    public expires_in: number;
}
export class UserModel{
    public username: string;
    public password: string;
    public isRemember: boolean;
}
