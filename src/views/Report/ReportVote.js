import React, {Component} from 'react';
import broker from '../../utils/broker';
import dataStore from '../../stores/data';
import config from '../../utils/config';

import default_pict from '../../assets/img/default-pict.png';

import img_1 from '../../assets/img/bella.jpg'

class Laporan extends Component {
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
      print : false,
      id : this.props.match.params.id, // this id used for if there are foreign key in table that needed
      konfirm_kandidat : { modal : false, id: null, kandidat: null }
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
  
  getDetailPercentage(id){
    var result = this.state.vote_result;
    var return_value = 0;
    for (var i=0; i<result.length; i++){
        if (id == result[i].candidat_period_id) {
            return_value = (result[i].percentage * 100).toFixed(1);
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

  goBack(){
    this.props.history.goBack();
  }


  render() {
    return (
      <React.Fragment>
        <div className="content content-fixed bd-b">
            <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
              <div className="d-sm-flex align-items-center justify-content-between">
                <div>
                  {/* <h4 class="mg-b-5">Laporan Pemungutan Suara</h4> */}
                  <h4 class="mg-b-5">{'Laporan ' + this.state.vote_information.name}</h4>
                  <p class="mg-b-0 tx-color-03">{(this.state.vote_information.period) ? this.state.vote_information.period.period : ''}</p>
                </div>
                <div class="mg-t-20 mg-sm-t-0 d-print-none">
                  <button class="btn btn-white mg-l-5" onClick={() => window.print()}><i className="fa fa-print"></i> Cetak Laporan</button>
                  <button class="btn btn-primary mg-l-5" onClick={() => this.goBack()}><i className="fa fa-undo"></i> Kembali</button>
                </div>
              </div>
            </div>
        {/* <div className="content content-fixed content-auth-alt">
            <div className="container ht-100p tx-center">
                <h4 className="tx-30 ">{this.state.vote_information.name}</h4>
                <p className="tx-20 tx-color-03 tx-sm-24">{(this.state.vote_information.period) ? this.state.vote_information.period.period : ''}</p>
            </div> */}  
        </div>
        <div content tx-13 id="print-content">
          <div className="container ht-50p">
              <div class="table-responsive mg-t-40">
                  <table class="table table-invoice bd-b">
                      <thead>
                      <tr>
                          <th class="wd-10p tx-center align-middle">No.</th>
                          <th class="wd-30p d-none d-sm-table-cell tx-center align-middle">Foto Kandidat</th>
                          <th class="wd-30p d-none d-sm-table-cell tx-center align-middle">Nama Kandidat</th>
                          <th class="tx-center tx-center align-middle">Perolehan Suara</th>
                          <th class="tx-center tx-center align-middle">Prosentase</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.state.data.map((data, k) => {  
                          return <tr key={k}>
                                      <td class="tx-center align-middle tx-20 tx-bold tx-color-03 tx-bold">{k+1}.</td>
                                      <td class="tx-center align-middle">  
                                          <img src={config.api_endpoint + data.candidat.pas_foto} className="img-thumbnail" style={{width:'50%'}} alt="Responsive image"/>
                                      </td>
                                      <td class="tx-center align-middle tx-20 tx-color-03 tx-bold">{data.candidat.nama_lengkap}</td>
                                      <td class="tx-center align-middle tx-30 tx-bold">{this.getDetailResult(data.id)}</td>
                                      <td class="tx-center align-middle tx-50 tx-bold">{this.getDetailPercentage(data.id)}%</td>
                                  </tr>
                          })}
                          
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
        
      </React.Fragment>
      
        
    );
  }
}

export default Laporan;
