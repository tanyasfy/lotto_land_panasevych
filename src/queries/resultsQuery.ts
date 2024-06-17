export const resultsQuery = `
query ($type: String!, $limit: Int) {
  draw(type: $type, limit: $limit) {
    success
    draws {
      date
      numbers
      additionalNumbers
      jackpot
      gameAmount
      megaPlier
    }
    backendError
  }
}
`
