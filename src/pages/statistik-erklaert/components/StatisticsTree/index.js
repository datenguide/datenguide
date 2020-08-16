import useSWR from 'swr'

import { makeStyles } from '@material-ui/core/styles'

import StatisticsTreeView from '../../../../components/querytool/StatisticsTreeView'
import fetcher from '../../../../lib/fetcher'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '400px',
    width: '800px',
    overflow: 'scroll',
  },
}))

const StatisticsTree = () => {
  const classes = useStyles()
  const { data: statistics } = useSWR(`/api/statistics`, fetcher)

  return (
    <div className={classes.root}>
      {statistics ? (
        <StatisticsTreeView
          nodes={Object.values(statistics)}
          onSelect={() => {}}
        />
      ) : (
        'loading'
      )}
    </div>
  )
}

export default StatisticsTree
