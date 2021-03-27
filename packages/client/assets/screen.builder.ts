import Blessed from 'blessed';

export interface IComponents {
	screen: Blessed.Widgets.Screen;
	input: Blessed.Widgets.InputElement;
	chat: Blessed.Widgets.ListElement;
	activityLog: Blessed.Widgets.ListElement;
	status: Blessed.Widgets.ListElement;
}

export class ScreenBuilder {
	private screen: Blessed.Widgets.Screen;
	private layout: Blessed.Widgets.LayoutElement;
	private input: Blessed.Widgets.InputElement;
	private chat: Blessed.Widgets.ListElement;
	private status: Blessed.Widgets.ListElement;
	private activityLog: Blessed.Widgets.ListElement;

	constructor() {
		this.screen = Blessed.screen({ title: 'starting...' });
		this.layout = Blessed.layout({ height: '100%', width: '100%', layout: 'inline' });
		this.input = Blessed.textarea();
		this.chat = Blessed.list({
			parent: this.layout,
		});
		this.status = Blessed.list({
			parent: this.layout,
		});
		this.activityLog = Blessed.list({
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
			align: 'left',
			width: '50%',
			height: '90%',
			items: [`Chat`],
		});

		return this;
	}

	setStatusComponent(): ScreenBuilder {
		this.status = Blessed.list({
			...this.basecomponent,
			parent: this.layout,
			width: '25%',
			height: '90%',
			items: [`Users on room`],
		});

		return this;
	}

	setActivityLog(): ScreenBuilder {
		this.activityLog = Blessed.list({
			...this.basecomponent,
			parent: this.layout,
			width: '25%',
			height: '90%',
			bg: 'yellow',
			items: [`Activities`],
		});

		return this;
	}

	build(): IComponents {
		const components = {
			screen: this.screen,
			input: this.input,
			chat: this.chat,
			activityLog: this.activityLog,
			status: this.status,
		};

		return components;
	}
}
