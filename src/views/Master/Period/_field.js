export default {
    data : [
        {
            id:'data_periode', type:'info', label:'Master Periode', hidden: 'no',
            child: [
                {id:'id', content_text: 'text', type:'text', label:'Id', hidden: 'yes'}, // this example textbox
                {id:'period', content_text: 'text', type:'text', label:'Periode', hidden: 'no'}, // this example textbox
                {id:'start', content_text: 'text', type:'date', label:'Tgl. Mulai', hidden: 'no'}, // this example textbox
                {id:'end', content_text: 'text', type:'date', label:'Tgl. Akhir', hidden: 'no'}, // this example pasword
                { 
                    id:'status', content_text: 'text', 
                    type:'combobox_static', 
                    label:'Status', 
                    hidden: 'no', 
                    property:['Aktif', 'Non-Aktif'], 
                    value:['AKTIF', 'NON-AKTIF']
                },
 
            ]
        }
    ]
}