# Getmems snippet

## How to use

1. Open [Getgems collection page](https://getgems.io/collection/whales) with filters and run this script in console to copy all whales [{ adress, id }] to clipboard

```const a = (() => {
  const elements = document.querySelectorAll('.NftPreview__wrap')

  const result = Array.from(elements).map(el => {
    const anchor = el.querySelector('a.NftPreview')
    const label = el.querySelector('.LibraryLabel')

    return {
      address: anchor ? anchor.href.replace('https://getgems.io/collection/whales/', '') : null,
      id: label ? +label.textContent.replace('Whale #', '').trim() : null
    }
  })

  return result
})()