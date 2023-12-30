import fetch from 'node-fetch'

export async function getNftsData(addresses) {
  const url = 'https://whales-club-bot-34uqt.ondigitalocean.app/api/bot/nft'

  try {
    const body = JSON.stringify({ addresses })
    const headers = { 'Content-Type': 'application/json', 'x-api-key': 'M5eFoUFDJq' }
    const method = 'POST'
    const response = await fetch(url, { body, headers, method })
    const data = await response.json()
    return data.nfts
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error)
  }
}