import { ProcessorNode } from './app/processor-node'
export function nativeView(view : any) {
    return { ...view, nodes: Object.fromEntries(Object.entries(view.nodes).map(([type, definition]: [string, any]) => {
        const { template, ...behavior } = definition
        return [type, { ...behavior, component: ProcessorNode }]
    })) }
}
