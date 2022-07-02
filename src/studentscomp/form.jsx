import React, { Component } from "react";
import defaultExport from './data';
class StudentForm extends Component {
  state = {
    dataObj: {
      name:'',
      subject:'',
      marks:'',
    },
    selectedStudentInd:-1,
    list:[]
  };
  componentDidMount() {
     this.setState({list: defaultExport.students});
     
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    const obj = { ...this.state.dataObj };
    let ind = this.state.selectedStudentInd;
    if(input.name==='name'){
      obj[input.name] = input.value;
      ind = this.state.list.findIndex(st => st.name === input.value);
    }else{
      obj[input.name] = input.value;
      let subObj = this.state.list[ind].subjects.find(item => item.sub === input.value);
      obj['marks']= subObj.marks;
    }
    console.log(obj ,input.value,input.name)
    this.setState({ dataObj: obj , selectedStudentInd:ind});
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...this.state.dataObj };
    console.log(body);
    
  };
  render() {
    const { dataObj: student , list,selectedStudentInd} = this.state;
    console.log(list)
    return (
      <div className="container text-left center">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="section">Name</label>
            <select
              onChange={this.handleChange}
              className="form-control"
              value={student.name}
              type="text"
              name="name"
              id="name1"
            >
              <option value=""> Select Name</option>
              {
                 list.map((student,i)=>(
                    <option key={i} value={student.name}>{student.name}</option>
                  ))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="section">Subject</label>
            <select
              onChange={this.handleChange}
              className="form-control"
              value={student.subject}
              type="text"
              name="subject"
              id="subject"
            >
              <option value=""> Select Subject</option>
              { 
                selectedStudentInd >-1 && list[selectedStudentInd].subjects.map((obj,i)=>(
                    <option key={i} value={obj.sub}>{obj.sub}</option>
                  ))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="section">Marks</label>
            <select
              disabled
              onChange={this.handleChange}
              className="form-control"
              value={student.marks}
              type="text"
              name="name"
              id="name"
              placeholder="marks"
            >
              <option value=""> Marks</option>
              {
                selectedStudentInd >-1 && student.subject!=='' &&
                 list[selectedStudentInd].subjects.map((student,i)=>(
                    <option key={i} value={student.marks}>{student.marks}</option>
                  ))
              }
            </select>
          </div>
        </form>
      </div>
    );
  }
}
export default StudentForm;
