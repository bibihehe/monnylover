import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Icon } from 'app/model/icon.model';
import { Category } from 'app/model/category.model';
import { CONSTS } from 'app/consts';

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) { }

    getListData(model: string, search: any) {
        let api: string = `api.v1.${model}.list`;
        return this.http.post<Icon[]>(environment.SERVER_URL, { ...search, api_name: api }, { observe: "body" });
    }

    /* #region Category */
    getListCategories(search: string, page: number = 0, size: number = CONSTS.page_size_get_all) {
        const api_name: string = "api.v1.category.list";
        return this.http.post<{results: Category[], total: number}>(environment.SERVER_URL, { api_name, search, page, size }, { observe: "body" });
    }

    insertCategory(data: { name: string, icon: string, transactionType: number, isDefault?: number }) {
        const api_name: string = "api.v1.category.add";
        return this.http.post(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }

    updateCategory(data: { name: string, icon: string, id: string, transactionType: number }) {
        const api_name: string = "api.v1.category.update";
        return this.http.post<Category[]>(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }

    deleteCategories(data: { ids: string[] }) {
        const api_name: string = "api.v1.category.delete";
        return this.http.post(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }
    /* #endregion */

    /* #region Icon */
    saveIconData(data: { file: string }) {
        const api_name: string = "api.v1.icon.upload";
        return this.http.post(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }

    deleteIcon(data: { ids: string[], paths: string[] }) {
        const api_name: string = "api.v1.icon.delete";
        return this.http.post(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }
    /* #endregion */

    /* #region Wallet type */
    getListWalletTypes(search: any) {
        const api_name: string = "api.v1.wallet-type.list";
        return this.http.post<Category[]>(environment.SERVER_URL, { api_name, ...search }, { observe: "body" });
    }

    insertWalletType(data: { name: string, icon: string }) {
        const api_name: string = "api.v1.wallet-type.add";
        return this.http.post(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }

    updateWalletType(data: { name: string, icon: string, id: string }) {
        const api_name: string = "api.v1.wallet-type.update";
        return this.http.post<Category[]>(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }

    deleteWalletTypes(data: { ids: string[] }) {
        const api_name: string = "api.v1.wallet-type.delete";
        return this.http.post(environment.SERVER_URL, { api_name, ...data }, { observe: "body" });
    }
    /* #endregion */
}