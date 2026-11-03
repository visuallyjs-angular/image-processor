import { Component } from '@angular/core'
import { BaseNodeComponent } from '@visuallyjs/browser-ui-angular'
import { catalog } from '../catalog'
@Component({
    template: `
<div [class]="'processor-node ' + op.id.split('.')[0]" [attr.data-node-id]="modelObject.id" [attr.data-node-type]="op.id">
<header><span>{{data['label']}}</span><button class="delete-node" title="Delete node" aria-label="Delete node">×</button></header>
<div class="ports">@for (input of [true, false]; track input) {<div>@for(p of (input ? op.inputs : op.outputs); track p.id) {<div [class]="'port-row ' + (input ? 'input' : 'output')"><span class="port" [attr.data-vjs-port]="(input ? 'in:' : 'out:') + p.id" [attr.data-vjs-port-type]="input ? 'target' : 'source'" [attr.data-vjs-target]="input ? 'true' : null" [attr.data-vjs-source]="input ? null : 'true'" [attr.data-vjs-scope]="p.type" [title]="p.label + ' (' + p.type + ')' "></span><span>{{p.label}}</span></div>}</div>}</div>
@if(op.id === 'basic.source' || op.id === 'basic.display') {<canvas width="200" height="160" aria-label="Image preview"></canvas><footer>@if(op.id === 'basic.source') {<button class="upload-image" title="Upload image">Upload image</button>} @else {<a class="download-image" aria-disabled="true" title="Download image">Download PNG</a>}<span class="dimensions"></span></footer>} @else {<div class="value-preview"></div>}
<div class="node-error" role="status"></div></div>`
})
export class ProcessorNode extends BaseNodeComponent {
    get op() { return catalog[this.modelObject.type] }
}
