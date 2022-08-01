export default class Constants {
  public static URL = {
    DEV: {},
    PROD: {},
    THEGRAPH: 'https://thegraph.com/',
    GITHUB: 'https://github.com/dapplooker/graphlooker',
    TELEGRAM: 'https://t.me/dapplooker',
    YOUTUBE: 'https://www.youtube.com/channel/UC1KJmtb3UhnWSN_sDv71_fg',
    DISCORD: 'https://discord.gg/uGQy8byW5T',
    MEDIUM_BLOG: 'https://dapplooker.medium.com/',
    TWITTER: 'https://twitter.com/dapplooker',
    DAPPLOOKER: 'https://dapplooker.com',
    GRAPHLOOKER: 'https://www.notion.so/dapplooker/GraphLooker-07bc3adf176b488ca23059ddbd41387f',
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
      ID: 'id',
    },
    filterOptionLabels: {
      IS_EMPTY: 'Is Empty',
      NOT_EMPTY: 'Not Empty',
      EQUAL_TO: 'Equal to',
      PREVIOUS: 'Previous',
      DAYS: 'Days',
      BETWEEN: 'Between',
    },
    checkProperEntityName: ['Nft', 'Ens'],
    timestampFilters: {
      PREVIOUS: 'Previous',
      CURRENT: 'Current',
      BEFORE: 'Before',
      AFTER: 'After',
      ON: 'On',
      BETWEEN: 'Between',
      IS_EMPTY: 'Is Empty',
      NOT_EMPTY: 'Not Empty',
      DAYS: 'Days',
      DAY: 'Day',
    },
    timestampColumnNames: [
      'preparedTimestamp',
      'blockTimestamp',
      'date',
      'timestamp',
      'createdAtTimestamp',
      'updatdeAtTimestamp',
      'createdAt',
      'hourStartUnix',
      'createTime',
      'blockTime',
      'rewardedAt',
      'committedAt',
      'openedAt',
      'addedAt',
      'expiresAt',
      'updatedAt',
      '_timeStamp',
      'endTime',
      'registrationDate',
      'expiryDate',
      'lastUpdateTimestamp',
    ],
  };

  public static LABELS = {
    commonLables: {
      TITLE: 'GraphLooker - Real-time Subgraph Explorer & Visualizer',
      FILTER_BY_COL: 'Filter by column',
      ASC: 'asc',
      DESC: 'desc',
      IS: 'Is',
      EMPTY: '',
      NOT_EMPTY: '_not',
      UPDATE_FILTER: 'Update filter',
      SEARCH_BY_USER: 'Search by User',
      SEARCH_BY_NUMBER: 'Search by Number',
      LOADING: `Don't worry - a few bits tried to escape, but we caught them.`,
      NO_RECORD: 'Oops!! No record found.',
      NO_ATTRIBUTES: 'Oops!! No attributes found.',
      EXPLORE: 'Explore',
      LIGHT_THEME_LABEL: 'light',
      WHITE: 'white',
      BLACK: 'black',
      DARK_THEME_LABEL: 'dark',
      INVALID: 'Not a Valid Address or TransactionHash',
      INCLUDE_TODAY: 'Include today',
      TIME_FORMAT: 'MMMM D, YYYY, h:mmA',
      COLLAPSE: 'Collapse',
      EXPAND: 'Expand',
      SWITCH_THEME: 'Switch Theme',
      DOWNLOAD: 'Download to CSV',
      SORT_ASC: 'Sort Ascending',
      SORT_DESC: 'Sort Descending',
      DESC_TITLE: 'Real-time Subgraph Explorer & Visualizer',
      ENTITY_REFERENCE: 'This column is a reference of',
      NULL: 'null',
      DOUBLE_QUOTES: '"',
      SORT: 'sort',
      ID: 'id',
      UNDEFINED: 'undefined',
      DOWNLOADING: 'Downloading...',
      AND: 'and',
      UNDERSCORE_IS: '_is',
      BUILT_WITH: 'Backed by',
      GRAPH_PROTOCOL: 'Graph Protocol',
      COPYRIGHT: '© 2022 made with ❤️ by',
      DAPPLOOKER: 'DappLooker',
      TEAM: 'team.',
      NULL_VALUE: 'Null value resolved',
      GRAPH_HEADING: 'SUBGRAPH STUDIO',
      MY_THEME: 'mytheme',
      BUTTON_TEXT_FOR_EMAIL: 'INFORM US',
      DOCS: 'DOCS',
      recentSubgraphs: [
        {
          NAME: 'Uniswap V3',
          LINK: 'https://graphlooker.com/explore?uri=https%3A%2F%2Fapi.thegraph.com%2Fsubgraphs%2Fname%2Funiswap%2Funiswap-v3&e=factory',
        },
        {
          NAME: 'Livepeer',
          LINK: 'https://graphlooker.com/explore?uri=https%3A%2F%2Fapi.thegraph.com%2Fsubgraphs%2Fname%2Flivepeer%2Flivepeer&e=protocol',
        },
        {
          NAME: 'Decentraland',
          LINK: 'https://graphlooker.com/explore?uri=https%3A%2F%2Fapi.thegraph.com%2Fsubgraphs%2Fname%2Fdecentraland%2Fmarketplace&e=count',
        },
        {
          NAME: 'Aave Gotchi',
          LINK: 'https://graphlooker.com/explore?uri=https%3A%2F%2Fapi.thegraph.com%2Fsubgraphs%2Fname%2Faavegotchi%2Faavegotchi-lending&e=aavegotchiOption',
        },
        {
          NAME: 'Compound V2',
          LINK: 'https://graphlooker.com/explore?uri=https%3A%2F%2Fapi.thegraph.com%2Fsubgraphs%2Fname%2Fmessari%2Fcompound-ethereum-extended&e=token',
        },
      ],
    },
    commonUrls: {
      BASE_URL:
        process.env.NODE_ENV === 'development'
          ? `${process.env.REACT_APP_BASE_URL_DEVELOPMENT}explore?`
          : `${process.env.REACT_APP_BASE_URL_PRODUCTION}explore?`,
    },
    exportLabels: {
      DWNLD_STARTED: 'Download Completed, you can close the tab.',
      DWNLD_SOON: 'Download is in Progress...',
      HOLD_MSG: 'The bits are breeding...',
      RECORDS_MSG: 'RECORDS DOWNLOADED.',
      CLOSE_TAB_MSG: 'IF YOU WISH TO STOP DOWNLOAD, CLOSE THE TAB.',
    },
    errorComponenet: {
      queryFailedMsg: 'Unexpected error encountered. Please try again after sometime.',
      copyURL: 'Copy URL',
      copiedURL: 'Copied!',
    },
    imagePaths: {
      FIREWORKS: '/images/firework-outline.gif',
      DOWNLOAD: '/images/document-outline.gif',
      ERROR: '/images/error-outline.gif',
    },
    filterTypes: {
      SORT: 'sort',
      GREATERTHAN: '_gt',
      LESSTHAN: '_lt',
      GREATERTHAN_AND_LESSTHAN: '_gte,_lte',
      IS: '_is',
      NOT: '_not',
    },
  };
  public static QUERY_REQUEST_INDEXNODE = {
    URL: 'https://api.thegraph.com/index-node/graphql',
  };
  public static REGEX = {
    TXHASH_REGEX: /[0-9A-Fa-f]{6}/g,
    CHECK_NUMBER_REGEX: /^\d*(\.\d+)?$/,
    urlRegex: /^(https:\/\/api\.|http:\/\/api\.)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}/g,
  };

  public static TIMESTAMP_MENU = {
    timestampFilter: [
      { menuItem: 'Previous' },
      { menuItem: 'Current' },
      { menuItem: 'Before' },
      { menuItem: 'After' },
      { menuItem: 'On' },
      { menuItem: 'Between' },
      // { menuItem: 'Is Empty' },
      // { menuItem: 'Not Empty' },
    ],
    timeFilter: [
      { menuItem: 'Minutes' },
      { menuItem: 'Hours' },
      { menuItem: 'Days' },
      { menuItem: 'Weeks' },
      { menuItem: 'Months' },
      { menuItem: 'Quarters' },
      { menuItem: 'Years' },
    ],
    currentFilter: [
      { menuItem: 'Day' },
      { menuItem: 'Week' },
      { menuItem: 'Month' },
      { menuItem: 'Quarter' },
      { menuItem: 'Year' },
    ],
  };

  public static INT_TYPE_MENU = {
    intFilter: [
      { menuItem: 'Equal to', menuValue: '_is' },
      { menuItem: 'Not equal to', menuValue: '_not' },
      { menuItem: 'Greater than', menuValue: '_gt' },
      { menuItem: 'Less than', menuValue: '_lt' },
      { menuItem: 'Between', menuValue: '_gte,_lte' },
      // { menuItem: 'Greater than or equal to', menuValue: '_gte' },
      // { menuItem: 'Less than or equal to', menuValue: '_lte' },
      { menuItem: 'Is Empty', menuValue: '_is' },
      { menuItem: 'Not Empty', menuValue: '_not' },
    ],
  };

  public static STRING_TYPE_MENU = {
    stringFilter: [
      { menuItem: 'Is', menuValue: '_is' },
      { menuItem: 'Is not', menuValue: '_not' },
      // { menuItem: 'Contains', menuValue: '_contains' },
      { menuItem: 'Does not contain', menuValue: '_not' },
      // { menuItem: 'Starts with', menuValue: 'starts_with' },
      // { menuItem: 'Ends with', menuValue: 'ends_with' },
      { menuItem: 'Is Empty', menuValue: '_is' },
      { menuItem: 'Not Empty', menuValue: '_not' },
    ],
  };

  public static NUMBERS = {
    CSV_Data: 100000,
  };
  public static VALID_ENDPOINT = {
    SUBGRAPH: 'https://api.thegraph.com',
  };
  public static ERROR_MESSAGES = {
    NOT_FOUND: 'Subgraph not found, please check subgraph name.',
    FAILED_TO_FETCH: 'Unable to fetch this Subgraph, Please try again!',
    INDEXING_ERROR: 'Subgraph is facing indexing error.',
    UNEXPECTED:
      'Unexpected error encountered, please check if you are entering correct subgraph api endpoint.',
    INVALID: 'Subgraph api endpoint you are entering is invalid or not allowed',
  };

  public static ROUTES = {
    HOME_ROUTE: '/',
  };

  public static LENGTH_OF_STRING = {
    VALUE: 21,
  };
  public static CONTACT = {
    EMAIL: 'help@dapplooker.com',
    DAPPLOOKER_EMAIL_LINK: 'https://t.me/dapplooker',
  };
  public static MAIL_FORMAT = {
    MAIL_GREETING: 'Hi DappLooker Team,',
    MAIL_BODY:
      'There is an issue with following subgraph data with GraphLooker. Can you please help to resolve ?',
    MAIL_SUBJECT: 'This Query has been failed !',
    MAIL_ENDING_MESSAGE: 'Thanks !',
  };
}
