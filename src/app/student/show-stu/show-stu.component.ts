import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-stu',
  templateUrl: './show-stu.component.html',
  styleUrls: ['./show-stu.component.css']
})
export class ShowStuComponent implements OnInit {

  studentList:any = [];
  student:any;
  modalTitle:any;
  activateAddEditStuCom:boolean = false;
  public modelcss:string='d-block'
  FullName:string=''
  Class:string=''
  dataEdit:any;


  constructor(private sharedService:SharedService){}

  ngOnInit(): void {
    this.refreshStudentList();
  }

  refreshStudentList(){

    this.sharedService.getStudentList().subscribe(data =>{
      this.studentList = data;
    });
  }


  showEdit(data:any):void{
    this.dataEdit=data;
    this.modelcss='d-block'
    this.FullName=data.FullName;
    this.Class=data.Class;
    document.getElementById('modelcss')?.classList.remove('d-none')
  }

  closeEdit():void{
    document.getElementById('modelcss')?.classList.add('d-none')
  }

  EditStudent(){
    this.student = {
      StudentId: this.dataEdit.StudentId,
      FullName:this.FullName,
      Class:this.Class
    };
    console.log(this.student)
    try {
      this.sharedService.updateStudent(this.student).subscribe((data)=>{
        alert(data)
      })
    } catch (error) {
      alert("Update failure")
    }
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteStudent(item.StudentId).subscribe(data =>{
        alert(data.toString());
        this.refreshStudentList();
      })
    }
  }

  closeClick(){
    this.activateAddEditStuCom = false;
    this.refreshStudentList();
  }
}
