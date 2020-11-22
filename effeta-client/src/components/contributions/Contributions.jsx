import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ContributionService from '../../services/Contribution';
import ContributionsHistory from './ContributionsHistory';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '20px',
  }
});

const Contributions = (props) => {
  const [contributions, setContributions] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    function loadContributions() {
      ContributionService.list().then(res => {
        setContributions(res.data);
      }).catch(err => alert(err));
    }
    loadContributions();
  }, []);

  return (
    <section style={{width: '100%'}}>
      <div className={classes.header}>
        <Typography variant="h5" component="h2">
          Aportes
        </Typography>
      </div>
      <ContributionsHistory contributions={contributions}/>
    </section>
  );
}

export default Contributions;
