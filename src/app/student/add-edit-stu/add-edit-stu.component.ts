import { SharedService } from 'src/app/shared.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-stu',
  templateUrl: './add-edit-stu.component.html',
  styleUrls: ['./add-edit-stu.component.css']
})
export class AddEditStuComponent implements OnInit {

  @Input() student:any;
  StudentId:string = "";
  FullName: string ="";
  Class: string ="";
  @Input() modelcss:string='d-block';
  constructor(private SharedService: SharedService) { }

  ngOnInit(): void {
    this.StudentId = this.student.StudentId;
    this.FullName = this.student.FullName;
    this.Class = this.student.Class;
    console.log(this.modelcss)
  }
  closeModel():void{
    this.modelcss='d-none'
  }

  addStudent(){
    var val = {StudentId:this.StudentId,
      FullName:this.FullName,
      Class:this.Class
    };
      this.SharedService.addStudent(val).subscribe(res =>{
        alert(res.toString());
      })
  }



}
