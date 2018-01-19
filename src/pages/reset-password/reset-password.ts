import { Component } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  NavController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { EmailValidator } from "../../validators/email";



@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  public resetPasswordForm: FormGroup;


  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(
        ` ${this.resetPasswordForm.value} :النموذج غير صالح بعد، القيمة الحالية`
      );
    } else {
      const email: string = this.resetPasswordForm.value.email;
      this.authProvider.resetPassword(email).then(
        user => {
          const alert: Alert = this.alertCtrl.create({
            message: "تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور",
            buttons: [
              {
                text: "موافق",
                role: "إلغاء",
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        },
        error => {
          const errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "موافق", role: "إلغاء" }]
          });
          errorAlert.present();
        }
      );
    }
  }




}
