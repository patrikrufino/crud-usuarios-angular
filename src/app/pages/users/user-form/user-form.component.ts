import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from './../../../services/user.service';

// Import Icons
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private actRoute: ActivatedRoute) {

    this.userForm = this.fb.group({
      id: 0,
      first_name: '',
      last_name: '',
      age: 0,
      job: '',
    })
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log(this.userId);
      if (this.userId !== null) {
        this.userService.getUser(this.userId).subscribe(result => {
          this.userForm.patchValue({
            id: result[0].id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            age: result[0].age,
            job: result[0].job,
          })
        })
      }
    })

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
   * Name: createUser
   * Description: Cria um novo usuário com injeção de dependência
   * @return void
   */
  createUser(): void {
    this.userForm.get('id')?.patchValue(this.users.length + 1);
    this.userService.postUser(this.userForm.value).subscribe(
      (result) => {
        console.log(`Usuário ${result.first_name + result.last_name} criado com sucesso!`);
      }
    );
  }

  /**
   * Name: updateUser
   * Description: Atualiza um usuário existente com injeção de dependência
   * @return void
   * @throws error
   */
  updateUser(): void {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe((result) => {
      console.log('usuario atualizado', result);
    }, (err: any) => {

    }, () => {
      this.router.navigate(['/']);
    })
  }

  actionButton() {
    if (this.userId !== null) {
      this.updateUser()
    } else {
      this.createUser()
    }
  }

  /** 
   * Icons names: 
   */
  faSave = faSave;
  faTimes = faTimes;

}
