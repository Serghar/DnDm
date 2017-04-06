import app from 'electron';
import path from 'path'
import React, { Component } from 'react';
import Monsters from './Monsters';
import {GetAllMonsterModules, importModule} from './../../../db/module-parser';

class Import extends Component {
    constructor() {
        super();
        this.state = {
            modules : []
        }
        GetAllMonsterModules().then((jsonData)=> {
            jsonData.modules.map((mod) => {
                mod.checked = false;
            });
            this.setState({
                modules: jsonData.modules
            });
        });
    }
    updateModuleSelection = (event, idx) => {
        const modulesToUpdate = this.state.modules
        modulesToUpdate[idx].checked = !(modulesToUpdate[idx].checked)
        this.setState({
            modules: modulesToUpdate
        });
    }
    importModules = () => {
        let moduleDatabaseWrites = [];
        this.state.modules.forEach((mod) => {
            if(mod.checked) {
                moduleDatabaseWrites.push(importModule(mod));
            }
        });
        Promise.all(moduleDatabaseWrites).then(() => {
            let win = app.remote.getCurrentWindow();
            win.close();
        })
    }
    closePopup = () => {
        let win = app.remote.getCurrentWindow();
        win.close();
    }
    render() {
        return (
            <div>
                <Monsters modList={this.state.modules} updateModuleSelection={this.updateModuleSelection}/>
                <button onClick={this.closePopup}>Close</button>
                <button onClick={this.importModules}>Import</button>
            </div>
        )
    }
}

export default Import