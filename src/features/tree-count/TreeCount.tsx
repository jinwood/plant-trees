import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import moment from "moment";
import groupBy from "lodash/groupBy";
import {
  getPlantData,
  apiGetPlantData,
  selectData,
  PlantData,
  selectLoading,
} from "./treeSlice";

export const TreeCount = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  let data = useSelector(selectData);
  useEffect(() => {
    dispatch(getPlantData());
    dispatch(apiGetPlantData());
  }, [dispatch]);
  const [dayCount, setDayCount] = useState(5);
  const [showXLabel, setShowXLabel] = useState(true);

  let total = 0;
  data = data.slice(0, dayCount);
  const groupedData = groupBy(data, "createdAt");
  console.log(groupedData);
  data = data.map((v: PlantData) => {
    total += v.value;
    return {
      value: v.value,
      createdAt: moment(v.createdAt).format("DD/MM/YY"),
    };
  });

  const updateCount = (value: number) => {
    if (value < 1 || value > 500) {
      return;
    }
    if (value > 6) {
      setShowXLabel(false);
    }
    if (value <= 6) {
      setShowXLabel(true);
    }

    setDayCount(value);
  };

  const totalText = `That's ${total} ${total === 1 ? "tree" : "trees"}!`;
  return (
    <div>
      <p>
        How many trees has Ecologi planted in the past{" "}
        <input
          type="number"
          value={dayCount}
          onChange={(event: any) => updateCount(event.target.value)}
          max={1000}
        />
        days?
      </p>
      {loading && <p>Please wait...</p>}

      {!loading && (
        <BarChart
          width={1200}
          height={600}
          data={data}
          margin={{ top: 25, right: 30, left: 30, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" hide={!showXLabel} />{" "}
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="value" fill="#0c9e77" />
        </BarChart>
      )}
      {total > 0 && <p>{totalText}</p>}
    </div>
  );
};
