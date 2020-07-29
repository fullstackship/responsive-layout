import { NgModule, ModuleWithProviders } from '@angular/core';
import { ResponsiveLayoutComponent } from './responsive-layout.component';
import { ResponsiveLayoutService } from './responsive-layout.service';



@NgModule({
  declarations: [ResponsiveLayoutComponent],
  imports: [
  ],
  exports: [ResponsiveLayoutComponent]
})
export class ResponsiveLayoutModule {
  static forRoot(): ModuleWithProviders<ResponsiveLayoutModule> {
    return {
        ngModule: ResponsiveLayoutModule,
        providers: [ResponsiveLayoutService]
    };
}
}
