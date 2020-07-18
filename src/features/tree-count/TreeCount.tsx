import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getPlantData, apiGetPlantData, selectData } from "./treeSlice";

export const TreeCount = () => {
  const dispatch = useDispatch();
  let data = useSelector(selectData);
  useEffect(() => {
    dispatch(getPlantData());
    dispatch(apiGetPlantData());
  }, [dispatch]);
  const [dayCount, setDayCount] = useState(5);
  data = data.slice(0, dayCount);

  const updateCount = (value: number) => {
    setDayCount(value);
  };

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
      {!data.length && <p>Please wait...</p>}

      {data.length && (
        <BarChart
          width={1200}
          height={600}
          data={data}
          margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="createdAt" />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="value" fill="#0c9e77" />
        </BarChart>
      )}
    </div>
  );
};
