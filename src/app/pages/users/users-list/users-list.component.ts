import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

// Import Icons
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: Array<User> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Name: getUsers
   * Description: Retorna um array de usuários por injeção de dependência
   * @return void
   */
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      }
    );
  }

  /**
   * Name: deleteUser
   * Description: Deleta um usuário por id usando injeção de dependência
   * @param id
   * @return void
   * @throws error
   */
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log("Usuário deletado com sucesso!");
      }, (err) => {
        console.log(err)
      }, () => {
        this.getUsers();
      }
    );
  }

  /** 
   * Icons names: faUserEdit, faTrash, faPlus
   */
  faUserEdit = faUserEdit;
  faTrash = faTrash;
  faPlus = faPlus;
}
