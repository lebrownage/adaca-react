
import type { RenderEditCellProps } from 'react-data-grid';
// import Select from '../forms/select'
import React from 'react';

// import Form from 'react-bootstrap/Form';

interface IRowBase {
    option: string;
}

interface AppProps<IRow extends IRowBase> extends RenderEditCellProps<IRow> {
    options: {
        label: string
        value: string
    }[]        
    isMulti : boolean
    onChange : (data : IRow, value : any )=>{}

}


class App<IRow extends IRowBase> extends React.Component<AppProps<IRow>> {
    constructor(props: AppProps<IRow>) {
      super(props);
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value: any) {
        this.props.onChange({...this.props.row}, value)

        return true
    }
    render() {
        const {options, row} = this.props
        return(
            // <Select 
            // options={this.props.options} 
            // isMulti={this.props.isMulti}  
            // onChange={this.handleChange}
            // ></Select>
            <select
                value={row.option}
                // onChange={(e)=>this.handleChange(e.target.value)}
                onChange={(event) => this.props.onRowChange({ ...row, option: event.target.value }, true)}
                autoFocus
                className='data-grid-editor-class'
            >
                <option>Open this select menu</option>
                {options.map((data) => (
                    <option key={data.value} value={data.value}>
                    {data.label}
                    </option>
                ))}
            </select>
        )
    };
}


export default App
