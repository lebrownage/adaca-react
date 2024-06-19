import React from 'react';
import Select , { ActionMeta, MultiValue, SingleValue } from 'react-select';

interface AppProps {
    options: {
        label: string
        value: string
    }[]
    isMulti : boolean
    onChange : (value : any )=>{}
}
  
interface AppState {
  selectedOption: Option | Option[] | null;
}

interface Option 
{ 
  label : string 
  value : string 
}

class App extends React.Component <AppProps, AppState> {
  state: AppState = {
      selectedOption: null,
  };
  handleChange = (
    selectedOption: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta); // You can log or use actionMeta to see what action was taken
      // Directly using the selectedOption value to set the state, handling both single and multi-select scenarios
      const newState: Option | Option[] | null = this.props.isMulti
      ? (selectedOption as MultiValue<Option>).map(item => ({ label: item.label, value: item.value }))
      : selectedOption as SingleValue<Option>;

      
    this.setState({ selectedOption: newState });
    this.props.onChange(newState)
  }
  render() {
    const { selectedOption } = this.state;
    const  { options, isMulti } = this.props
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        isMulti={isMulti}
      />
    )
  }
}

export default App