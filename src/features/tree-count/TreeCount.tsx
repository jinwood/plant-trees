import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getPlantData, apiGetPlantData, selectData } from "./treeSlice";

export const TreeCount = () => {
  const dispatch = useDispatch();
  let data = useSelector(selectData);
  data = data.slice(0, 20);
  useEffect(() => {
    dispatch(getPlantData());
    dispatch(apiGetPlantData());
  }, [dispatch]);

  return (
    <div>
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
