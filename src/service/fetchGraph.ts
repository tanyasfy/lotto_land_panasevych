interface GraphQLQuery {
  query: string
  variables: {
    type: string
    limit: number
  }
}

/**
 * Holt die Ziehungsergebnisse für eine Lotterie vom GraphQL-Server.
 * @param query Das GraphQL-Query-Objekt, das die spezifischen Daten abfragt.
 * @returns Ein Array mit den gezogenen Zahlen und weiteren Informationen.
 * @throws Fehler, falls ein Problem bei der Abfrage oder der Verarbeitung auftritt.
 */
export const fetchDrawResults = async (query: GraphQLQuery) => {
  const variables = {
    type: 'eurojackpot',
    limit: 50
  }

  try {
    const response = await fetch('http://localhost:8010/proxy/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()
    console.log('result', result)
    if (result.errors) {
      throw new Error(result.errors[0].message)
    }

    return result.data.draw.draws
  } catch (error) {
    console.error('Error fetching draw results:', error)
    throw error
  }
}
