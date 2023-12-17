import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  createAnnounceForm: FormGroup;
  coverImageFile: File;
  otherImagesFiles: File[] = [];
  constructor(

    private firestoreService: FirestoreService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createAnnounceForm = this.formBuilder.group({
      title: [''],
      announceBody: [''],
      category: [''],
      likes: [''],
      id_user: [''],


      coverImage: [''],
      otherImages: [''],
    });
  }
  async formSubmit() {

    const formValue = this.createAnnounceForm.value;
    try {
      const res = await this.firestoreService.createAnounce(formValue, this.coverImageFile, this.otherImagesFiles);
      console.log(res);
      this.createAnnounceForm.reset();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
    }
  }










  // async createAnnounce() {
  //   console.log('Inside createAnnounce method'); // Log when the method starts

  //   const loading = await this.loadingCtrl.create();
  //   console.log('Loading created'); // Log when loading is created
  //   const id = "";

  //   const title = this.createAnnounceForm.value.title;
  //   const announceBody = this.createAnnounceForm.value.announceBody;
  //   const category = this.createAnnounceForm.value.category;
  //   const likes = 0;
  //   const coverImage = this.createAnnounceForm.value.coverImage;
  //   const otherImages = this.createAnnounceForm.value.otherImages;
  //   const id_user = "xkDk50haeMf1eIErw0lpHcCfvjF2";
  //   console.log('Before calling firestoreService.createAnnounce'); // Log before calling the service method

  //      this.firestoreService.createAnnounce(
  //       id,
  //       title,
  //       announceBody,
  //       category,
  //       likes
  //       // coverImage,
  //       // otherImages,
  //       // id_user
  //     );
  //     console.log('Firestore service method executed'); // Log after the service method executes

  //     await loading.dismiss();
  //     console.log('Loading dismissed'); // Log after loading dismisses

  //     this.router.navigateByUrl('');
  //     console.log('Navigated to home'); // Log after navigation


  // }

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

onFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files.length > 0) {
    const files: FileList = input.files;

    // Iterate through each selected file
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      // Handle each 'file' here, such as displaying a preview or uploading to a server
      // For example, you can generate a preview URL using FileReader similar to onFileSelected

      // For illustration purposes, logging the name of each selected file
      console.log(`Selected File ${i + 1}: ${file.name}`);

      // You can perform operations like uploading files to a server, etc.
      // Use 'file' for these operations
    }
  }
}
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files.length > 0) {
    const file: File = input.files[0]; // For a single file input

    // You can handle the 'file' here, such as displaying a preview
    // For example, if you want to display a preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      // 'result' contains the data URL representing the file
      const previewURL: string = reader.result as string;

      // Use 'previewURL' to display the image preview
      // For instance, assign it to an image element's 'src' attribute
      // Example: document.getElementById('previewImage').src = previewURL;
    };
    reader.readAsDataURL(file);

    // You can also upload the 'file' to your server or perform other operations as needed
    // For uploading the file, you might use Firebase Storage or another service
    // Use 'file' to perform the upload operation
  }
}

}
