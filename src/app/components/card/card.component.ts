import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';

import { FormGroup, FormControl } from '@angular/forms';

import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  listCards: CardModel[] = [];
  formCard: FormGroup = new FormGroup({});

  isUpdate: boolean = false;
  iconTrash = faTrash;
  iconPencil = faPencil;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.list();
    this.formCard = new FormGroup({
      id_card: new FormControl(''),
      name: new FormControl(''),
      number: new FormControl(''),
      type: new FormControl(''),
      cvv: new FormControl(''),
      status: new FormControl('1'),
    });
  }

  list() {
    this.cardService.getCards().subscribe((res) => {
      if (res) {
        this.listCards = res;
      }
    });
  }

  save() {
    if (this.isUpdate) {
      this.cardService.updateCard(this.formCard.value).subscribe((res) => {
        if (res) {
          this.list();
          this.formCard.reset();
        }
      });
    } else {
      this.formCard.controls['status'].setValue('1');
      this.cardService.saveCard(this.formCard.value).subscribe((res) => {
        if (res) {
          this.list();
          this.formCard.reset();
        }
      });
    }
  }

  delete(id: number) {
    this.cardService.deleteCard(id).subscribe((res) => {
      if (res) {
        this.list();
      }
    });
  }

  newCard() {
    this.isUpdate = false;
    this.formCard.reset();
  }

  selectItem(item: any) {
    this.isUpdate = true;
    this.formCard.controls['id_card'].setValue(item.id_card);
    this.formCard.controls['name'].setValue(item.name);
    this.formCard.controls['number'].setValue(item.number);
    this.formCard.controls['type'].setValue(item.type);
    this.formCard.controls['cvv'].setValue(item.cvv);
  }
}
