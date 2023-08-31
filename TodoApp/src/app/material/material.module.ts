import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {
  CdkDrag,
  DragDropModule,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  DragDropModule,
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
  MatChipsModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: modules,
})
export class MaterialModule {}
