import { Component } from '@angular/core';
import { SignalR, IConnectionOptions, BroadcastEventListener, ISignalRConnection, SignalRConnection, ConnectionStatus } from 'ng2-signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  connectionStatus = 'none';

  connectionSignalR: ISignalRConnection;
  messages: ChatMessage[] = [];

  constructor(private _signalR: SignalR) {
    const o: IConnectionOptions = {};
    const conx = this._signalR.createConnection(o);
    conx.status.subscribe((status) => {
      this.connectionStatus = status.name;
    });

    conx.start().then((c) => {
      this.connectionSignalR = c;

      // 1.create a listener object
      // const onMessageSent$ = new BroadcastEventListener<ChatMessage>('broadcastMessage');

      // // 2.register the listener
      // c.listen(onMessageSent$);

      // // 3.subscribe for incoming messages
      // onMessageSent$.subscribe((chatMessage: ChatMessage) => {
      //   console.log('listener  ', chatMessage);
      //   this.title += '  ' + chatMessage.name + '  ' + chatMessage.text;
      // });

      const listener = c.listenFor('broadcastMessage');
      listener.subscribe((a: ChatMessage) => {
        this.messages.push(a);
      });

    });
  }


  onSubmit(name: string, text: string) {
    this.connectionSignalR.invoke('Send', name, text).then(() => {
    });
  }
}

export interface ChatMessage {
  Name: string;
  Message: string;
}
