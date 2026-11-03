import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core'
import { SurfaceComponent, VisuallyJsModule } from '@visuallyjs/browser-ui-angular'
import { createProcessor } from '../processor'
import { nativeView } from '../view-options'
@Component({ selector: 'app-root', imports: [VisuallyJsModule], templateUrl: './app.html' })
export class App implements AfterViewInit, OnDestroy {
    @ViewChild(SurfaceComponent) canvas!: SurfaceComponent
    private root = inject(ElementRef)
    processor = createProcessor()
    view = nativeView(this.processor.viewOptions)
    private dispose?: () => void
    ngAfterViewInit() { this.dispose = this.processor.attach(this.canvas.surface, this.root.nativeElement, document.baseURI) }
    ngOnDestroy() { this.dispose?.() }
}
