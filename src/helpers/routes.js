import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import Home from '../views/home/Home';
import User from '../views/user/User';
import MasterUser from '../views/Master/User/User';
import MasterPeriod from '../views/Master/Period/Period';
import MasterCandidat from '../views/Master/Candidat/Candidat';
import TrCandidaPeriod from '../views/Transaction/CandidatPeriod/CandidatPeriod';
import TrPeriodVote from '../views/Transaction/PeriodVote/PeriodVote';
import TrVoteCandidat from '../views/Transaction/Vote/VoteCandidat';
import TrVote from '../views/Transaction/Vote/Vote';
import Report from '../views/Report/Report';
import ReportVote from '../views/Report/ReportVote';
import UnathorizedPage from '../views/Other/UnathorizedPage';


export class Routes extends Component  {
    constructor(props) {
        super(props);

        this.options = {
            
        }
        this.state = {
            user: this.props.user
        }
     
    }

    checkAuthorized(role){
        let return_value = false;
        let user_role = this.props.user.role;
        for (let index = 0; index < role.length; index++) {
            if (role[index] == user_role){
                return_value = true;
            }
        }

        return return_value;
    }

    render(){
        return(
            <Switch>
                <Route exact path ='/' component={(this.checkAuthorized(['root','admin', 'user']) === true) ? Home : UnathorizedPage} />
                <Route exact path ='/master/user' component={(this.checkAuthorized(['root', 'admin']) === true) ? MasterUser : UnathorizedPage} />
                <Route exact path ='/master/period' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? MasterPeriod : UnathorizedPage} />
                <Route exact path ='/master/candidat' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? MasterCandidat : UnathorizedPage} />
                <Route exact path ='/master/period/:id/candidat' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? TrCandidaPeriod : UnathorizedPage} />
                <Route exact path ='/master/period/:id/vote' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? TrPeriodVote : UnathorizedPage} />
                <Route exact path ='/master/period/:id_period/vote/:id' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? TrVoteCandidat : UnathorizedPage} />
                <Route exact path ='/transaksi/vote' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? TrVote : UnathorizedPage} />
                <Route exact path ='/transaksi/period/:id_period/vote/:id' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? TrVoteCandidat : UnathorizedPage} />
                <Route exact path ='/laporan' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? Report : UnathorizedPage} /> 
                <Route exact path ='/laporan/:id_period/vote/:id' component={(this.checkAuthorized(['root', 'admin', 'user']) === true) ? ReportVote : UnathorizedPage} /> 
            </Switch>
        );
    }

}
