import React, { useEffect, useState } from 'react';
import { GraphDataTableProps } from './../../utility/interface/props';
import { EndpointState, EntityState, AttributesState, ThemeState } from '../../utility/redux/state';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import {
  getGraphData,
  getGraphDataForID,
  getSortedGraphData,
  getStringFilterGraphData,
} from '../../utility/graph/query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import queryString from 'query-string';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Tooltip from '@mui/material/Tooltip';
import './graph-data-table.scss';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Alert, Button, Menu, Snackbar, TableHead } from '@mui/material';
import moment from 'moment';
import PrimaryMenu from '../PrimaryMenu/primary-menu';
import Constants from '../../utility/constant';
import humanizeString from 'humanize-string';
import Loader from '../Loader/loader';
import { ethers } from 'ethers';

const GraphDataTable: React.FunctionComponent<GraphDataTableProps & RouteComponentProps<any>> = ({
  drawerOpen,
  location,
}) => {
  let selectedEntity: string;
  let rows: any[] = [];
  let pageNumber: number = 1;
  let isNextDisable: boolean = false;
  let isPrevDisable: boolean = true;
  const parsed = queryString.parse(location.search);
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);
  const allAttributes = useSelector((state: AttributesState) => state.allAttributes.attributes);
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);

  const label = Constants.LABELS.commonLables;
  const urlLabels = Constants.LABELS.commonUrls;
  const dataTypeLabel = Constants.FILTERLABELS.dataTypeLabels;
  const columnLabel = Constants.FILTERLABELS.columnNameLabels;

  const getBoardDataAsQuery = () => {
    if (parsed.id !== undefined) {
      return getGraphDataForID(allAttributes, selectedEntity, `${parsed.id}`);
    }
    if (parsed.s !== undefined && parsed.c !== undefined) {
      return getSortedGraphData(allAttributes, selectedEntity, `${parsed.s}`, `${parsed.c}`);
    }
    if (parsed.f !== undefined && parsed.c !== undefined && parsed.i !== undefined) {
      return getStringFilterGraphData(
        allAttributes,
        selectedEntity,
        `${parsed.f}`,
        `${parsed.c}`,
        `${parsed.i}`
      );
    }
    if (parsed.p !== undefined) {
      const PaginateNumber: string = `${parsed.p}`;
      pageNumber = parseInt(PaginateNumber);
      if (pageNumber > 1) {
        isPrevDisable = false;
      }
      const skip = 100 * (pageNumber - 1);
      return getGraphData(allAttributes, selectedEntity, 100, skip);
    }
    return getGraphData(allAttributes, selectedEntity, 100, 0);
  };
  useEffect(() => {
    getBoardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToNext = () => {
    if (isNextDisable) return;
    const URI = encodeURIComponent(endpoint);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&p=${
      pageNumber + 1
    }`;
  };
  const goToPrev = () => {
    if (isPrevDisable) return;
    const URI = encodeURIComponent(endpoint);
    if (pageNumber === 2) {
      return (window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}`);
    }
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&p=${
      pageNumber - 1
    }`;
  };

  const entityClicked = (entity: string, id: string, type: string) => {
    let verifyAddress = ethers.utils.isAddress(id);
    const re = /[0-9A-Fa-f]{6}/g; // 0x + 64 bytes

    if (type === dataTypeLabel.OBJECT) {
      const URI = encodeURIComponent(endpoint);
      const selectedEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
      window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&id=${id}`;
    } else if (entity === 'id' && verifyAddress) {
      window.open(
        `${urlLabels.ADDRESS_URL}${id}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    } else if (id && id.length === 66 && re.test(id)) {
      window.open(
        `${urlLabels.TNX_URL}${id}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    } else {
      setOpen(true);
    }
  };

  const [getBoardData, { error, loading, data }] = useLazyQuery(getBoardDataAsQuery());
  if (loading) {
  }
  if (error) {
  }
  if (data) {
    let queryData: any[];
    queryData = data['entity'];
    if (queryData !== undefined) {
      rows = [...queryData];
      if (rows.length < 100) {
        isNextDisable = true;
      }
    }
  }

  //Open/Close Filter DropDown Menu Functions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [attribute, setAttribute] = useState(label.EMPTY);
  const [attributeType, setAttributeType] = useState(label.EMPTY);
  const [attributeDataType, setAttributeDataType] = useState(label.EMPTY);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const setAttributeDetails = (
    attributes: string,
    attributeType: string,
    attributeDataType: string
  ) => {
    setAttribute(attributes);
    setAttributeType(attributeType);
    setAttributeDataType(attributeDataType);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const handleCloseToast = () => {
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="all-graph-data">
          <div
            className={`table-conatiner ${drawerOpen ? 'drawer-open-table-length' : label.EMPTY}`}
          >
            <Table stickyHeader aria-label="sticky table" className="data-table">
              <TableHead>
                <TableRow>
                  {allAttributes.map((item, i) => (
                    <TableCell
                      key={i}
                      className={`${
                        theme === label.LIGHT ? 'table-head-cell-light' : 'table-head-cell'
                      }`}
                    >
                      <Button
                        onClick={handleOpenMenu}
                        onMouseOver={() => setAttributeDetails(item.name, item.type, item.typeName)}
                        aria-controls="menu"
                        endIcon={<KeyboardArrowDown />}
                        variant="outlined"
                        className="table-column-btn"
                      >
                        {` ${humanizeString(item.name)}`}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length !== 0
                  ? rows.map((row, i) => (
                      <TableRow className="tabledata-row" key={i}>
                        {allAttributes.map((item, key) => (
                          <TableCell
                            key={key}
                            className={`${
                              item.type === dataTypeLabel.OBJECT
                                ? 'entity-object'
                                : item.name === 'id'
                                ? 'ether-scan-address'
                                : item.typeName === dataTypeLabel.STRING ||
                                  item.typeName === dataTypeLabel.BIGINT ||
                                  item.typeName === dataTypeLabel.BIGDECIMAL ||
                                  item.typeName === dataTypeLabel.INT
                                ? 'entity_number'
                                : 'entity_number'
                            }`}
                            onClick={() =>
                              entityClicked(
                                `${
                                  item.type === dataTypeLabel.OBJECT
                                    ? row[`${item.name}`] !== undefined
                                      ? row[`${item.name}`].__typename
                                      : label.EMPTY
                                    : item.name
                                }`,
                                `${
                                  item.type === dataTypeLabel.OBJECT
                                    ? row[`${item.name}`] !== undefined
                                      ? row[`${item.name}`].id
                                      : label.EMPTY
                                    : row[`${item.name}`] !== undefined
                                    ? row[`${item.name}`]
                                    : label.EMPTY
                                }`,
                                item.type
                              )
                            }
                          >{`${
                            item.type === dataTypeLabel.LIST ||
                            item.type === dataTypeLabel.OBJECT ||
                            item.type === dataTypeLabel.NON_NULL
                              ? row[`${item.name}`] !== undefined
                                ? row[`${item.name}`].id
                                : label.EMPTY
                              : `${item.name}` === columnLabel.CREATED_AT_TIMESTAMP ||
                                `${item.name}` === columnLabel.TIMESTAMP ||
                                `${item.name}` === columnLabel.UPDATED_AT_TIMESTAMP ||
                                `${item.name}` === columnLabel.DATE
                              ? row[`${item.name}`] !== undefined
                                ? moment(new Date(row[`${item.name}`] * 1000)).format(
                                    'MMMM D, YYYY, h:mmA'
                                  )
                                : label.EMPTY
                              : row[`${item.name}`] !== undefined
                              ? row[`${item.name}`]
                              : label.EMPTY
                          }`}</TableCell>
                        ))}
                      </TableRow>
                    ))
                  : label.EMPTY}
              </TableBody>
            </Table>

            {rows.length > 0 ? (
              label.EMPTY
            ) : (
              <div className="no-record-found">
                <img className="no-record-found" src="/images/no_record_found.gif" alt="" />
                <span>Oops!! No Record Found.</span>
              </div>
            )}

            <Menu id="menu" onClose={handleCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <PrimaryMenu
                attributeName={attribute}
                attributeType={attributeType}
                attributeDataType={attributeDataType}
              />
            </Menu>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={open}
              autoHideDuration={3000}
              onClose={handleCloseToast}
            >
              <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
                {label.INVALID}
              </Alert>
            </Snackbar>
          </div>
          {parsed.id === undefined && rows.length > 0 ? (
            <div
              className={`next-previous-option ${
                drawerOpen ? 'drawer-open-next-previous-option' : label.EMPTY
              }`}
            >
              <Tooltip title="previous">
                <NavigateBeforeIcon
                  onClick={goToPrev}
                  className={`previous-icon ${isPrevDisable ? 'disable-navigation' : label.EMPTY}`}
                ></NavigateBeforeIcon>
              </Tooltip>
              <span>{pageNumber}</span>
              <Tooltip title="next">
                <NavigateNextIcon
                  onClick={goToNext}
                  className={`${isNextDisable ? 'disable-navigation' : label.EMPTY}`}
                ></NavigateNextIcon>
              </Tooltip>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default withRouter(GraphDataTable);
