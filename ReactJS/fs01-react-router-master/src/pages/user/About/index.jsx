import { Link, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

function About() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort')
  console.log('🚀 ~ About ~ sort:', sort)

  return (
    <div>
      <h1>About Us</h1>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        We are a company dedicated to providing the best services to our
        customers.
      </p>
      <p>
        Our team is composed of experienced professionals who are passionate
        about their work.
      </p>
      <button onClick={() => setSearchParams({ sort: 'desc', keyword: '123' })}>
        Set search params
      </button>
      <p>Contact us for more information!</p>
      <Link to={ROUTES.USER.HOME}>Go to Home page</Link>
    </div>
  )
}

export default About
