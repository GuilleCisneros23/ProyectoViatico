import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Input() message: string = '';
  @Output() closePopup = new EventEmitter<void>();
  showPopup: boolean = true;
  

  close() {
    this.closePopup.emit();
  }

}
