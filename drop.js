import fs from 'fs'
import { legends } from './nfts/legends.js'
import { ton_cashback } from './nfts/ton_cashback.js'
import { whales_tag } from './nfts/whales_tag.js'
import { girls } from './nfts/girls.js'
import { getNftsData } from './src/getNftsData.js'

const nftsNumbersForDrop = [...new Set([...whales_tag, ...ton_cashback, ...legends, ...girls])]

const shouldDropTo = {}

const nfts = await getNftsData(nftsNumbersForDrop.map(({ address }) => address))

for (const { score, owner } of nfts) {
  const amount = score * 0.01
  shouldDropTo[owner] = shouldDropTo[owner] ? shouldDropTo[owner] + amount : amount
}

const shouldDropData = Object.entries(shouldDropTo).map(([address, amount]) => ({ address, amount: +amount.toFixed(2)  }))

const sortedShouldDropData = shouldDropData.sort((a, b) => b.amount - a.amount)

const drop = sortedShouldDropData.filter(({ amount }) => amount > 0)

const totalAmount = drop.reduce((acc, { amount }) => acc + amount, 0)

console.log(`Total amount this week: ${totalAmount} AMBR`)

fs.writeFileSync('./drop.json', JSON.stringify(drop, null, 2))