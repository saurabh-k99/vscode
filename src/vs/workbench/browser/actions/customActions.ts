import { localize } from 'vs/nls';
import { Categories } from 'vs/platform/action/common/actionCommonCategories';
import { Action2, MenuId } from 'vs/platform/actions/common/actions';

export class RunClient extends Action2 {
	constructor() {
		super({
			id: 'workbench.action.run.client',
			title: { value: localize({ key: 'cRunClient', comment: ['Starts frontend in specified port'] }, "Run Client"), original: 'Run Client' },
			category: Categories.Start,
			f1: false,
			menu: {
				id: MenuId.DoSelectCustomMenu,
				order: 1
			}
		});
	}

	run(): void {
		// accessor.get(IWorkbenchLayoutService).setPartHidden(true, Parts.SIDEBAR_PART);
		// showInformationMessage('THis is my custom message')
		console.log('Client Started....');

	}
};

export class RunServer extends Action2 {
	constructor() {
		super({
			id: 'workbench.action.run.server',
			title: { value: localize({ key: 'cRunServer', comment: ['Starts backend in specified port'] }, "Run Server"), original: 'Run Server' },
			category: Categories.Start,
			f1: false,
			menu: {
				id: MenuId.DoSelectCustomMenu,
				order: 2
			}
		});
	}

	run(): void {
		// accessor.get(IWorkbenchLayoutService).setPartHidden(true, Parts.SIDEBAR_PART);
		// showInformationMessage('THis is my custom message')
		console.log('Server Started....');

	}
}
