import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from "@angular/core/testing";
import { LoginComponent, SigninUser } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpModule } from "@angular/http";
import { UserService } from "../_services/user.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpModule,
        RouterTestingModule,
      ],
      providers: [UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create toBeTruthy()", () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty toBeFalsy()", () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it("user name field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let username = component.loginForm.controls["username"];
    expect(username.valid).toBeFalsy();

    // Username field is required
    errors = username.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set username to something
    username.setValue("tes");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
 

    // Set username to something correct
    username.setValue("testname");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("password field validation .toBeFalsy() .toBeTruthy()", () => {
    let errors = {};
    let password = component.loginForm.controls["password"];
    expect(password.valid).toBeFalsy();
    // Email field is required
    errors = password.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set email to something
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();
 

    // Set email to something correct
    password.setValue("Abc12345");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();

  });

  it("submitting a form emits a user toBeTruthy() toBeFalsy() toBe()", () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls["username"].setValue("testname");
    component.loginForm.controls["password"].setValue("Abc12345");
    expect(component.loginForm.valid).toBeTruthy();

    let signinUser: SigninUser;

    // Subscribe to the Observable and store the user in a local variable.
    component.signinIn.subscribe((value) => (signinUser = value));

    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(signinUser.username).toBe("testname");
    expect(signinUser.password).toBe("Abc12345");
  });


});
