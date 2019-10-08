import React, {Component} from 'react';
import StandardCRUD from "../../../components/StandardCRUD" //component that used for standard crud from

import data_field from './_field'; // fields form
import broker from '../../../utils/broker';
import dataStore from '../../../stores/data';
import config from '../../../utils/config';

class Candidat extends Component {
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
      id_selected: '',
      modal_upload: true,
      url: { url_get_data : '/candidat', url_save_data: '/candidat', url_update_data: '/candidat',  
             url_delete_data: '/candidat', url_get_data_per: '/candidat' },
      title: 'Master Kandidat', 
      title_add : 'Add Data Master Kandidat', 
      fields: data_field.data, 
      columns: [ 
        { header: 'Nama Lengkap', id: 'nama_lengkap', accessor: 'nama_lengkap', child_accessor: null, className: 'text-center'},
        { header: 'Tempat Lahir', id: 'tempat_lahir', accessor: 'tempat_lahir', child_accessor: null, className: 'text-center'},
        { header: 'Tgl. Lahir', id: 'tgl_lahir', accessor: 'tgl_lahir', child_accessor: null, className: 'text-center'},
        // { header: 'Alamat', id: 'alamat', accessor: 'alamat', child_accessor: null, className: 'text-center'},
        { header: 'Agama', id: 'agama', accessor: 'agama', child_accessor: null, className: 'text-center'},
        { header: 'Pekerjaan', id: 'pekerjaan', accessor: 'pekerjaan', child_accessor: null, className: 'text-center'},
        // { header: 'KTP', id: 'no_ktp', accessor: 'no_ktp', child_accessor: null, className: 'text-center'},
        { header: 'Warga Negara', id: 'warga_negara', accessor: 'warga_negara', child_accessor: null, className: 'text-center'},
        { header: 'Pas Foto', id: 'pas_foto', accessor: 'pas_foto', child_accessor: 'id', className: 'text-center',
        Cell: row => {
              if (row.value) {
                return <a href={"#modal_view"} data-toggle="modal" onClick={() => this.setState({foto_url : config.api_endpoint + row.value})} 
                        className="btn btn-social" style={{margin: '-9px'}} ><i className="fa fa-eye"></i> </a>
              } else {
                return <a href="#modal_pas_foto" className="btn btn-social" style={{margin: '-9px'}} 
                          data-toggle="modal" onClick={()=> this.setState({id_selected : row.id})}>
                        <i className="fa fa-upload"></i> 
                      </a>
              }
            
            }
        },
        { header: 'Foto KTP', id: 'ktp', accessor: 'ktp', child_accessor: 'id', className: 'text-center',
        Cell: row => {
              if (row.value) {
                return <a href="#modal_view" data-toggle="modal" onClick={() => this.setState({foto_url : config.api_endpoint + row.value})} 
                        className="btn btn-social" style={{margin: '-9px'}} ><i className="fa fa-eye"></i> </a>
              } else {
                return <a href="#modal_ktp" className="btn btn-social" style={{margin: '-9px'}} data-toggle="modal" onClick={() => this.setState({id_selected : row.id})}><i className="fa fa-upload"></i> </a>
              }
            
            }
        },
      ],
    pas_foto: null,
    ktp : null,
    }
    this.onChangeKTP = this.onChangeKTP.bind(this)
    this.onChangePasFoto = this.onChangePasFoto.bind(this)
  }

  onChangeKTP(e) {
    let value = e.target.files[0];
    this.setState({
        ktp: value
    })
  }

  onChangePasFoto(e) {
    let value = e.target.files[0];
    this.setState({
        pas_foto: value
    })
  }

  upload_ktp(){
    console.log(this.state.hubungan_keluarga)
    var data = new FormData();
    data.append('ktp', this.state.ktp);

    broker.fetch.post(`candidat/upload_ktp/${this.state.id_selected}`, data)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            dataStore.setters.setReloadTable(true);
        } else {

        }
    }).catch(err => {
        
    });
  }

  upload_pas_foto(){
    console.log(this.state.foto_url)
    var data = new FormData();
    data.append('pas_foto', this.state.pas_foto);

    broker.fetch.post(`candidat/upload_pas_foto/${this.state.id_selected}`, data)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            dataStore.setters.setReloadTable(true);
        } else {

        }
    }).catch(err => {
        
    });
  }

  render() {
    console.log(this.state.id_selected)
    return (
      <React.Fragment>
        <StandardCRUD 
              columns={this.state.columns} 
              url={this.state.url} 
              title={this.state.title} 
              title_add={this.state.title_add} 
              fields={this.state.fields} 
              id_pk={null} 
              add_form={true}
              id_pk_column={this.state.id_pk_column}
        />
        <div className="modal fade" id="modal_ktp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content tx-14">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel2">Upload KTP</h6>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFile" onChange={this.onChangeKTP} />
                  <label className="custom-file-label" for="customFile">Choose file</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary tx-13" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary tx-13" data-dismiss="modal" onClick={() => this.upload_ktp()}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="modal_pas_foto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content tx-14">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel2">Upload Pas Foto</h6>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFile" onChange={this.onChangePasFoto}  />
                  <label className="custom-file-label" for="customFile">Choose file</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary tx-13" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary tx-13" data-dismiss="modal" onClick={() => this.upload_pas_foto()}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="modal_view" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div className="modal-content tx-14">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel2">Upload Pas Foto</h6>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={this.state.foto_url} className="img-fluid" alt="Responsive image"/>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Candidat;
