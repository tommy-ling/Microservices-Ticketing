import Link from 'next/link'

const Landing = ({ currentUser, tickets }) => {
  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketid]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    )
  })
  return (
    <div>
      <h1>TIckets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  )
}

// getInitialProps can be executed on either browser or server
// on browser when navigating back and forth; server when doing hard refresh
// whatever is returned in this function is passed to the component as props
Landing.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets')

  return { tickets: data }
}

export default Landing