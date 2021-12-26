import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Maintenance } from 'src/app/models/maintenance';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: string | null;

  constructor(private maintenanceSVC:MaintenanceService, private fb: FormBuilder, private router: Router,  private idRoute: ActivatedRoute) { 
    this.workerForm = this.fb.group({
			nameworker: ['', Validators.required],
			lastnameworker: ['', Validators.required],
			idworker: ['', [Validators.required, Validators.pattern(this.valorNumerico)]],
			addressworker: ['', Validators.required],
			emailworker: ['', [Validators.required, Validators.email]]
		});
    this.messageForm = this.fb.group({
			nameMessage: ['', Validators.required],
			messageMessage: ['', Validators.required],
		});
    this.id = this.idRoute.snapshot.paramMap.get("id");
  }
  
  ngOnInit(): void {
    this.updateForm();
    this.getMaintenances();
    this.getMessages();
  }
  
  //--------------------Textbox--------------------//
  remainingText = 350
  valueChange(value: string) {
    this.remainingText = 350 - value.length;
  }
  //--------------------Fetch data from DB--------------------//
  //To be uesd to store the JOSN imported from the DB
  listMainteance: any= [];
  //---Get all workers in the DB
  getMaintenances(){
    this.maintenanceSVC.getMaintenances().subscribe((MaintenanceDB) => {  
      this.listMainteance = MaintenanceDB;
      console.log(MaintenanceDB);
    }, error =>{
      console.log(error);
    })
  }
  //---Save a worker in the DB
  workerForm: FormGroup;
	valorNumerico = /^[0-9]+$/;
	modal_title = 'Create Worker';
  postMaintenance(){
    const MAINTENANCE: Maintenance = {
			name: this.workerForm.get('nameworker')?.value,
			lastname: this.workerForm.get('lastnameworker')?.value,
			idnumber: this.workerForm.get('idworker')?.value,
			address: this.workerForm.get('addressworker')?.value,
			email: this.workerForm.get('emailworker')?.value,
		}
		if(this.id == null){
			this.maintenanceSVC.postMaintenance(MAINTENANCE).subscribe( data => {
				this.router.navigate(['/admin'])
				Swal.fire({
					icon: 'success',
					title: 'Worker added',
					text: 'The worker is now registerd on the database'
				})
			})
		}else{
			this.maintenanceSVC.putMaintenance(this.id, MAINTENANCE).subscribe( data => {
				this.router.navigate(['/admin'])
				Swal.fire({
					icon: 'success',
					title: 'Worker information updated',
					text: 'The database was updated'
				})
			})
		}
    setTimeout(() => {
      this.getMaintenances();
      this.workerForm.reset();
    }, 500);
  }
  updateForm(){
  this.id = this.idRoute.snapshot.paramMap.get("id");
  setTimeout(() => {
    if(this.id !== null){
      this.modal_title = "Update Worker";
      console.log("1", this.id);
      this.maintenanceSVC.getMaintenance(this.id).subscribe(data =>{
        console.log("2", this.id);
        this.workerForm.setValue({
          nameworker: data.name,
          lastnameworker: data.lastname,
          idworker: data.idnumber,
          addressworker: data.address,
          emailworker: data.email,
        })
      })
    }
  }, 200);
	}
  triggerModal(){
    this.updateForm();
    setTimeout(() => {
      this.updateForm();
    }, 200);
    this.getMaintenances();
  }
  //---Delete a worker in the DB
  deleteMaintenance(id: any) {
		Swal.fire({
			title: 'Are you sure yo want to delete it?',
			text: "You can not recover the data afterwards",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result: any) => {
			if (result.isConfirmed) {
				this.maintenanceSVC.deleteMaintenance(id).subscribe( data => {
					Swal.fire({
						icon: 'success',
  					title: 'Data deleted',
					})
					this.getMaintenances();
				}, error => {
					console.log(error)
				})
			}
		})
	}
  //--------------------Fetch data from DB--------------------//
  //To be uesd to store the JOSN imported from the DB
  listMessages: any= [];
  //---Get all workers in the DB
  getMessages(){
    this.maintenanceSVC.getMessages().subscribe((MessagesDB) => {  
      this.listMessages = MessagesDB;
      console.log(MessagesDB);
      console.log("works");
      
    }, error =>{
      console.log(error);
    })
  }
  //---Save a worker in the DB
  messageForm: FormGroup;
  postMessage(){
    const MESSAGE: Message = {
			name: this.messageForm.get('nameMessage')?.value,
			message: this.messageForm.get('nameMessage')?.value,
		}
    this.maintenanceSVC.postMessage(MESSAGE).subscribe( data => {
      this.router.navigate(['/admin'])
      Swal.fire({
        icon: 'success',
        title: 'Message added',
        text: 'Your message is now in Our testimonial'
      })
    })
    setTimeout(() => {
      this.getMessages();
      this.messageForm.reset();
    }, 1000);
  }
}
