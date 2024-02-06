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
  @Input() mode:'New'|'Edit' = 'New';
  form:FormGroup;
  pokemon:Pokemon | null = null;
  @Input() set pkm(_pkm:Pokemon|null) {
    if(_pkm){
      this.pokemon = _pkm;
      this.form.controls['name'].setValue(_pkm.attributes.name);
      this.form.controls['hp'].setValue(_pkm.attributes.hp);
      this.form.controls['atk'].setValue(_pkm.attributes.atk);
      this.form.controls['def'].setValue(_pkm.attributes.def);
      this.form.controls['speAtk'].setValue(_pkm.attributes.speAtk);
      this.form.controls['speDef'].setValue(_pkm.attributes.speDef);
      this.form.controls['speed'].setValue(_pkm.attributes.speed);
      this.form.controls['img' as string].setValue(_pkm.attributes.image);
      this.mode = 'Edit';
    }
  }


  constructor(private modalCtrl: ModalController,private formBuilder:FormBuilder,private toastController: ToastController) {
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      hp:['' ,Validators.required,numericValidator.numericProto()],
      atk:['',Validators.required,numericValidator.numericProto()],
      def:['',Validators.required,numericValidator.numericProto()],
      speAtk:['',Validators.required,numericValidator.numericProto()],
      speDef:['',Validators.required,numericValidator.numericProto()],
      speed:['',Validators.required,numericValidator.numericProto()],
      //img:['']
    })
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
          hp: formData.hp,
          atk: formData.atk,
          def: formData.def,
          speAtk: formData.speAtk,
          speDef: formData.speDef,
          speed: formData.speed,
          image: formData.img
        }
      };
      this.modalCtrl.dismiss(newPokemon, 'confirm');
    } else {
        console.log ('El formulario no es válido.')
    }
 
  }
  ngOnInit() {}
}
