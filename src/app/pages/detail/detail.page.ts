import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
updateAnnounceForm: FormGroup;
  id: any;
  coverImageFile: File;
  otherImagesFiles: File[] = [];
  constructor(
    private firestoreService: FirestoreService,
    public formBuilder: FormBuilder,
    private router: Router,


    private actRoute: ActivatedRoute,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('aid');
    this.firestoreService.getAnounce(this.id).valueChanges().subscribe(res => {
      this.updateAnnounceForm.setValue(res);
    });
  }
  ngOnInit() {
    this.updateAnnounceForm = this.formBuilder.group({
      title: [''],
      announceBody: [''],
      category: [''],
      likes: [''],
      id_user: [''],
      coverImage: [''],
      otherImages: [''],
    })
    console.log(this.updateAnnounceForm.value)
  }
  updateForm() {
    this.firestoreService.updateAnounce(this.id, this.updateAnnounceForm.value)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => console.log(error));
  }





  onCoverImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.coverImageFile = input.files[0];
    }
  }

  onOtherImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.otherImagesFiles = Array.from(input.files);
    }
  }
}
