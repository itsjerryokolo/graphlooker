/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
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
import './export-to-csv.scss';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Constants from '../../utility/constant';
import DownloadPage from './download-page';
import Utility, { sortData } from '../../utility/utility';

const ExportToCSV: React.FunctionComponent<any> = () => {
  const [entityId, setEntityId] = useState<any[]>([]);
  const [sortedDataState, setSortedDataState] = useState<any[]>([]);
  const [clickRef, setClickRef] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const CSV_LINK_REF = useRef<any>(null);

  const client = useApolloClient();

  const parsed = queryString.parse(window.location.search);
  let rows: any[] = [];

  const regex: any = new RegExp(/^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$/gm);

  //<--------------- All use Selectors --------------->

  let selectedEntity: string = useSelector((state: EntityState) => state.selectedEntity.entity);
  const queryDataGlobalState = useSelector((state: QueryDataState) => state.queryState.query);
  const allAttributes = useSelector((state: AttributesState) => state.allAttributes.attributes);

  useEffect(() => {
    if (selectedEntity && queryDataGlobalState && allAttributes) {
      exportClickHandler();
    }
  }, [selectedEntity, queryDataGlobalState, allAttributes]);

  //<------- functionality for dynamic query ------->

  function getCsvDataResursively() {
    if (parsed.id !== undefined) {
      return getGraphDataForID(allAttributes, selectedEntity, `${parsed.id}`);
    }

    if (!parsed.f && !parsed.i && parsed.s) {
      return getSortedCsvDataQuery(
        queryDataGlobalState,
        selectedEntity,
        `${parsed.s}`,
        `${parsed.c}`,
        0,
        1000,
        entityId.length > 0 ? entityId[entityId.length - 1] : ''
      );
    }

    if (parsed.c) {
      return getStringFilterGraphData(
        allAttributes,
        selectedEntity,
        `${parsed.f}`,
        `${parsed.c}`,
        `${parsed.i}`,
        0,
        `${parsed.s}`,
        1000,
        entityId.length > 0 ? entityId[entityId.length - 1] : ''
      );
    }

    return getCsvDataQuery(
      allAttributes,
      selectedEntity,
      1000,
      0,
      queryDataGlobalState,
      entityId.length > 0 ? entityId[entityId.length - 1] : ''
    );
  }

  //<--------------- Export Handler --------------->

  const exportClickHandler = async () => {
    let data: any;
    try {
      data = await client.query({
        query: getCsvDataResursively(),
      });
    } catch (err) {
      setError(err);
    }

    let entityData: any = await data.data;
    entityData = data.data['entity'];
    rows = [...entityData];

    let sortedData = rows.map((item) => {
      const { __typename, ...sortedRows } = item;

      return sortedRows;
    });

    sortedData = Utility.sortedTimeData(sortedData);
    sortedData = sortData(sortedData);

    if (sortedData) {
      setSortedDataState([...sortedDataState, ...sortedData]);
    }

    if (rows.length === 0) {
      CSV_LINK_REF?.current?.link.click();
    }

    setClickRef(true);
  };

  useEffect(() => {
    if (
      entityId.length > 0 &&
      sortedDataState.length < Constants.NUMBERS.CSV_Data &&
      regex.test(sortedDataState.length / 1000)
    ) {
      exportClickHandler();
    } else if (clickRef) {
      CSV_LINK_REF?.current?.link.click();
      setClickRef(false);
    }
  }, [entityId]);

  useEffect(() => {
    if (
      sortedDataState.length > 0 &&
      entityId.includes(sortedDataState[sortedDataState.length - 1].Id) === false
    ) {
      setEntityId([...entityId, sortedDataState[sortedDataState.length - 1].Id]);
    }
  }, [sortedDataState]);

  let fileName = `${selectedEntity}_Dapplooker.csv`;

  return (
    <>
      <CSVLink
        data={sortedDataState}
        filename={fileName}
        className="csvlink"
        ref={CSV_LINK_REF}
        asyncOnClick={true}
      />

      <DownloadPage sortedDataState={sortedDataState} clickRef={clickRef} error={error} />
    </>
  );
};

export default withRouter(ExportToCSV);
