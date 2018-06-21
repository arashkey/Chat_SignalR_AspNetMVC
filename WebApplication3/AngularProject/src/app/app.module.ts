import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

import { AppComponent } from './app.component';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'ChatHub';
  c.qs = { user: 'donald' };
  c.url = 'http://localhost:2162';
  // c.logging = true;
  return c;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignalRModule.forRoot(createConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
