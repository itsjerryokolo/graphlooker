export default class Constants {
  public static URL = {
    DEV: {},
    PROD: {},
  };

  public static LABELS = {
    commonLables: {
      subgraph_visualizer: "Subgraph Visualizer",
    },
  };

  public static TIMESTAMP_MENU = {
    timestampFilter: [
      { menuItem: "Previous" },
      { menuItem: "Next", },
      { menuItem: "Current" },
      { menuItem: "Before" },
      { menuItem: "After" },
      { menuItem: "On" },
      { menuItem: "Between" },
      { menuItem: "Is Empty" },
      { menuItem: "Not Empty" },
    ],
    timeFilter: [
      { menuItem: "Minutes" }, { menuItem: "Hours" }, { menuItem: "Days" }, { menuItem: "Weeks" },
      { menuItem: "Months" }, { menuItem: "Ouarters" }, { menuItem: "Years" },
    ]
  }

  public static INT_TYPE_MENU = {
    intFilter: [
      { menuItem: "Equal to", menuValue: " " },
      { menuItem: "Not equal to", menuValue: "_not" },
      { menuItem: "Greater than", menuValue: "_gt" },
      { menuItem: "Less than", menuValue: "_lt" },
      { menuItem: "Between", menuValue: "_btw" },
      { menuItem: "Greater than or equal to", menuValue: "_gte" },
      { menuItem: "Less than or equal to", menuValue: "_lte" },
      { menuItem: "Is Empty", menuValue: " " },
      { menuItem: "Not Empty", menuValue: "_not" },
    ]
  }
  public static STRING_TYPE_MENU = {
    stringFilter: [
      { menuItem: "Is", menuValue: " " },
      { menuItem: "Is not", menuValue: "_not" },
      { menuItem: "Contains", menuValue: "_contains" },
      { menuItem: "Does not contain", menuValue: "does_not_contain" },
      { menuItem: "Starts with", menuValue: "starts_with" },
      { menuItem: "Ends with", menuValue: "ends_with" },
      { menuItem: "Is Empty", menuValue: " " },
      { menuItem: "Not Empty", menuValue: "_not" },
    ]
  }


}
