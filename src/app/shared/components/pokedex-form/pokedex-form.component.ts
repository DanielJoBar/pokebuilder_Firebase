import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { numericValidator } from 'src/app/core/validators/numeric';

@Component({
  selector: 'app-pokedex-form',
  templateUrl: './pokedex-form.component.html',
  styleUrls: ['./pokedex-form.component.scss'],
})
export class PokedexFormComponent implements OnInit {
  @Input() mode: 'New' | 'Edit' = 'New';
  form: FormGroup;
  pokemon: Pokemon | null = null;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      hp: [, Validators.required],
      atk: [, Validators.required],
      def: [, Validators.required],
      speAtk: [, Validators.required],
      speDef: [, Validators.required],
      speed: [, Validators.required],
      //img:['']
    });
  }

  ngOnInit() {}

  @Input() set pkm(_pkm: Pokemon | null) {
    if (_pkm) {
      this.pokemon = _pkm;
      this.form.patchValue({
        name: _pkm.attributes.name,
        hp: _pkm.attributes.hp,
        atk: _pkm.attributes.atk,
        def: _pkm.attributes.def,
        speAtk: _pkm.attributes.speAtk,
        speDef: _pkm.attributes.speDef,
        speed: _pkm.attributes.speed,
        img: _pkm.attributes.image
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.form.valid) {
      const formData = this.form.value;
      const newPokemon: Pokemon = {
        id: this.pokemon ? this.pokemon.id : -1,
        attributes: {
          name: formData.name,
          hp: Number(formData.hp),
          atk: Number(formData.atk),
          def: Number(formData.def),
          speAtk: Number(formData.speAtk),
          speDef: Number(formData.speDef),
          speed: Number(formData.speed),
          bst:Number(formData.hp)+Number(formData.atk)+Number(formData.def)+Number(formData.speAtk)+Number(formData.speDef)+Number(formData.speed)
         // image: formData.img,
        },
      };
      this.modalCtrl.dismiss(newPokemon, this.mode);
    } else {
      console.log('El formulario no es válido.');
    }
  }
}
