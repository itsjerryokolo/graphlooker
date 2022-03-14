import React, { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';
import {
  getCsvDataQuery,
  getGraphDataForID,
  getSortedCsvDataQuery,
  getStringFilterGraphData,
} from '../../utility/graph/query';
import { useApolloClient } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AttributesState, EntityState, QueryDataState } from '../../utility/redux/state';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import './export-to-csv.scss';
import { Redirect, withRouter } from 'react-router-dom';
import queryString from 'query-string';

const ExportToCSV: React.FunctionComponent<any> = () => {
  const [entityId, setEntityId] = useState<any[]>([]);
  const [sortedDataState, setSortedDataState] = useState<any[]>([]);
  const [clickRef, setClickRef] = useState<any>(false);
  const CSV_LINK_REF = useRef<any>(null);
  const client = useApolloClient();

  const parsed = queryString.parse(window.location.search);

  let rows: any[] = [];

  const regex: any = new RegExp(/^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$/gm);

  console.log(parsed);

  //<--------------- All use Selectors --------------->

  let selectedEntity: string = useSelector((state: EntityState) => state.selectedEntity.entity);

  const queryDataGlobalState = useSelector((state: QueryDataState) => state.queryState.query);

  const allAttributes = useSelector((state: AttributesState) => state.allAttributes.attributes);

  //<------- functionality for dynamic query ------->

  function getCsvDataResursively() {
    if (parsed.id !== undefined) {
      return getGraphDataForID(allAttributes, selectedEntity, `${parsed.id}`);
    }
    if (parsed.s !== undefined && parsed.c !== undefined) {
      return getSortedCsvDataQuery(
        queryDataGlobalState,
        selectedEntity,
        1000,
        `${parsed.s}`,
        `${parsed.c}`,
        entityId.length > 0 ? entityId[entityId.length - 1] : ''
      );
    }
    if (parsed.i !== undefined && parsed.f === undefined) {
      return getGraphDataForID(allAttributes, selectedEntity, `${parsed.i}`);
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

    return getCsvDataQuery(
      queryDataGlobalState,
      selectedEntity,
      1000,
      entityId.length > 0 ? entityId[entityId.length - 1] : ''
    );
  }

  //<--------------- Click Handler --------------->

  // const ExportClickHandler = useCallback(async () => {
  const ExportClickHandler = async () => {
    try {
      console.log('tried');
      window.open(`/download`);
    } catch (err) {
      console.log(err);
    }

    console.log('Click handler in action');

    const { data } = await client.query({
      query: getCsvDataResursively(),
    });

    let entityData = await data;
    entityData = data['entity'];
    rows = [...entityData];

    let sortedData = rows.map((itm) => {
      const { __typename, ...sortedRows } = itm;
      return sortedRows;
    });

    if (sortedData) {
      setSortedDataState([...sortedDataState, ...sortedData]);
    }

    setClickRef(true);
  };
  //}, [entityId.length]);

  useEffect(() => {
    if (
      entityId.length > 0 &&
      sortedDataState.length < 10000 &&
      regex.test(sortedDataState.length / 1000)
    ) {
      ExportClickHandler();
    } else if (clickRef) {
      CSV_LINK_REF?.current?.link.click();
      setClickRef(false);
    }
  }, [entityId]);

  useEffect(() => {
    if (
      sortedDataState.length > 0 &&
      entityId.includes(sortedDataState[sortedDataState.length - 1].id) === false
    ) {
      setEntityId([...entityId, sortedDataState[sortedDataState.length - 1].id]);
      console.log('sortedDataState.length:', sortedDataState.length);
    }
  }, [sortedDataState]);

  let fileName = `${selectedEntity}_Dapplooker.csv`;

  return (
    <>
      <button
        // target="_blank"
        onClick={ExportClickHandler}
        className="btn-exportcsv"
      >
        <FileDownloadIcon></FileDownloadIcon>
      </button>

      <CSVLink
        data={sortedDataState || []}
        filename={fileName}
        className="csvlink"
        ref={CSV_LINK_REF}
        asyncOnClick={true}
        target="_blank"
        // {...(sortedDataState ? "Loading csv..." : "Download me")}
      />
    </>
  );
};

export default withRouter(ExportToCSV);
