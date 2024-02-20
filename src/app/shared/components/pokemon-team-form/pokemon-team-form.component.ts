import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PokemonModalSelectComponent } from '../pokemon-modal-select/pokemon-modal-select.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/core/interfaces/pokemon'; // Importa la interfaz Pokemon
import { TeamData } from 'src/app/core/interfaces/pokemon-team';
@Component({
  selector: 'app-pokemon-team-form',
  templateUrl: './pokemon-team-form.component.html',
  styleUrls: ['./pokemon-team-form.component.scss'],
})
export class PokemonTeamFormComponent implements OnInit {

  @Input() UserId: number = -1;
  form: FormGroup;


  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      pokemon1: [, Validators.required],
      pokemon2: [,],
      pokemon3: [,],
      pokemon4: [,],
      pokemon5: [,],
      pokemon6: [,]
    });
  }

  ngOnInit() {}

  async onPokemonSelected(position: number) { 
    const modal = await this.modalCtrl.create({
      component: PokemonModalSelectComponent,
      componentProps: {
        userId: this.UserId
      },
    });
    modal.present();
    const { data } = await modal.onWillDismiss(); 
    if (data) { 
      this.form.controls[`pokemon${position}`].setValue(data);
    }
  }
  async confirm() {
    if (this.form.valid) {
      const formData = this.form.value;
      const list:TeamData= {
        attributes:{
          title:formData.title,
          pokemon_1: { data: [ formData.pokemon1 ]},
          pokemon_2: { data: formData.pokemon2?[formData.pokemon2]:[]},
          pokemon_3: { data: formData.pokemon3?[formData.pokemon3]:[]},
          pokemon_4: { data: formData.pokemon4?[formData.pokemon4]:[]},
          pokemon_5: { data: formData.pokemon5?[formData.pokemon5]:[]},
          pokemon_6: { data: formData.pokemon6?[formData.pokemon6]:[]}
        }
      }
      this.modalCtrl.dismiss(list,'confirm');
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Tiene que declarar el título del equipo y al menos un pokemon',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}