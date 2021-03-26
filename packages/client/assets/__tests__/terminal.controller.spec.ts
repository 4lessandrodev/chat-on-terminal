import Event from 'events';
import { TerminalController } from '../terminal.controller';

describe(' "terminal.controller', () => {
	it('should be defined', () => {
		const controller = new TerminalController();
		expect(controller).toBeDefined();
	});

	it('should call with event', () => {
		const controller = new TerminalController();
		const event = new Event();
		const spy = jest.spyOn(controller, 'initialize');
		controller.initialize(event);
		expect(spy).toHaveBeenCalledWith(event);
	});
});
