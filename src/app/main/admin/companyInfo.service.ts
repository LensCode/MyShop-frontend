import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    private companyDetails = new Subject<any>();
    isLoading = new BehaviorSubject<boolean>(true);
    private url = environment.apiURL;
    private id:string;
    constructor(
              private http:HttpClient,
            ){
             this.id = localStorage.getItem(environment.id_key);
             console.log(this.id)
            }

    companyInfo(){
        return this.companyDetails.asObservable();
    }


    createCompany(companyInfo){
        companyInfo.id = this.id;
        this.http.post<any>(`${this.url}/company/create`,companyInfo)
            .subscribe(res=>{
            this.companyDetails.next({...res.companyDetails});
            },err=>{this.isLoading.next(false)});
    }

    getCompanyDetails(){
        this.http.get<any>(`${this.url}/company/company-details/${this.id}`)
            .subscribe(res=>{
            this.companyDetails.next({...res.companyDetails});
            },err=>{this.isLoading.next(false)});
    }

    updatecompanyDetails(data){
        this.http.patch<any>(`${this.url}/company/update/${this.id}`,data)
                 .subscribe(res=>{
                   this.getCompanyDetails();
                  },
                  err=>{this.isLoading.next(false)});
    }
 
}