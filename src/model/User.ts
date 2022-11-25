export class User{
    constructor(
    private id: string,
    private nome: string,
    private email: string,
    private password: string,
    private role?: Role
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.nome
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getRole(){
        return this.role;
    }

    setId(id: string){
        this.id = id;
    }

    setName(nome: string){
        this.nome = nome;
    }

    setEmail(email: string){
        this.email = email;
    }

    setPassword(password: string){
        this.password = password;
    }

    setRole(role: Role){
        this.role = role;
    }
}

export interface UserInputDTO{
    nome: string
    email: string;
    password: string;
    role: Role
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    NORMAL = 'NORMAL'
}

export type AuthenticationData = {
    id: string
}