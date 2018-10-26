import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit {
  loginText = 'Login';
  signUpText = 'Sign Up'; 
  lessons = ['Lesson 1', 'Lessons 2'];
  // cardNumber: '23';
  totalEstimate = 10;
    ctx = {estimate: this.totalEstimate};
    // Template References
    @ViewChild('defaultTabButtons')
    private defaultTabButtonsTpl: TemplateRef<any>;

  constructor() { }

 

    ngOnInit() {
        console.log(this.defaultTabButtonsTpl);
    }

  login() {
      console.log('Login');
  }

  signUp() {
      console.log('Sign Up');
  }
}
