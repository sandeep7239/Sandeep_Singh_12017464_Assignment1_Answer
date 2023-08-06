import { useState, useEffect } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [orderSubmittedMap, setOrderSubmittedMap] = useState({});
  const [filteredRows, setFilteredRows] = useState([]);

useEffect(() => {
  const map = {};
  timestamps.results.forEach((order) => {
    map[order["&id"]] = order.timestamps.orderSubmitted;
  });
  setOrderSubmittedMap(map);
}, []);

useEffect(() => {
  const filterRows = () => {
    const searchValue = mockData.results.filter((row) => {
      return(
        row["&id"].toLowerCase().includes(searchText.toLowerCase()) || 
        row.executionDetails.buySellIndicator.toLowerCase().includes(searchText.toLowerCase()) ||
        row.executionDetails.orderStatus.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredRows(searchValue);
  };

  filterRows();
}, [searchText, currency]);
const totalOrders = filteredRows.length;
const handleSelect = (row) => {
  setSelectedOrderDetails(row.executionDetails);
  const timeStampMatch = timestamps.results.find((timeStamp) => timeStamp.id === row.id);
  setSelectedOrderTimeStamps(timeStampMatch.timestamps || {});
}

const currencyList = mockData.results[0].bestExecutionData.orderVolume;
  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={Object.keys(currencyList)}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredRows} orderSubmittedMap={orderSubmittedMap} currency={currency} onClick= {handleSelect}/>
      </div>
    </div>
  );
};

export default Dashboard;
