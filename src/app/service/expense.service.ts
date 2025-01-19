import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ExpenseCreate, ExpenseSarchRequest } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = environment.apiUrl;
  private baseUri = "expense";

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(this.baseUrl + this.baseUri);
  }

  getPaginated(model : ExpenseSarchRequest){
    return this.http.post(this.baseUrl + this.baseUri + "/paginated",model);
  }

  getDetail(id: string) {
    return this.http.get(this.baseUrl + this.baseUri + "/"+ id);
  }

  create(model: ExpenseCreate) {
    return this.http.post(this.baseUrl + this.baseUri, model);
  }

  update(id: string, model: ExpenseCreate) {
    return this.http.put(this.baseUrl + this.baseUri + "/" + id, model)
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + this.baseUri + "/" + id)
  }

}
