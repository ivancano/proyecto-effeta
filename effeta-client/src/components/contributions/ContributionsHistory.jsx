import { Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';

const ContributionsHistory = ({contributions}) => {

  return (
    <div style={{padding: '20px'}}>
      {contributions && contributions.length > 0 (
        <List>
          { contributions.map(contribution => (
            <>
              <ListItem button>
                <ListItemText primary={contribution.amount} secondary={contribution.date} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      )}
      {(!contributions || contributions.length === 0) && (
        <List>
          <Typography variant="h6" component="h2">
            No se encontraron aportes
          </Typography>
        </List>
      )}
    </div>
  );
}

export default ContributionsHistory;
