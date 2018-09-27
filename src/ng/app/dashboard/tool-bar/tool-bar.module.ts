import { NgModule } from '@angular/core';
import { ErcaToolBarModule } from '../../shared/tool-bar/tool-bar.module';
import { ToolBarComponent } from './tool-bar.component';

@NgModule({
  imports: [ErcaToolBarModule],
  declarations: [ToolBarComponent],
  exports: [ToolBarComponent]
})
export class ToolBarModule {}
