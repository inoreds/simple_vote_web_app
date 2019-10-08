import React, {Component} from 'react';
import StandardCRUD from "../../../components/StandardCRUD" //component that used for standard crud from

import broker from '../../../utils/broker';
import dataStore from '../../../stores/data';
import config from '../../../utils/config';

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
      id : this.props.match.params.id, // this id used for if there are foreign key in table that needed
      id_selected: '',
      modal_upload: true,
      url: { url_get_data : `/period_vote`, url_save_data: '/period_vote', url_update_data: '/period_vote',  
             url_delete_data: '/period_vote', url_get_data_per: '/period_vote' },
      title: 'Data Kandidat Per Periode', 
      title_add : 'Add Data Kandidat', 
      fields: null, 
      columns: [ 
        { header: 'Nama Pemungutan', id: 'name', accessor: 'name', child_accessor: null, className: 'text-center'},
        { header: 'Deskripsi', id: 'description', accessor: 'description', child_accessor: null, className: 'text-center'},
        { header: 'Mulai Pemungutan', id: 'id', accessor: 'status', child_accessor: 'period_id',  child_accessor_2: 'id',
          Cell: row => {
            if(row.value !== 'FINISHED') {
              return <button className="btn btn-xs pd-x-15 btn-outline-dark" 
                        onClick={() => this.props.history.push(`/transaksi/period/${row.id}/vote/${row.id2}`)}><i className="fa fa-play"></i>
                    </button>
              } else {
                return <button className="btn btn-xs pd-x-15 btn-outline-dark" 
                          onClick={() => this.props.history.push(`/laporan/${row.id}/vote/${row.id2}`)}>Hasil Pemungutan
                      </button>
              }
            }

        },
        { header: 'Status', id: 'status', accessor: 'status', child_accessor: null, className: 'text-center',
          Cell: row => { // you can definition custom colum like this, css and etc. row is accessor. accessor is name object of column
            return <span className={(row === 'NEW') ? 'badge badge-light' : (row === 'VOTING') ? 'badge badge-primary' : 'badge badge-danger'}>{row}</span>
          }
        },

        
      ],
    pas_foto: null,
    ktp : null,
    }
  
  }


  render() {
    return (
      <React.Fragment>
        <StandardCRUD 
              columns={this.state.columns} 
              url={this.state.url} 
              title={this.state.title} 
              title_add={this.state.title_add} 
              fields={this.state.fields} 
              id_pk={this.state.id} 
              add_form={false}
              id_pk_column={this.state.id_pk_column}
              url_parrent ={this.state.url_parrent}
              custom_query={'status[]=NEW&status[]=VOTING'}
        />
      </React.Fragment>
    );
  }
}

export default Vote;
