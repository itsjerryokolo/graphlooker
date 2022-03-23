/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import {
  getCsvDataQuery,
  getGraphDataForID,
  getSortedCsvDataQuery,
  getStringFilterCsvData,
} from '../../utility/graph/query';
import { useApolloClient } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AttributesState, EntityState, QueryDataState } from '../../utility/redux/state';
import './export-to-csv.scss';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Constants from '../../utility/constant';
import DownloadModal from './download-modal';
import { sortData } from '../../utility/utility';

const ExportToCSV: React.FunctionComponent<any> = () => {
  const [entityId, setEntityId] = useState<any[]>([]);
  const [sortedDataState, setSortedDataState] = useState<any[]>([]);
  const [clickRef, setClickRef] = useState<any>(null);
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
    console.log(selectedEntity, queryDataGlobalState, allAttributes);
    if (selectedEntity && queryDataGlobalState && allAttributes) {
      exportClickHandler();
    }
  }, [selectedEntity, queryDataGlobalState, allAttributes]);

  //<------- functionality for dynamic query ------->

  function getCsvDataResursively() {
    if (parsed.id !== undefined) {
      return getGraphDataForID(allAttributes, selectedEntity, `${parsed.id}`);
    }

    if (parsed.f !== undefined && parsed.c !== undefined && parsed.i !== undefined) {
      return getStringFilterCsvData(
        queryDataGlobalState,
        allAttributes,
        selectedEntity,
        `${parsed.f}`,
        `${parsed.c}`,
        `${parsed.i}`,
        entityId.length > 0 ? entityId[entityId.length - 1] : ''
      );
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

    return getCsvDataQuery(
      allAttributes,
      queryDataGlobalState,
      selectedEntity,
      1000,
      entityId.length > 0 ? entityId[entityId.length - 1] : ''
    );
  }

  //<--------------- Export Handler --------------->

  const exportClickHandler = async () => {
    console.log('Exporting data ... ');

    const { data } = await client.query({
      query: getCsvDataResursively(),
    });

    let entityData = await data;
    entityData = data['entity'];
    rows = [...entityData];

    let sortedData = rows.map((item) => {
      const { __typename, ...sortedRows } = item;

      return sortedRows;
    });

    sortedData = await sortData(sortedData);

    if (sortedData) {
      setSortedDataState([...sortedDataState, ...sortedData]);
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
      entityId.includes(sortedDataState[sortedDataState.length - 1].id) === false
    ) {
      setEntityId([...entityId, sortedDataState[sortedDataState.length - 1].id]);
      console.log('sortedDataState.length:', sortedDataState.length);
    }
  }, [sortedDataState]);

  let fileName = `${selectedEntity}_Dapplooker.csv`;

  return (
    <>
      <CSVLink
        data={sortedDataState || []}
        filename={fileName}
        className="csvlink"
        ref={CSV_LINK_REF}
        asyncOnClick={true}
      />

      <DownloadModal sortedDataState={sortedDataState} clickRef={clickRef} />
    </>
  );
};

export default withRouter(ExportToCSV);
