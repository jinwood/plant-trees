## Hi, and welcome to my ecologi tech test submission

This project has been bootsrapped using create-react-app. You can use the following commands to run the app locally.
I have not tested `build` or `eject` but see no reason why they wouldn't work.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

---

Overall I'm happy with how the project turned out, there are a few things I would change if I did it again which I'll go over in this part of the readme.

Firstly, The dataset is extremely large and causes some performance warnings in the browser console. Ideally, this would be corrected at the api, by offering some date parameters so that the UI can request a slice of the data rather than the entire collection. Or by offering a condensed alternative (trees planted per month perhaps?).
I'm not sure if there is a way to avoid this causing issues / errors in the ui, but given more time I would have researched the causes and prevented them.

In the UI itself, the dataset size makes rendering a useful chart challenging, as plotting the date range over X axis, for example, renders an extremely wide chart. Hence why I chose to restrict the size of the dataset by default and give the user the option to expand it at their will.

I used redux-toolkit's slice feature for creating the state management, which I feel provides the perfect amount of flexibility without requiring a lot of boilerplate code.
I wrote unit tests to cover the basics, different possible states, selector output.

### Given some more time...

The `treeSlice` reducer uses `Thunk` to abstract the api call. In a production app with more external dependencies I would separate this into its own module and perhaps use `redux-saga` to add some flexibility (pausing, cancelling etc).

There are no UI / component tests (excluding the test that comes bundled with this template). I would have written tests such as:

- Does `TreeCount` render a graph given a state containing data
- Does `TreeCount` graph hide its X axis given a `dayCount` of 10
- Does `TreeCount` render the loading text given the loading state

There is no error handling in the UI, but there is error state in redux so it would be simple to add in.
The layout / structure is a little odd, and only one component in depth. If this is was a production application it would make sense to add some layering and a reusable layout.
The CSS is very basic and I have not considered how the graph would look on mobile. Improvements would be to use either css modules or styled components and add some structure to how the css is written.

I would also consider moving the slicing / formatting logic out of the `TreeCount` component and into its own helper or into the reducer. As previously mentioned, the range of data being displayed could be modified by giving the api a date range so the component wouldn't need to modify the data itself.
