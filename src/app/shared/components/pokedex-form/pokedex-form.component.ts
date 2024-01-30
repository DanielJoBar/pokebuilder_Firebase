import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Pokemon } from 'src/app/core/interfaces/pokemon';

@Component({
  selector: 'app-pokedex-form',
  templateUrl: './pokedex-form.component.html',
  styleUrls: ['./pokedex-form.component.scss'],
})
export class PokedexFormComponent implements OnInit {
  @Input() mode:'New'|'Edit' = 'New';
  form:FormGroup;
  
  @Input() set pkm(_pkm:Pokemon|null) {
    if(_pkm){
      this.form.controls['name'].setValue(_pkm.name);
      this.form.controls['hp'].setValue(_pkm.hp);
      this.form.controls['atk'].setValue(_pkm.atk);
      this.form.controls['def'].setValue(_pkm.def);
      this.form.controls['speAtk'].setValue(_pkm.speAtk);
      this.form.controls['speDef'].setValue(_pkm.speDef);
      this.form.controls['speed'].setValue(_pkm.speed);
      this.form.controls['img' as string].setValue(_pkm.image);
    }
  }


  constructor(private modalCtrl: ModalController,private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({
      name:['']
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    
 
  }
  ngOnInit() {}
}
