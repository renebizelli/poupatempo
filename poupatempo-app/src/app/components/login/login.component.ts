import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { BaseComponent } from "../base.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  title = 'Poupatempo | Login';

  form!: FormGroup;

  errorCode = 0;

  constructor(
    private authService: AuthService,
    private formGroup: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router) {
    super()
  }

  ngOnInit(): void {

    this.form = this.formGroup.group({
      identifier: new FormControl('28320826888', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl('A7+/B79,nuB', [Validators.required])
    })

  }

  login() {

    let identifier = this.form.controls['identifier'].value;
    let password = this.form.controls['password'].value;
    this.errorCode = 0;
    this.router.navigate(['/painel']);

    // this.authService.login(identifier, password)
    //   .subscribe({
    //     next: (result) => {
    //       this.localStorageService.set("ACCESS_TOKEN", result);
    //       this.router.navigate(['/painel']);

    //     },
    //     error: (e) => {
    //       this.errorCode = e?.error?.code == 'ERR_BAD_REQUEST' ? 1 : 2;
    //     }
    //   })
  }

}