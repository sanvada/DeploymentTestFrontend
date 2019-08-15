import { ElkTemplate } from './elk-template';
import { WindowsTemplate } from './windows-template';

export class DeploymentDefinition {
    elkTemplate: ElkTemplate;
    windowsTemplates: WindowsTemplate[];
}