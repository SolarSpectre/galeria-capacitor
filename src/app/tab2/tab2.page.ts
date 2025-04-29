import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  isCameraActive: boolean = false;  // Variable para controlar la visibilidad de la niebla

  constructor(public photoService: PhotoService,
              public actionSheetController: ActionSheetController) {}

  // Activar la cámara y mostrar la niebla
  addPhotoToGallery() {
    this.isCameraActive = true; // Activar la cámara y mostrar la niebla
    this.photoService.addNewToGallery().finally(() => {
      this.isCameraActive = false; // Desactivar la cámara y ocultar la niebla
    });
  }

  // Activar la cámara con calidad más baja y mostrar la niebla
  addPhotoToGallery50() {
    this.isCameraActive = true; // Activar la cámara y mostrar la niebla
    this.photoService.addNewToGallery50().finally(() => {
      this.isCameraActive = false; // Desactivar la cámara y ocultar la niebla
    });
  }

  // Cargar las fotos guardadas
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  // Mostrar el ActionSheet para la foto
  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();
  }
}
