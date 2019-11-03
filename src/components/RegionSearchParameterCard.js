import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '8px 0'
  }
}))

const RegionSearchParameterCard = ({ region, onClose }) => {
  const styles = useStyles()

  return (
    <Card className={styles.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        title={region.name}
        // TODO
        // subheader={region.value}
      />
      <CardContent>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={true}
                onChange={() => {}}
                value={{ id: 'DG' }}
              />
            }
            label={'Daten dieser Region'}
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={false}
                onChange={() => {}}
                value={{ parent: 'DG', nuts: 2 }}
              />
            }
            label={'Bundesländer'}
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={false}
                onChange={() => {}}
                value={{ parent: 'DG', nuts: 3 }}
              />
            }
            label={'Regierungsbezirke / Statistische Regionen'}
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={false}
                onChange={() => {}}
                value={{ parent: 'DG', lau: true }}
              />
            }
            label={'Kreise und kreisfreie Städte'}
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={false}
                onChange={() => {}}
                value={'foo'}
              />
            }
            label={'Gemeinden'}
          />
        </FormGroup>
      </CardContent>
    </Card>
  )
}

RegionSearchParameterCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired
}

export default RegionSearchParameterCard
