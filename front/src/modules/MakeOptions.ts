export default function makeDefaultOption(items: Array<{ value: string | null, text: string }>, title: string) {
    // memory
    items.unshift({ text: `Selecione um ${title}`, value: null  })
    return items
}
