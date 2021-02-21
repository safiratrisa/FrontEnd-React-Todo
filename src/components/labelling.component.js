import React, { Component } from 'react';
import axios from 'axios'

export default class Label extends Component {
    state = {
        labels: []
    }
    componentDidMount() {
        this.getLabels()
    }
    getLabels() {
        axios.get('labels/all-labels')
        .then(res => {
            this.setState({
                labels: res.data.result
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    editlabel(id, e) {
        // e.preventDefault();
        const data = {
            label: this.labeledit,
        }
        axios.put(`labels/updatelabel/${id}`, data)
        .then(res => {
            this.getLabels()
        })
        .catch(err => {
            console.log(err.response.data.err.message)
        })
    }
    editdesc(id, e) {
        // e.preventDefault();
        const data = {
            description: this.descedit,
        }
        axios.put(`labels/updatedesc/${id}`, data)
        .then(res => {
            this.getLabels()
        })
        .catch(err => {
            console.log(err.response.data.err.message)
        })
    }
    insert(e) {
        // e.preventDefault();
        const data = {
            label: this.labelinsert,
            description: this.descinsert
        }
        axios.post(`labels/insertlabels`, data)
        .then(res => {
            this.getLabels()
        })
        .catch(err => {
            console.log(err.response.data.err.message)
        })
    }
    delete(id) {
        axios.delete(`labels/${id}`)
        .then(res => {
            this.getLabels()
        })
        .catch(err => {
            console.log(err.response.data.err.message)
        })
    }
    render() {
        return (
            <div className="admin-box">
                <h3>Edit Labels</h3>
                    {this.state.labels.map(label =>
                    <div key={label.id}>
                        <div>
                        <div className="labeltitle">{label.label} : {label.description}</div>
                        <div className="eachbox">
                            <div className="editform">
                                <input type="text" className="form-control" placeholder="Edit Label" onChange={e => this.labeledit = e.target.value}/>
                                <button onClick={() => {this.editlabel(label.id)}}>Edit</button>
                            </div>
                            <div className="editform">
                                <input type="text" className="form-control" placeholder="Edit Description" onChange={e => this.descedit = e.target.value}/>
                                <button onClick={() => {this.editdesc(label.id)}}>Edit</button>
                            </div>
                            <button onClick={() => {this.delete(label.id)}}>Delete</button>
                        </div>
                        </div>
                    </div>    
                    )}
                    <input type="text" className="form-control" placeholder="Label" onChange={e => this.labelinsert = e.target.value}/>
                    <input type="text" className="form-control" placeholder="Description" onChange={e => this.descinsert = e.target.value}/>
                    <button onClick={() => {this.insert()}}>Insert</button>
            </div>
        );
    }
}