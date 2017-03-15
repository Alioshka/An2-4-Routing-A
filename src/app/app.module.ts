import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// add this line if you don't have access to
// index.html and you want to set base tag
//import { APP_BASE_HREF } from '@angular/common';

import { TodoAppComponent } from './app.component';
import { AboutComponent, HomeComponent, PageNotFoundComponent } from './components';

@NgModule({
  declarations: [
    TodoAppComponent,
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    // add this line if you don't have access to
    // index.html and you want to set base tag
    // { provide: APP_BASE_HREF, useValue: '/' }
  ],
  entryComponents: [TodoAppComponent],
  bootstrap: [TodoAppComponent]
})
export class AppModule {

}
