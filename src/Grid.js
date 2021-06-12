// Importing neccessary components and modules
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  SortingState,
  GroupingState,
  IntegratedSorting,
  IntegratedGrouping
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  Toolbar
} from "@devexpress/dx-react-grid-material-ui";

//using function to return the intented result in tabular format.
export default () => {
// Used Hook to determine the columns.
  const [columns] = useState([
    { name: "id", title: "ID" },
    { name: "listId", title: "ListID" },
    { name: "name", title: "Name" }
  ]);

  // Dummy rows before fetching the result.
  const [rows, setAPIData] = useState([{ id: 755, listId: 2, name: "om" }]);
/* pulling data from website*/
  function getData() {
    fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json")
      .then((response) => response.json())
      .then((result) => {
// Filtering the null and empty values from names column.
        const newList = result.filter(
          (item) => item.name !== "" && item.name !== null
        );
        console.log(newList);
//Changing the state of variables.
        setAPIData(newList);
      });
  }

//Using useeffect hook to fetch the JSON data after rendering.
  /* pulling data completed*/
  useEffect(() => {
    getData();
  }, []);

//Used UI components by Material UI.
  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SortingState
// Used sorting state from grid to sort the elements in columns from ascending or descending order.
          defaultSorting={[
            { columnName: "listId", direction: "asc" },
            { columnName: "name", direction: "asc" }
          ]}
        />

        <GroupingState defaultGrouping={[{ columnName: "listId" }]} />
 {/* Plugin used for grouping and group expanding/collapsing. */}
        <IntegratedSorting />
        <IntegratedGrouping />
{/* To display the rows in tabular formats used grid material ui. */}
        <Table />
        <TableHeaderRow showSortingControls />
        <TableGroupRow />
        <Toolbar />
        <GroupingPanel showSortingControls />
      </Grid>
    </Paper>
  );
};
