import React, {Component} from 'react';
import StandardCRUD from "../../../components/StandardCRUD" //component that used for standard crud from

import data_field from './_field'; // fields form


class Period extends Component {
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
      url: { url_get_data : '/period', url_save_data: '/period', url_update_data: '/period',  
             url_delete_data: '/period', url_get_data_per: '/period' },
      title: 'Master Periode', 
      title_add : 'Add Data Master Periode', 
      fields: data_field.data, 
      columns: [ 
        { header: 'Periode', id: 'period', accessor: 'period', child_accessor: null, className: 'text-center'},
        { header: 'Tgl. Mulai', id: 'start', accessor: 'start', child_accessor: null, className: 'text-center'},
        { header: 'Tgl. Berakhir', id: 'end', accessor: 'end', child_accessor: null, className: 'text-center'},
        { header: 'Status', id: 'status', accessor: 'status', child_accessor: null, className: 'text-center',
        Cell: row => { 
              return <span className={(row === 'AKTIF') ? 'badge badge-light' : 'badge badge-dark'}>{row}</span>
          }
        },
        { header: 'Daftar Kandidat', id: 'id', accessor: 'id', child_accessor: null,
        Cell: row => {
            return <button className="btn btn-xs pd-x-15 btn-outline-dark" 
                      onClick={() => this.props.history.push(`/master/period/${row}/candidat`)}><i className="fa fa-bars"></i>
                  </button>
            }
        },
        { header: 'Pemungutan Suara', id: 'id', accessor: 'id', child_accessor: null,
        Cell: row => {
            return <button className="btn btn-xs pd-x-15 btn-outline-dark" 
                      onClick={() => this.props.history.push(`/master/period/${row}/vote`)}><i className="fa fa-bars"></i>
                  </button>
            }
        },
    ],
    }
  }

  render() {
    return (
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
    );
  }
}

export default Period;
