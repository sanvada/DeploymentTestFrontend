import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeploymentDefinition } from 'app/types/deployment-definition';
import { ElkTemplate } from 'app/types/elk-template';
import { WindowsTemplate } from 'app/types/windows-template';
import { FormBuilder } from '@angular/forms';
import { DeploymentResult } from 'app/types/deployment-result';


@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit
{

    public deploymentDefinition: DeploymentDefinition;

    public loading = false;

    public deployed = false;

    public deploymentResult: DeploymentResult;

    /**
     * Constructor
     *
     */
    constructor(private http: HttpClient, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.deploymentDefinition = new DeploymentDefinition();
        this.deploymentDefinition.elkTemplate = new ElkTemplate();
        this.deploymentDefinition.windowsTemplates = new Array<WindowsTemplate>();


    }

    submitDeploymentDefiniton() {
        this.loading = true;
        this.http.post<DeploymentResult>('http://localhost:5000/api/deploy', this.deploymentDefinition)
            .subscribe(resp => {
                this.deploymentResult = resp;
                this.loading = false; 
                this.deployed = true;
            });
    }

    addWindowsMachine() {
        this.deploymentDefinition.windowsTemplates.push(new WindowsTemplate());
    }

}
