import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;
  expiresTimer:any;
  adminId:string;
  admin:Admin;
  adminInfo = new Subject<any>();
  private token:string;
  isAuthenticated = new BehaviorSubject<boolean>(false);
  isError = new BehaviorSubject<boolean>(true);
  constructor(private http:HttpClient) { }

  getToken(){
    return this.token;
  }
  getAdminDetails(){
    return this.adminInfo.asObservable();
  }
  createAdmin(form:Admin){
     this.http.post<{token:string,expiresIn:number,id:string}>(`${this.url}/admin/signup`,form).subscribe(res=>{
      this.token = res.token
      if(this.token){
       const now = new Date();
       const expiresIn = new Date(now.getTime() + (res.expiresIn*1000));
       this.saveAuthInfo(this.token,res.id,expiresIn.toISOString());
       this.setAuthTimer(res.expiresIn);
       this.isAuthenticated.next(true);
      }
     },err=> this.isError.next(false))

  }

  login(form){
    this.http.post<{token:string,expiresIn:number,id:string}>(`${this.url}/admin/login`,form).subscribe(res=>{
      this.token = res.token
     if(this.token){
      const now = new Date();
      const expiresIn = new Date(now.getTime() + (res.expiresIn*1000));
      this.saveAuthInfo(this.token,res.id,expiresIn.toISOString());
      this.setAuthTimer(res.expiresIn);
      this.isAuthenticated.next(true);
     }
    },err=> this.isError.next(false))
  }


  logout(){
    this.token = null;
    this.adminId = null;
    this.isAuthenticated.next(false);
    clearTimeout(this.expiresTimer);
    this.clearAuthData();
  }

  autoAuthAdmin(){
     const authInfo = this.getAuthData();
     if(!authInfo) return;
     const expires = new Date(authInfo.expiresIn).getTime() - new Date().getTime();
     if(expires > 0){
       this.token = authInfo.token;
       this.adminId = authInfo.adminId;
       this.setAuthTimer(expires/1000);
       this.isAuthenticated.next(true);
     }
  }

  saveAuthInfo(token:string,id:string, expires:string){
    localStorage.setItem(environment.token_key,token);
    localStorage.setItem(environment.exp_key,expires);
    localStorage.setItem(environment.id_key,id);
  }

  setAuthTimer(duration:number){
    this.expiresTimer = setTimeout(()=>{this.logout()},duration*1000);
  }

  getAuthData(){
   const token = localStorage.getItem(environment.token_key);
   const expiresIn =  localStorage.getItem(environment.exp_key);
   const adminId = localStorage.getItem(environment.id_key); 
   if(!token || !expiresIn || !adminId) return;
   return{ token,expiresIn,adminId};
  }
  clearAuthData(){
    localStorage.removeItem(environment.token_key);
    localStorage.removeItem(environment.exp_key);
    localStorage.removeItem(environment.id_key);
  }

  getAdmin(){
    this.http.get<{status:string,admin:Admin}>(`${this.url}/admin/${this.adminId}`)
    .subscribe(res=>{
               this.admin = res.admin;
               this.adminInfo.next(res.admin);
               },
               err=> this.isError.next(false))
  }


  updateAdmin(data){
    let updateData:{name:string,phone:number,image:string} | FormData;
    if(typeof(data.image) === 'object'){
      updateData = new FormData();
      updateData.append('name',data.name);
      updateData.append('phone',data.phone);
      updateData.append('image',data.image);
    }else{
      updateData = {
        name:data.name,
        phone:data.phone,
        image:data.image
      };
      
     }
    this.http.patch(`${this.url}/admin/${this.adminId}`,updateData)
    .subscribe(res => {
       this.getAdmin();
       },
       err=> this.isError.next(false))
  }

  updateEmail(data){
    this.http.patch(`${this.url}/admin/email/${this.adminId}`,data)
    .subscribe(res => {
       this.getAdmin();
       },
       err=> this.isError.next(false))
  }
}
