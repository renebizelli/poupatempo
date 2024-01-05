import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthCanActivate   {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.authService.authenticated();
  }
}