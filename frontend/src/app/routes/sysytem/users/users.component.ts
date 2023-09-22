import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user.model';
import { UsersService } from './users.service';
import { CONSTS } from 'app/consts';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeletionComponent } from '@shared/components/money-lover/confirm-deletion/confirm-deletion.component';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'users-list',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss']
})

export class UsersListComponent implements OnInit {
    constructor(
        private usersService: UsersService,
        private dialogService: MatDialog, 
        private toast: ToastrService
    ) { }

    ngOnInit() { 
        this.searchUsers();
    }

    searchKey: string = "";
    userList: Partial<User>[] = [];
    displayedColumns: string[] = ['action','Username', 'Họ Tên', 'Email', 'Vai trò', 'Ngày tạo', 'Trạng thái'];
    columnProps: string[] = ['action','username','fullname', 'email', 'level', 'dateCreated', 'status'];
    total: number = 0;
    pageSize: number = CONSTS.page_size;
    page: number = 0;
    pageSizeOptions: number[] = CONSTS.page_size_options;
    listChecked: Set<string> = new Set<string>();
    isAllChecked: boolean = false;
    loading: boolean = false;

    addUser(){

    }

    deactivate(){
        this.dialogService.open(ConfirmDeletionComponent, {
            data: {
                title: "Xác nhận vô hiệu hóa tài khoản?",
                message: `Vô hiệu ${this.listChecked.size} tài khoản?`
            }
        })
        .afterClosed().subscribe((isConfirmed: boolean | undefined) => {
            if (isConfirmed) {
                this.loading = true;
                this.usersService.deactivateUsers(Array.from(this.listChecked))
                .subscribe(res => {
                    this.loading = false;
                    this.toast.success("Vô hiệu hóa tài khoản thành công");
                    this.searchUsers();
                    this.listChecked.clear();
                }, err => {
                    this.loading = false;
                    this.toast.error("Vô hiệu hóa tài khoản thất bại")
                })                
            }
        })
    }

    delete(){
        this.dialogService.open(ConfirmDeletionComponent, {
            data: {
                title: "Xác nhận xóa tài khoản?",
                message: `Xóa vĩnh viễn ${this.listChecked.size} tài khoản?`
            }
        })
        .afterClosed().subscribe((isConfirmed: boolean | undefined) => {
            if (isConfirmed) {
                this.loading = true;
                this.usersService.deleteUsers(Array.from(this.listChecked))
                .subscribe(res => {
                    this.loading = false;
                    this.toast.success("Xóa vĩnh viễn tài khoản thành công");
                    this.searchUsers();
                    this.listChecked.clear();
                }, err => {
                    this.loading = false;
                    this.toast.error("Xóa vĩnh viễn tài khoản thất bại")
                })                
            }
        })
    }

    searchUsers(){
        this.loading = true;
        this.usersService.getListData({
            search: this.searchKey
        }).subscribe(res => {
            this.userList = res.results;
            this.total = res.total;
            this.loading = false;
        }, err => {
            this.loading = false;
        })
    }

    updateCheckAll(){
        let isCheckedAll = true;
        for (let index = 0; index < this.userList.length; index++) {
            const element = this.userList[index];            
            if(!this.listChecked.has(element._id)){
                isCheckedAll = false;
                break;
            }
        }
        this.isAllChecked = isCheckedAll;
    }

    toggleCheckItem(val: boolean, id: string){
        if(val){
            this.listChecked.add(id);
        }
        else {
            this.listChecked.delete(id);
        }
        this.updateCheckAll();
    }

    toggleCheckAllItems(val: boolean){
        if(val){
            this.userList.forEach(u => {
                if(!this.listChecked.has(u._id)){
                    this.listChecked.add(u._id);
                }
            })
        }
        else {
            this.listChecked.clear();
        }
    }

    openLock(){
        this.dialogService.open(ConfirmDeletionComponent, {
            data: {
                title: "Xác nhận mở khóa tài khoản?",
                message: `Mở khóa ${this.listChecked.size} tài khoản?`
            }
        })
        .afterClosed().subscribe((isConfirmed: boolean | undefined) => {
            if (isConfirmed) {
                this.loading = true;
                this.usersService.unlockUsers(Array.from(this.listChecked))
                .subscribe(res => {
                    this.loading = false;
                    this.toast.success("Mở khóa tài khoản thành công");
                    this.searchUsers();
                    this.listChecked.clear();
                }, err => {
                    this.loading = false;
                    this.toast.error("Mở khóa tài khoản thất bại")
                })                
            }
        })
    }

    isShowLockButton(){
        if(this.listChecked.size)
            return this.userList.filter(u => this.listChecked.has(u._id)).map(u => u.status).find(s => s == 0) == null;
        else return false;
    }

    isShowUnlockButton(){
        if(this.listChecked.size)
            return this.userList.filter(u => this.listChecked.has(u._id)).map(u => u.status).find(s => s == 1) == null;
        else return false;
    }

    onChangePage(evt: PageEvent){
        this.page = evt.pageIndex;
        this.pageSize = evt.pageSize;
        this.searchUsers();
    }
}