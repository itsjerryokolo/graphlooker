import React, { useEffect, useState } from 'react';
import { Allfilters, GraphDataTableProps } from './../../utility/interface/props';
import {
  EndpointState,
  EntityState,
  AttributesState,
  QueryDataState,
  GraphNameState,
  ThemeState,
  listOfEntityState,
} from '../../utility/redux/state';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDataQuery,
  getGraphDataForID,
  getSortedDataQuery,
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
import { Button, Menu, TableHead } from '@mui/material';
import moment from 'moment';
import PrimaryMenu from '../PrimaryMenu/primary-menu';
import Constants from '../../utility/constant';
import { setDataLoading } from '../../redux/actions/loading-action';
import Utility from '../../utility/utility';
import ErrorMessage from '../ErrorMessage/error-message';
import ExportButton from '../ExportToCSV/ExportButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NoRecords from '../NoRecords/NoRecords';
import FilterData from '../FilterData/FilterData';
import { noCase } from 'change-case';

const GraphDataTable: React.FunctionComponent<GraphDataTableProps & RouteComponentProps<any>> = ({
  drawerOpen,
  location,
}) => {
  let selectedEntity: any;
  let rows: any[] = [];
  let pageNumber: number = 1;
  let isNextDisable: boolean = false;
  let isPrevDisable: boolean = true;
  const parsed = queryString.parse(location.search);
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  const subgraphNetworkName = useSelector((state: GraphNameState) => state.graphName.subgraphName);
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);
  let efd = useSelector((state: EntityState) => state.selectedEntity.efd);
  efd = efd ? efd : `${parsed.efd}`;
  let listOfattributes = useSelector((state: AttributesState) => state.allAttributes.attributes);
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  let listOfEntity = useSelector((state: listOfEntityState) => state.listOfEntity);
  let listOfFilters = String(parsed.filterObj);
  const dispatch = useDispatch();

  const label = Constants.LABELS.commonLables;
  const urlLabels = Constants.LABELS.commonUrls;
  const dataTypeLabel = Constants.FILTERLABELS.dataTypeLabels;
  const queryDataGlobalState = useSelector((state: QueryDataState) => state.queryState.query);
  const [errorMsg, setErrorMsg] = useState('');
  const getBoardDataAsQuery = (error: string) => {
    let listOfFilters: Allfilters[] = [];
    let sortFilter: Allfilters[] = [];
    if (parsed && parsed.filterObj && typeof parsed.filterObj === 'string') {
      listOfFilters = JSON.parse(parsed.filterObj);
      sortFilter = listOfFilters.filter((data) => data.filterName === 'sort');
    }
    if (parsed.id) {
      return getGraphDataForID(listOfattributes, efd, `${parsed.id}`);
    }
    //if only sorting fiilter is available
    if (listOfFilters && listOfFilters.length === 1 && sortFilter && sortFilter.length) {
      const skip = checkForPagination();
      return getSortedDataQuery(
        listOfattributes,
        `${parsed.efd}`,
        sortFilter[0].inputValue,
        sortFilter[0].columnName,
        skip,
        100,
        '',
        error
      );
    } else if (listOfFilters.length) {
      const skip = checkForPagination();
      return getStringFilterGraphData(
        listOfattributes,
        `${parsed.efd}`,
        skip,
        100,
        '',
        error,
        listOfFilters
      );
    }
    if (parsed.p) {
      const paginateNumber: string = `${parsed.p}`;
      pageNumber = parseInt(paginateNumber);
      if (pageNumber > 1) {
        isPrevDisable = false;
      }
      const skip = 100 * (pageNumber - 1);
      return getDataQuery(
        listOfattributes,
        `${parsed.efd}`,
        100,
        skip,
        queryDataGlobalState,
        '',
        error
      );
    }
    return getDataQuery(listOfattributes, `${parsed.efd}`, 100, 0, queryDataGlobalState, '', error);
  };
  const checkForEllipsis = (data: any) => {
    if (data?.length > 60) {
      return { data: data.substring(0, 60) + '...', isTooltipNeeded: true };
    }
    return { data: data, isTooltipNeeded: false };
  };
  const showValuesBasedOnType = (row: any, item: any) => {
    let columnData;
    if (
      item.type === dataTypeLabel.LIST ||
      item.type === dataTypeLabel.OBJECT ||
      item.type === dataTypeLabel.NON_NULL
    ) {
      if (row[`${item.name}`] !== undefined) {
        if (row[`${item.name}`] && Array.isArray(row[`${item.name}`])) {
          columnData = JSON.stringify(row[`${item.name}`]);
        } else {
          columnData = row[`${item.name}`]?.id;
        }
      } else {
        columnData = label.EMPTY;
      }
    } else if (Utility.getTimestampColumns(item.name)) {
      if (row[`${item.name}`] !== undefined) {
        columnData = moment(new Date(row[`${item.name}`] * 1000)).format(label.TIME_FORMAT);
      } else {
        columnData = label.EMPTY;
      }
    } else if (
      item.typeName === dataTypeLabel.BIGINT ||
      item.typeName === dataTypeLabel.BIGDECIMAL ||
      item.typeName === dataTypeLabel.INT
    ) {
      if (row[`${item.name}`] && Utility.getIntUptoTwoDecimal(row, item.name)) {
        columnData = parseInt(row[`${item.name}`]).toFixed(2);
      } else {
        if (row[`${item.name}`] !== undefined) {
          columnData = row[`${item.name}`];
        } else {
          columnData = label.EMPTY;
        }
      }
    } else {
      if (row[`${item.name}`] !== undefined) {
        columnData = row[`${item.name}`];
      } else {
        columnData = label.EMPTY;
      }
    }
    let formattedData = checkForEllipsis(columnData);

    return {
      displayValue: formattedData.data,
      isTooltipNeeded: formattedData.isTooltipNeeded,
      TooltipDisplayValue: columnData,
    };
  };
  useEffect(() => {
    getBoardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkForPagination = () => {
    if (parsed.p) {
      const paginateNumber: string = `${parsed.p}`;
      pageNumber = parseInt(paginateNumber);
    } else {
      pageNumber = 1;
    }
    if (pageNumber > 1) {
      isPrevDisable = false;
    }
    return 100 * (pageNumber - 1);
  };

  const goToNext = () => {
    let filtersInStringify = Utility.getAllFilters(null, null, null, listOfFilters);
    if (isNextDisable) return;
    const URI = encodeURIComponent(endpoint);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity.entity}&p=${
      pageNumber + 1
    }&efd=${parsed.efd}&filterObj=${filtersInStringify}`;
  };
  const goToPrev = () => {
    if (isPrevDisable) return;
    let filtersInStringify = Utility.getAllFilters(null, null, null, listOfFilters);
    const URI = encodeURIComponent(endpoint);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity.entity}&p=${
      pageNumber - 1
    }&efd=${parsed.efd}&filterObj=${filtersInStringify}`;
  };

  //Get Table Data
  const [getBoardData, { error, loading, data }] = useLazyQuery(getBoardDataAsQuery(errorMsg));

  useEffect(() => {
    error && setErrorMsg(error?.message);
  }, [error, data]);

  if (loading) {
  }
  if (error) {
    if (errorMsg && !data && !errorMsg.includes(Constants.LABELS.commonLables.NULL_VALUE)) {
      dispatch(setDataLoading(false));
    }
  }
  if (data) {
    let queryData: any[];
    queryData = data['entity'];
    if (queryData) {
      rows = [...queryData];
      if (rows.length < 100) {
        isNextDisable = true;
      }
    }
    dispatch(setDataLoading(false));
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

  if (errorMsg) {
    listOfattributes = listOfattributes.filter((item) => item.type !== dataTypeLabel.OBJECT);
  }
  if (listOfattributes.length === 0) {
    dispatch(setDataLoading(false));
  }
  const getClassNameBasedOnEntity = (row: any, itemName: any, itemType: any) => {
    if (Utility.linkToAddressAndTxHash(row, itemName, itemType) && subgraphNetworkName) {
      return 'tablerow-data-css address-data-css';
    }
    if (itemType === dataTypeLabel.OBJECT && row[`${itemName}`]) {
      return 'tablerow-data-css address-data-css';
    } else {
      return 'tablerow-data-css';
    }
  };
  return (
    <>
      <div className={drawerOpen ? 'FilterData' : 'FilterData-drawer-open'}>
        {listOfFilters !== 'undefined' ? <FilterData props={listOfFilters} /> : null}
      </div>
      <ExportButton rows={rows} />
      <div className="all-graph-data">
        <div
          className={`${
            listOfFilters !== 'undefined' ? 'table-conatiner filters-included' : 'table-conatiner'
          } ${drawerOpen ? 'drawer-open-table-length' : label.EMPTY}`}
        >
          <Table stickyHeader aria-label="sticky table" className="data-table">
            <TableHead>
              <TableRow>
                {data &&
                  listOfattributes.map((item, i) => (
                    <TableCell
                      key={i}
                      className={`${
                        theme === label.LIGHT_THEME_LABEL
                          ? 'table-head-cell-light'
                          : 'table-head-cell'
                      }`}
                    >
                      <div className="attribute-columns-cell">
                        <Button
                          onClick={handleOpenMenu}
                          onMouseOver={() =>
                            setAttributeDetails(item.name, item.type, item.typeName)
                          }
                          aria-controls="menu"
                          endIcon={<KeyboardArrowDown />}
                          variant="outlined"
                          className="table-column-btn"
                        >
                          {item.type === dataTypeLabel.OBJECT
                            ? `${noCase(item.name)} Id`
                            : `${noCase(item.name)}`}
                          {item.type === dataTypeLabel.OBJECT ? (
                            <Tooltip
                              title={
                                <>
                                  {label.ENTITY_REFERENCE} <b> {item.name.toUpperCase()}</b>
                                </>
                              }
                            >
                              <InfoOutlinedIcon />
                            </Tooltip>
                          ) : null}
                        </Button>
                      </div>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length !== 0
                ? rows.map((row, i) => (
                    <TableRow className="tabledata-row" key={i}>
                      {listOfattributes.map((item, key) => (
                        <Tooltip
                          title={
                            showValuesBasedOnType(row, item).isTooltipNeeded
                              ? `${showValuesBasedOnType(row, item).TooltipDisplayValue}`
                              : label.EMPTY
                          }
                        >
                          <TableCell
                            key={key}
                            className={getClassNameBasedOnEntity(row, item.name, item.type)}
                            onClick={() => {
                              Utility.verifyAddress(
                                item.typeName,
                                `${parsed.efd}`,
                                row,
                                item.name,
                                item.type,
                                endpoint,
                                subgraphNetworkName,
                                String(theme),
                                listOfEntity
                              );
                            }}
                          >
                            {`${showValuesBasedOnType(row, item).displayValue}`}
                          </TableCell>
                        </Tooltip>
                      ))}
                    </TableRow>
                  ))
                : label.EMPTY}
            </TableBody>
          </Table>

          {errorMsg && !data ? (
            <ErrorMessage type="icon" errorMessage={errorMsg} endpoint={endpoint}></ErrorMessage>
          ) : (
            label.EMPTY
          )}

          {rows.length > 0 || errorMsg || parsed.v ? (
            label.EMPTY
          ) : (
            <NoRecords listOfattributes={listOfattributes} />
          )}

          <Menu id="menu" onClose={handleCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
            <PrimaryMenu
              attributeName={attribute}
              attributeType={attributeType}
              attributeDataType={attributeDataType}
            />
          </Menu>
        </div>
        {parsed.id === undefined && rows.length > 0 ? (
          <div
            className={`next-previous-option ${
              drawerOpen ? 'drawer-open-next-previous-option' : label.EMPTY
            }`}
          >
            <Tooltip title="Previous">
              <NavigateBeforeIcon
                onClick={goToPrev}
                className={`previous-icon ${isPrevDisable ? 'disable-navigation' : label.EMPTY}`}
              ></NavigateBeforeIcon>
            </Tooltip>
            <span>{pageNumber}</span>
            <Tooltip title="Next">
              <NavigateNextIcon
                onClick={goToNext}
                className={`${isNextDisable ? 'disable-navigation' : label.EMPTY}`}
              ></NavigateNextIcon>
            </Tooltip>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default withRouter(GraphDataTable);
