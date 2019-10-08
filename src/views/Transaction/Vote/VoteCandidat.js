import React, {Component} from 'react';
import StandardCRUD from "../../../components/StandardCRUD" //component that used for standard crud from

import broker from '../../../utils/broker';
import dataStore from '../../../stores/data';
import config from '../../../utils/config';

import default_pict from '../../../assets/img/default-pict.png';

import SweetAlert from 'sweetalert-react';

import moment from 'moment-with-locales-es6';

//size 270*320

class Vote extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 6,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
      reload:false,
      loading: false,
      id_pk_column: 'id',
      url_parrent: '/master/period',
      data : [],
      vote_information : {},
      vote_result : [],
      id : this.props.match.params.id, // this id used for if there are foreign key in table that needed
      konfirm_kandidat : { modal : false, id: null, kandidat: null },
      date : new Date()
    }
    this.goBack = this.goBack.bind(this);
  }

  getDataCandidat(){
    broker.fetch.get(`/period/${this.props.match.params.id_period}/candidat`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            this.setState({data : data.data.data})
        } else {

        }
    }).catch(err => {
        
    });
  }

  getDataVote(){
    broker.fetch.get(`/period_vote/${this.props.match.params.id}`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            this.setState({vote_information : data.data})
        } else {

        }
    }).catch(err => {
        
    });
  }
  vote(){
    var body = {
      period_vote_id : this.props.match.params.id,
      candidat_period_id : this.state.konfirm_kandidat.id
    }
    broker.fetch.post(`/period_vote_detail`, body)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            this.setState({konfirm_kandidat : {modal : false, id: null, kandidat : null}})
            this.getResult();
        } else {

        }
    }).catch(err => {
        
    });
  }

  getResult(){
    broker.fetch.get(`/period_vote_detail/result/${this.props.match.params.id}`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
          this.setState({vote_result : data.data}, function(){
              // console.log(this.state.vote_result)
              if(this.state.vote_result.length === 0){
                this.statusVote('VOTING');
              }
          })
        } else {

        }
    }).catch(err => {
        
    });
  }

  getDetailResult(id){
    var result = this.state.vote_result;
    var return_value = 0;
    for (var i=0; i<result.length; i++){
        if (id == result[i].candidat_period_id) {
            return_value = result[i].result;
            break;
        }
    }

    return return_value;
  }
  

  componentDidMount(){
    this.getDataCandidat();
    this.getDataVote();
    this.getResult();
  }

  statusVote(status){
    var body = {
      status : status,
    }
    broker.fetch.post(`/period/status/${this.props.match.params.id}`, body)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            console.log(data.data)
        } else {

        }
    }).catch(err => {
        
    });
  }

  endVote(){
    this.setState({modal_end : false}, function(){
      this.props.history.push(`/master/period/${this.props.match.params.id_period}/vote/`);
      this.statusVote('FINISHED');
    })
  }

  goBack(){
    this.props.history.goBack();
  }

  render() {
    return (
      <React.Fragment>
        <div class="content content-fixed bd-b">
          <div class="container">
            <div class="d-sm-flex align-items-center justify-content-between">
              <div>
                <h4 class="mg-b-5">Perhitungan Suara</h4>
                <p class="mg-b-0 tx-color-03">Surabaya, {moment().locale('id').format('DD MMMM YYYY')}</p>
              </div>
              <div class="mg-t-20 mg-sm-t-0">               
                <button class="btn btn-primary mg-l-5" onClick={() => this.goBack()}><i className="fa fa-undo"></i> Kembali</button>
              </div>
            </div>
          </div>
        </div>
        <div className="content mg-t-0">
          <div className="container ht-100p tx-center mg-b-20">
            <h4 className="tx-30 ">{this.state.vote_information.name}</h4>
            <h4 className="tx-10 tx-color-03 tx-sm-24">{(this.state.vote_information.period) ? this.state.vote_information.period.period : ''}</h4>
          </div>
          <div className="container ht-50p tx-center">
            <div className="row justify-content-center">
              {this.state.data.map((data, k) => {  
                  return <div className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex flex-column" key={k}>
                          <h1 className="tx-rubik tx-bold mg-b-30 mg-t-auto tx-50">{this.getDetailResult(data.id)} <span className="tx-color-03 tx-normal">Suara</span></h1>
                          <img src={(data.candidat.pas_foto) ? config.api_endpoint + data.candidat.pas_foto : default_pict} className="img-thumbnail mg-b-10 " alt="Responsive image"/>
                          <h3 className="mg-b-25">{data.candidat.nama_lengkap}</h3>
                          <button className="btn btn-dark btn-block tx-20" 
                            onClick={() => this.setState({konfirm_kandidat : {modal: true, kandidat : data.candidat.nama_lengkap, id : data.id}})}>
                            Pilih Kandidat
                          </button>
                        </div>
              })}
            </div>
            <div className="row justify-content-center">
              <button className="btn btn-primary btn-block mg-t-50 tx-30" onClick={() => this.setState({modal_end : true})}>Akhiri Pemungutan Suara</button>
            </div>
          </div>
        </div>
        <SweetAlert
            show={this.state.konfirm_kandidat.modal}
            title={"Pilih "+ this.state.konfirm_kandidat.kandidat}
            text=""
            showCancelButton= {true}
            confirmButtonColor= "#0e5ab3"  
            confirmButtonText= "Ya, proses saja!" 
            cancelButtonText= "Tidak, tolong batalkan!"
            onConfirm={() => { this.vote()}}
            onCancel={() => this.setState({ konfirm_kandidat: {modal : false, kandidat : null, id : null} })}
        />
        <SweetAlert
            show={this.state.modal_end}
            title="Akhiri Pemungutan Suara"
            text=""
            showCancelButton= {true}
            confirmButtonColor= "#0e5ab3"  
            confirmButtonText= "Ya, proses saja!" 
            cancelButtonText= "Tidak, tolong batalkan!"
            onConfirm={() => { this.endVote()}}
            onCancel={() => this.setState({ modal_end : false })}
        />
      </React.Fragment>
      
        
    );
  }
}

export default Vote;
