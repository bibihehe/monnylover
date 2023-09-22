import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Icon } from 'app/model/icon.model';

@Injectable()
export class IconService {
    constructor(private http: HttpClient) {}
    
    getBase64Icon(path: string): Observable<string>{        
        const api_name: string  = "api.v1.image.get.base64";
        return this.http.post<string>(environment.SERVER_URL, {api_name, path}, {observe: "body"});
    }

    getIconByPath(path: string): Observable<Icon>{
        const api_name: string = "api.v1.icon.get_by_path";
        return this.http.post<Icon>(environment.SERVER_URL, {api_name, path}, {observe: "body"});
    }
}