import { makeStyles } from '@material-ui/core';
import React from 'react';
import contributorTypes from './ContributorTypes';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

const RowElement = ({name, value}) => {
  return (
    <div style={{flex: 1, padding: '5px'}}>
      <strong>{name}: </strong>{value}
    </div>
  );
}

const Row = ({children}) => {
  const classes= useStyles();
  return (
    <div className={classes.row}>{children}</div>
  );
}

const ContributorDetail = ({contributor, containerClass}) => {
  return (
    <section className={containerClass}>
      <Row>
        <RowElement name="Nombre" value={contributor.name} />
        <RowElement name="Apellido" value={contributor.lastname} />
      </Row>
      <Row>
        <RowElement name="Direccion" value={contributor.address} />
        <RowElement name="Email" value={contributor.user?.email} />
      </Row>
      <Row>
        <RowElement name="Telefono" value={contributor.phone} />
        <RowElement name="DNI" value={contributor.dni} />
      </Row>
      <Row>
        <RowElement name="Tipo" value={contributorTypes[contributor.type]} />
      </Row>
    </section>
  );
}

export default ContributorDetail;

