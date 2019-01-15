import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  @Input('is-fav') isFav: boolean;
  @Output('change') change = new EventEmitter();

  onFavClick(){
    this.isFav = !(this.isFav);
    this.change.emit({ newValue: this.isFav });
  }
}

export interface FavChangeEventArgs {
  newValue: boolean
}
