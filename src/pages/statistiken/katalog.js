import DefaultLayout from '../../layouts/DefaultLayout'
import Container from '@material-ui/core/Container'
import { BodyText } from '../../components/BodyText'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import SecondaryStage from '../../components/SecondaryStage'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

const meta = {
  title: 'Statistiken und Merkmale',
}

const useStyles = makeStyles((theme) => ({
  searchBar: {
    backgroundColor: theme.palette.grey[50],
    width: '100%',
    display: 'flex',
    padding: theme.spacing(4, 0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@global': {
    // this property cannot be accessed through
    // the CSS API 🤯
    '.MuiOutlinedInput-root': {
      background: 'white',
    },
  },
  textInput: {
    [theme.breakpoints.up('sm')]: {
      width: 350,
    },
  },

  submitButton: {
    marginLeft: theme.spacing(2),
    height: '3.4rem',
    boxShadow: theme.shadows[0],
  },
}))

const Katalog = ({ statistics }) => {
  const classes = useStyles()

  return (
    <DefaultLayout meta={meta}>
      <SecondaryStage claim="Statistiken und Merkmale - Das datenguide Datenportal" />
      <div className={classes.searchBar}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          label="Suche"
          type="text"
          id="text"
          name="text"
          autoComplete="text"
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
          className={classes.submitButton}
        >
          Suche
        </Button>
      </div>
      <Container>
        <BodyText>
          {statistics.map((s) => (
            <div key={s.id}>
              <h2>
                {s.id} - {s.title}
              </h2>
              <ul>
                {s.measures.map((m) => (
                  <li key={m.id}>
                    <Link href={`/statistiken?region=DG&data=${s.id}:${m.id}`}>
                      <a>
                        {m.id} - {m.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </BodyText>
      </Container>
    </DefaultLayout>
  )
}

export const getServerSideProps = async (req) => {
  const fetchStatistics = await fetch(`http://localhost:3000/api/statistics`)
  const statistics = await fetchStatistics.json()
  return {
    props: {
      statistics,
    },
  }
}

export default Katalog
