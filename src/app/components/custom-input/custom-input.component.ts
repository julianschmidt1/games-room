import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'custom-input',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    CommonModule
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent {
  @Input() modelProperty: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
}
