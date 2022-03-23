export default class Constants {
  public static URL = {
    DEV: {},
    PROD: {},
  };

  public static FILTERLABELS = {
    dataTypeLabels: {
      LIST: 'LIST',
      OBJECT: 'OBJECT',
      NON_NULL: 'NON_NULL',
      STRING: 'String',
      INT: 'Int',
      BIGINT: 'BigInt',
      BIGDECIMAL: 'BigDecimal',
    },
    columnNameLabels: {
      CREATED_AT_TIMESTAMP: 'createdAtTimestamp',
      UPDATED_AT_TIMESTAMP: 'updatedAtTimestamp',
      TIMESTAMP: 'timestamp',
      DATE: 'date',
    },
    filterOptionLabels: {
      IS_EMPTY: 'Is Empty',
      NOT_EMPTY: 'Not Empty',
      EQUAL_TO: 'Equal to',
      PREVIOUS: 'Previous',
      DAYS: 'Days',
    },
  };

  public static LABELS = {
    commonLables: {
      TITLE: 'Subgraph Explorer',
      FILTER_BY_THIS_COL: 'Filter by this column',
      ASC: 'asc',
      DESC: 'desc',
      IS: 'Is',
      EMPTY: '',
      UPDATE_BY_FILTER: 'Update by Filter',
      SEARCH_BY_USER: 'Search by User',
      SEARCH_BY_NUMBER: 'Search by Number',
      LOADING: `Don't worry - a few bits tried to escape, but we caught them.`,
      NO_RECORD: 'No Records Found',
      EXPLORE: 'Explore',
      LIGHT: 'light',
      WHITE: 'white',
      BLACK: 'black',
      DARK: 'dark',
      INVALID: 'Invalid ID',
      INCLUDE_TODAY: 'Include today',
    },
    commonUrls: {
      BASE_URL:
        process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
          : process.env.REACT_APP_BASE_URL_PRODUCTION,
      ADDRESS_URL: process.env.REACT_APP_ADDRESS_URL,
      TNX_URL: process.env.REACT_APP_TNX_URL,
    },
    exportLabels: {
      DWNLD_STARTED: 'Download started, you can close the tab.',
      DWNLD_SOON: 'Downloading will start automatically.',
      HOLD_MSG: ' the bits are breeding...',
      RECORDS_MSG: 'RECORDS DOWNLOADED.',
      CLOSE_TAB_MSG: 'IF YOU WISH TO STOP DOWNLODING, CLOSE THE TAB.',
    },
  };

  public static TIMESTAMP_MENU = {
    timestampFilter: [
      { menuItem: 'Previous' },
      { menuItem: 'Next' },
      { menuItem: 'Current' },
      { menuItem: 'Before' },
      { menuItem: 'After' },
      { menuItem: 'On' },
      { menuItem: 'Between' },
      { menuItem: 'Is Empty' },
      { menuItem: 'Not Empty' },
    ],
    timeFilter: [
      { menuItem: 'Minutes' },
      { menuItem: 'Hours' },
      { menuItem: 'Days' },
      { menuItem: 'Weeks' },
      { menuItem: 'Months' },
      { menuItem: 'Ouarters' },
      { menuItem: 'Years' },
    ],
  };

  public static INT_TYPE_MENU = {
    intFilter: [
      { menuItem: 'Equal to', menuValue: ' ' },
      { menuItem: 'Not equal to', menuValue: '_not' },
      { menuItem: 'Greater than', menuValue: '_gt' },
      { menuItem: 'Less than', menuValue: '_lt' },
      { menuItem: 'Between', menuValue: '_btw' },
      { menuItem: 'Greater than or equal to', menuValue: '_gte' },
      { menuItem: 'Less than or equal to', menuValue: '_lte' },
      { menuItem: 'Is Empty', menuValue: ' ' },
      { menuItem: 'Not Empty', menuValue: '_not' },
    ],
  };
  public static STRING_TYPE_MENU = {
    stringFilter: [
      { menuItem: 'Is', menuValue: ' ' },
      { menuItem: 'Is not', menuValue: '_not' },
      { menuItem: 'Contains', menuValue: '_contains' },
      { menuItem: 'Does not contain', menuValue: 'does_not_contain' },
      { menuItem: 'Starts with', menuValue: 'starts_with' },
      { menuItem: 'Ends with', menuValue: 'ends_with' },
      { menuItem: 'Is Empty', menuValue: ' ' },
      { menuItem: 'Not Empty', menuValue: '_not' },
    ],
  };
  public static NUMBERS = {
    CSV_Data: 100000,
  };
  public static ERROR_MESSAGES = {
    NOT_FOUND: 'Subgraph not found, please check subgraph name.',
    FAILED_TO_FETCH: 'Unable to fetch this Subgraph, Please try again!',
    INDEXING_ERROR: 'Subgraph is facing indexing error.',
    UNEXPECTED: 'ohh! Something unexpected happened.',
    INVALID: 'Subgraph endpoint is invalid or not allowed',
  };
}
