import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataBoardProps } from './../../utility/interface/props';
import { EntityState } from '../../utility/redux/state';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './data-board.scss';
import { useLazyQuery } from '@apollo/client';
import { getAllAttributes } from '../../utility/graph/query';
import GraphDataTable from '../GraphDataTable/graph-data-table';
import { setGraphAttributes, setGraphQuery } from '../../redux/actions/endpoint-action';
import Constants from '../../utility/constant';
import queryString from 'query-string';
import ExportToCsv from '../ExportToCSV/export-to-csv';
import ErrorMessage from '../ErrorMessage/error-message';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: '64px',
  backgroundColor: 'white',
  borderRadius: '10px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: 'width 2s',
  }),
  marginLeft: `-${drawerWidth}px`,

  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: 'margin 2s',
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
    },
  }),
}));
const DataBoard: React.FunctionComponent<DataBoardProps & RouteComponentProps> = ({
  drawerOpen,
}) => {
  const label = Constants.LABELS.commonLables;
  const dataTypeLabel = Constants.FILTERLABELS.dataTypeLabels;

  const selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);
  const dispatch = useDispatch();
  let allAttributes: { name: string; type: string; typeName: string }[];
  allAttributes = [];
  const entity = selectedEntity
    ? selectedEntity.charAt(0).toUpperCase() + selectedEntity.slice(1)
    : label.EMPTY;

  const parsed = queryString.parse(window.location.search);

  useEffect(() => {
    getAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [getAttributes, { error, loading, data }] = useLazyQuery(getAllAttributes(entity));
  if (loading) {
    if (error) {
    }
  } else {
    if (error) {
    }
    if (data) {
      const queryData = data.__type?.fields;
      if (queryData !== undefined) {
        for (let index = 0; index < queryData.length; ++index) {
          const element = queryData[index];
          if (
            !element.type?.ofType ||
            element.type?.ofType?.kind === dataTypeLabel.LIST ||
            element.type?.ofType?.kind === dataTypeLabel.NON_NULL
          )
            continue;
          allAttributes.push({
            name: element.name,
            type: element.type?.ofType?.kind,
            typeName: element.type?.ofType?.name,
          });
        }
      }
      if (allAttributes.length > 0) {
        dispatch(setGraphAttributes(allAttributes));

        let myGlobalQuery: string = ` `;

        for (let item of allAttributes) {
          // myGlobalQuery += item.name

          if (item.name === 'id') {
            continue;
          }
          if (item.type === 'LIST' || item.type === 'OBJECT' || item.type === 'NON_NULL') {
            myGlobalQuery = myGlobalQuery + `${item.name} { id } `;
          } else {
            myGlobalQuery = myGlobalQuery + `${item.name} `;
          }
        }
        dispatch(setGraphQuery(myGlobalQuery));
      }
    }
  }

  return (
    <>
      <div>{parsed.v !== undefined ? <ExportToCsv /> : null}</div>
      <Main open={drawerOpen}>
        <div className="tab-pane" id="tab0" role="tabpanel" aria-labelledby="tab_0">
          {allAttributes.length !== 0 ? (
            <GraphDataTable drawerOpen={drawerOpen}></GraphDataTable>
          ) : null}
          {error && (
            <ErrorMessage
              message={error.message}
              endpoint={'https://api.thegraph.com/subgraphs/name/'}
            ></ErrorMessage>
          )}
        </div>
      </Main>
    </>
  );
};

export default withRouter(DataBoard);
