import { ScreenBuilder } from './screen.builder';
import { IComponents } from './screen.builder';
import Event from 'events';
import { CONFIG } from '../config/env';

export interface TerminalInterface {
	initialize: (event: Event) => Promise<void>;
}

interface IMessage {
	userName: string;
	text: string;
}

type IOnMessageReceive = (msg: IMessage) => void;

export class TerminalController implements TerminalInterface {
	private onMessageReceive(props: IComponents): IOnMessageReceive {
		return (msg: IMessage): void => {
			props.chat.addItem(`${msg.userName}: ${msg.text}`);
			props.screen.render();
		};
	}

	private onActivityLog(props: IComponents): IOnMessageReceive {
		return (msg: IMessage): void => {
			props.activityLog.addItem(`${msg.userName}: ${msg.text}`);
			props.screen.render();
		};
	}

	private onStatus(props: IComponents): IOnMessageReceive {
		return (msg: IMessage): void => {
			props.status.addItem(`${msg.userName}: ${msg.text}`);
			props.screen.render();
		};
	}

	private registerEvent(event: Event, components: IComponents) {
		event.on(CONFIG.APP.MESSAGE_RECEIVED, this.onMessageReceive(components));
		event.on(CONFIG.APP.MESSAGE_ACTIVITY, this.onActivityLog(components));
		event.on(CONFIG.APP.STATUS_UPDATED, this.onStatus(components));
	}

	async initialize(event: Event): Promise<void> {
		const components = new ScreenBuilder()
			.setScreen('Hacker - Chat')
			.setLayoutComponent()
			.setInputComponent()
			.setChatComponent()
			.setActivityLog()
			.setStatusComponent()
			.build();

		this.registerEvent(event, components);
		components.input.focus();
		components.screen.render();

		setInterval(() => {
			event.emit(CONFIG.APP.MESSAGE_ACTIVITY, { userName: 'Aline', text: 'entrou' });
			event.emit(CONFIG.APP.MESSAGE_RECEIVED, { userName: 'Aline', text: 'OLá pessoal' });
			event.emit(CONFIG.APP.MESSAGE_RECEIVED, { userName: 'Lucas', text: 'Oi linda' });
			event.emit(CONFIG.APP.MESSAGE_ACTIVITY, { userName: 'Peter', text: 'entrou' });
			event.emit(CONFIG.APP.STATUS_UPDATED, { userName: 'Peter', text: 'status' });
			event.emit(CONFIG.APP.MESSAGE_RECEIVED, { userName: 'Peter', text: 'Fala comigo bb' });
		}, 1000);
	}
}
