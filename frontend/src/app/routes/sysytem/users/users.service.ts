import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from 'app/model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) { }

    getListData(search: Object) {
        let api: string = `api.v1.systemuser.list`;
        return this.http.post<{results: Partial<User>[], total: number}>(environment.SERVER_URL, { ...search, api_name: api }, { observe: "body" });
    }

    deactivateUsers(ids: string[]){
        let api: string = `api.v1.systemuser.deactivate`;
        return this.http.post<{results: any}>(environment.SERVER_URL, {api_name: api, ids}, {observe: 'body'});
    }

    deleteUsers(ids: string[]){
        let api: string = `api.v1.systemuser.delete`;
        return this.http.post<{results: any}>(environment.SERVER_URL, {api_name: api, ids}, {observe: 'body'});
    }

    unlockUsers(ids: string[]){
        let api: string = `api.v1.systemuser.unlock`;
        return this.http.post<{results: any}>(environment.SERVER_URL, {api_name: api, ids}, {observe: 'body'});
    }
    
    updateUser(user: Partial<User>){
        let api: string = `api.v1.systemuser.update`;
        return this.http.post(environment.SERVER_URL, {api_name: api, ...user}, {observe: 'body'});
    }

    getUser(){
        let api: string = `api.v1.systemuser.get`;
        return this.http.post<User>(environment.SERVER_URL, {api_name: api}, {observe: 'body'});
    }
}