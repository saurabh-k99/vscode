import { ServicesAccessor } from 'vs/editor/browser/editorExtensions';
import { localize } from 'vs/nls';
import { Categories } from 'vs/platform/action/common/actionCommonCategories';
import { Action2, MenuId } from 'vs/platform/actions/common/actions';
import { IDialogService } from 'vs/platform/dialogs/common/dialogs';
import { ITerminalService } from 'vs/workbench/contrib/terminal/browser/terminal';
import { IWorkbenchLayoutService, Parts } from 'vs/workbench/services/layout/browser/layoutService';

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

	override async run(accessor: ServicesAccessor) {
		const terminalService = accessor.get(ITerminalService)
		const dialogService = accessor.get(IDialogService)
		const layoutService = accessor.get(IWorkbenchLayoutService);
		const baseURI = window.location.href.split('=')?.[1]
		let configuration, command, instance

		if (!baseURI) {
			dialogService.error('No Folder Selected!!!')
			return
		}

		configuration = sessionStorage.getItem('configuration')

		if (configuration) {
			command = JSON.parse(configuration).frontend
		}

		if (!command) {
			await dialogService.error('Unable to find the command for frontend!!!')
			return
		}

		instance = terminalService.activeInstance

		if (!instance) {
			instance = await terminalService.createTerminal()
			terminalService.setActiveInstance(instance);
		}

		if (!layoutService.isVisible(Parts.PANEL_PART)) {
			layoutService.setPartHidden(false, Parts.PANEL_PART);
		}

		await instance.sendText(command, true)
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

	override async run(accessor: ServicesAccessor) {
		const terminalService = accessor.get(ITerminalService)
		const layoutService = accessor.get(IWorkbenchLayoutService);
		const dialogService = accessor.get(IDialogService)
		const baseURI = window.location.href.split('=')?.[1]
		let configuration, command, instance

		if (!baseURI) {
			dialogService.error('No Folder Selected!!!')
			return
		}

		configuration = sessionStorage.getItem('configuration')

		if (configuration) {
			command = JSON.parse(configuration).backend
		}

		if (!command) {
			await dialogService.error('Unable to find the command for backend!!!')
			return
		}

		instance = terminalService.activeInstance

		if (!instance) {
			instance = await terminalService.createTerminal()
			terminalService.setActiveInstance(instance);
		}

		if (!layoutService.isVisible(Parts.PANEL_PART)) {
			layoutService.setPartHidden(false, Parts.PANEL_PART);
		}

		await instance.sendText(command, true)
	}
}
