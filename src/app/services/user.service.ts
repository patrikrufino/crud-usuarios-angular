import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'https://sheet.best/api/sheets/b8e94b4c-6ec1-477e-ba49-7acd7be9f414';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  /**
   * Name: getUsers
   * Description: Retorna um array de usuários através do método GET de um endpoint
   * @return Observable<User[]>
   */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  /**
   * Name: postUser
   * Description: Retorna um array de usuários através do método POST de um endpoint
   * @param user: User
   * @return Observable<User>
   */
  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }

  /**
   * Name: getUser
   * Description: Retorna um usuário de acordo com id informado através do método GET de um endpoint
   * @param id: number
   * @return Observable<User[]>
   */
  getUser(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/${id}`);
  }

  /**
   * Name: deleteUser
   * Description: Deleta um usuário pelo id através do método DELETE de um endpoint
   * @param id: number
   * @return Observable<User>
   */
  deleteUser(id: number): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/id/${id}`, this.httpOptions);
  }

  /**
   * Name: updateUser
   * Description: Atualiza um usuário pelo id através do método PUT de um endpoint
   * @param user: User
   * @param id: number
   * @return Observable<User>
   */
  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/id/${id}`, user, this.httpOptions);
  }

}
