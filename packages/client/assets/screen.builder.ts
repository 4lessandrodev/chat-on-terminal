import Blessed from 'blessed';

interface IComponents {
	screen: Blessed.Widgets.Screen;
	input: Blessed.Widgets.InputElement;
}

export class ScreenBuilder {
	private screen: Blessed.Widgets.Screen;
	private layout: Blessed.Widgets.LayoutElement;
	private input: Blessed.Widgets.InputElement;
	// @ts-ignore
	private chat: Blessed.Widgets.ListElement;

	constructor() {
		this.screen = Blessed.screen({ title: 'starting...' });
		this.layout = Blessed.layout({ height: '100%', width: '100%', layout: 'inline' });
		this.input = Blessed.textarea();
		this.chat = Blessed.list({
			parent: this.layout,
		});
	}

	get basecomponent(): Blessed.Widgets.INodeOptions {
		return {
			border: {
				type: 'line',
			},
			heigth: '50%',
			left: 'center',
			mouse: true,
			scrollbar: {
				ch: ' ',
				inverse: true,
			},
			style: {
				fg: 'white',
				/* bg: 'magenta', */
				border: {
					fg: '#f0f0f0',
				},
				hover: {
					bg: 'green',
				},
			},
			top: 'center',
			width: '50%',
		};
	}

	setScreen(title: string): ScreenBuilder {
		this.screen = Blessed.screen({
			title,
			smartCSR: true,
		});

		this.screen.key(['scape', 'q', 'C-c'], () => process.exit(0));

		return this;
	}

	setLayoutComponent(): ScreenBuilder {
		this.layout = Blessed.layout({
			parent: this.screen,
			layout: 'inline',
			width: '100%',
			height: '100%',
		});

		return this;
	}

	setInputComponent(): ScreenBuilder {
		const input = Blessed.textarea({
			parent: this.screen,
			bottom: 0,
			height: '10%',
			keyable: true,
			inputOnFocus: true,
			padding: {
				top: 1,
				left: 2,
			},
			style: {
				fg: '#f6f6f6',
				bg: '#353535',
			},
		});

		input.addListener('keyup', () => {
			console.log(input.getValue());
			input.clearValue();
		});

		this.input = input;

		return this;
	}

	setChatComponent(): ScreenBuilder {
		this.chat = Blessed.list({
			...this.basecomponent,
			parent: this.layout,
			align: 'center',
			width: '50%',
			height: '90%',
			items: [`Message`],
		});

		return this;
	}

	build(): IComponents {
		const components = {
			screen: this.screen,
			input: this.input,
		};

		return components;
	}
}
