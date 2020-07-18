import { treeSlice, selectData, initialState, TreeState } from "./treeSlice";
import { AnyAction } from "@reduxjs/toolkit";

describe("treeSlice", () => {
  describe("reducer, action and selectors", () => {
    it("return initial state on first run", () => {
      // arrange
      const nextState = initialState;

      // act
      const result = treeSlice.reducer(undefined, {} as AnyAction);

      // assert
      expect(result).toEqual(nextState);
    });

    it("correctly sets state when getPlantData is dispatched", () => {
      // arrange
      const nextState = { ...initialState, isLoading: true };

      // act
      const result = treeSlice.reducer(
        initialState,
        treeSlice.actions.getPlantData
      );

      // assert
      expect(result).toEqual(nextState);
    });

    // tests to cover other possible states

    it("returns correct data from select", () => {
      // arrange
      const treeState: TreeState = {
        ...initialState,
        data: [{ createdAt: "foo", value: 1 }],
      };
      const state = { tree: treeState };

      // act
      const result = selectData(state);

      // assert
      expect(result).toEqual([{ createdAt: "foo", value: 1 }]);
    });

    // tests for other selects
  });
});
