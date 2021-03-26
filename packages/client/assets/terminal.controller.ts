import { ScreenBuilder } from './screen.builder';

export interface TerminalInterface {
	initialize: () => Promise<void>;
}

export class TerminalController implements TerminalInterface {
	async initialize(): Promise<void> {
		const components = new ScreenBuilder()
			.setScreen('Hacker - Chat')
			.setLayoutComponent()
			.setInputComponent()
			.setChatComponent()
			.build();

		components.input.focus();
		components.screen.render();
	}
}
