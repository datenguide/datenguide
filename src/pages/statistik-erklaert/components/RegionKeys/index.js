import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'

import {
  getNutsHierarchy,
  getNutsComponents,
} from '../../../../lib/nutsFormatting'

import RegionSelectStatic from './RegionSelectStatic'

const red = '#f26c6f'

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '550px',
  },
  regionSelect: {
    marginLeft: '240px',
    width: '800px',
    marginBottom: theme.spacing(4),
  },
  regionKey: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '6rem',
    fontWeight: 400,
    marginLeft: '400px',
    display: 'flex',
    flexDirection: 'row',
    width: '500px',
    marginBottom: theme.spacing(2),
  },
  regionKeySegment: {
    // border: 1px solid green,
    display: 'flex',
    justifyContent: 'center',
  },
  regionKeySegmentSpan1: {
    width: '11%',
  },
  regionKeySegmentSpan2: {
    width: '22%',
  },
  regionKeySegmentSpan3: {
    width: '33%',
  },
  regionKeySegmentSeparator: {
    width: '4%',
  },
  regionKeyPart: {
    display: 'flex',
    justifyContent: 'center',
  },
  nutsHierarchy: {
    display: 'flex',
    flexDirection: 'column',
  },
  nutsHierarchyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    width: '900px',
  },
  nutsHierarchyLabel: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '1rem',
    fontWeight: 400,
    width: '384px',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(2),
  },
  nutsHierarchyLabelName: {
    fontWeight: 'bold',
  },
  nutsHierarchyIdWrapper: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '1.5rem',
    fontWeight: 400,
    color: red,
    display: 'flex',
    flexGrow: 1,
  },
  nutsHierarchyId: {
    padding: theme.spacing(0, 1),
  },
  nutsHierarchyIdBorder: {
    border: '1px solid red',
    borderTop: 'none',
  },
  nutsHierarchyIdSpan2: {
    width: '22%',
  },
  nutsHierarchyIdSpan3: {
    width: '37%',
  },
  nutsHierarchyIdSpan5: {
    width: '63%',
  },
  nutsHierarchyIdSpan8: {
    width: '100%',
  },
  nutsLabel: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    fontSize: '1rem',
  },
}))

const RegionKeys = ({ flip }) => {
  const classes = useStyles()
  const [region, setRegion] = useState(null)

  const handleSelect = (region) => {
    setRegion(region)
  }

  const getNutsHierarchySpan = (index) =>
    [
      classes.nutsHierarchyIdSpan8,
      classes.nutsHierarchyIdSpan5,
      classes.nutsHierarchyIdSpan3,
      classes.nutsHierarchyIdSpan2,
    ][index]

  const nutsComponents = getNutsComponents(region)

  const getNutsLabel = (nuts) => {
    return nuts !== 4 ? (
      <span className={classes.nutsLabel}>NUTS {nuts}</span>
    ) : null
  }

  return (
    <div className={classes.root}>
      <RegionSelectStatic
        className={classes.regionSelect}
        onSelect={handleSelect}
      />
      <div className={classes.regionKey}>
        <span
          className={clsx(
            classes.regionKeySegment,
            classes.regionKeySegmentSpan2
          )}
        >
          {nutsComponents[0]}
        </span>
        <span className={classes.regionKeySegmentSeparator} />
        <span
          className={clsx(
            classes.regionKeySegment,
            classes.regionKeySegmentSpan1
          )}
        >
          {nutsComponents[1]}
        </span>
        <span className={classes.regionKeySegmentSeparator} />
        <span
          className={clsx(
            classes.regionKeySegment,
            classes.regionKeySegmentSpan2
          )}
        >
          {nutsComponents[2]}
        </span>
        <span className={classes.regionKeySegmentSeparator} />
        <span
          className={clsx(
            classes.regionKeySegment,
            classes.regionKeySegmentSpan3
          )}
        >
          {nutsComponents[3]}
        </span>
      </div>
      <>
        {region && region.value !== '00000000' && (
          <div className={classes.nutsHierarchy}>
            {getNutsHierarchy(region).map((part, index) => (
              <div className={classes.nutsHierarchyRow} key={part.id}>
                <div className={classes.nutsHierarchyLabel}>
                  <span className={classes.nutsHierarchyLabelName}>
                    {part.name} &middot;&nbsp;
                  </span>
                  <span> {part.nutsDescription}</span>
                </div>
                <div className={clsx(classes.nutsHierarchyIdWrapper)}>
                  <span
                    className={clsx(
                      classes.nutsHierarchyIdBorder,
                      getNutsHierarchySpan(index)
                    )}
                  >
                    <span className={classes.nutsHierarchyId}> {part.id}</span>
                  </span>

                  {getNutsLabel(part.nuts)}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  )
}

RegionKeys.propTypes = {
  flip: PropTypes.bool,
}

RegionKeys.defaultProps = {
  flip: false,
}

export default RegionKeys
