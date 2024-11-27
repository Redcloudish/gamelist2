import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,  // FormsModule imported here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}




