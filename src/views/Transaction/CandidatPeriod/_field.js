export default {
    data : [
        {
            id:'data_candidat', type:'info', label:'Master Candidat', hidden: 'no',
            child: [
                {id:'id', content_text: 'text', type:'text', label:'Id', hidden: 'yes'},
                { 
                    id:'period_id', 
                    content_text: 'text', 
                    type:'select_box', 
                    label:'Periode', 
                    hidden: 'no', 
                    url : '/period', 
                    value_id : 'id', 
                    value_name : 'period'
                },
                { 
                    id:'candidat_id', 
                    content_text: 'text', 
                    type:'select_box', 
                    label:'Kandidat', 
                    hidden: 'no', 
                    url : '/candidat', 
                    value_id : 'id', 
                    value_name : 'nama_lengkap'
                },
 
            ]
        }
    ]
}