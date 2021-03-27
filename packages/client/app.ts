import { TerminalController } from './assets/terminal.controller';
import Event from 'events';

const controller = new TerminalController();
const event = new Event();

controller.initialize(event);
